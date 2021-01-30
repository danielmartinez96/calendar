import React, { useEffect, useState } from 'react';
import {Calendar,momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messges-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import {uiOpenModal} from '../../actions/uiActions'
import { useDispatch, useSelector } from 'react-redux';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/eventsActions';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment)

// const events = [{
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(2,'hours').toDate(),
//     bgcolor: '#fafafa',
//     user:{
//         _id:'123',
//         name:'Fernando'
//     }
// }]

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    
    const {events,activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.auth);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'month');

    useEffect(() => {
        
        dispatch(eventStartLoading());
    }, [dispatch]);


    const onDoubleClick = (e)=>{
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e)=>{
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e)=>{
        setLastView(e);
        localStorage.setItem('lastView',e);
    }

    const eventStyleGetter = (event,start,end,isSelected)=>{
        const style = {
            backgroundColor: (uid ===event.user._id)?'#367CF7':'#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display:'block',
            color:'white'
        }

        return{
            style
        }
    };

    const onSelectedSlot = (e) => {
        dispatch(eventClearActiveEvent());
    }
    

    return (
        <div>
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                selectable={true}
                onSelectSlot={onSelectedSlot}
                components={{
                    event: CalendarEvent
                }}
            />
            {
                activeEvent&&<DeleteEventFab/>
            }
            <AddNewFab/>
            <CalendarModal/>
        </div>
    )
}
