import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {uiCloseModal} from '../../actions/uiActions';
import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate } from '../../actions/eventsActions';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');

const endM = moment().clone().add(1,'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end:endM.toDate()
}

export const CalendarModal = () => {

    const {modalOpen} = useSelector(state => state.ui);
    const {activeEvent} = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(endM.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);
 

    const {notes,title,start,end}= formValues;

    useEffect(() => {
        if(activeEvent){
            setFormValues(activeEvent);
            setDateEnd(moment(activeEvent.end).toDate());
            setDateStart(moment(activeEvent.start).toDate());
        }
    }, [activeEvent])
    const closeModal = () => {
        dispatch((uiCloseModal()));
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
    }
    const onChangeEndDate = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end:e
        });
    }
    const onChangeStartDate = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start:e
        });
    }
    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]:target.value
        });
        
    }
    
    const handleSubmitForm = (e)=>{
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire("La fecha fin tiene que ser mayor a la inicio");
        }

        if(title.trim().length<2){
            return setTitleValid(false);
        }

        if(activeEvent){
            dispatch(eventStartUpdate(formValues));
        }else{
            dispatch(eventStartAddNew(formValues));
        }

        setTitleValid(true);
        closeModal();
    }
    
    return (
        <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        closeTimeoutMS={2000}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={onChangeStartDate}
                        value={dateStart}
                        className="form-control"
                        />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={onChangeEndDate}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid &&'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="note"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
      </Modal>
    )
}
