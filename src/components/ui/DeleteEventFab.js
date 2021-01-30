import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/eventsActions';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();
    const handleDetele = () => {
        dispatch(eventStartDelete());
    }
    
    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDetele}
        >
            <i className="fas fa-trash"></i>
            <span>Borar Evento</span>
        </button>
    )
}
