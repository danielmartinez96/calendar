import React from 'react'
import { useDispatch } from 'react-redux'
import { eventClearActiveEvent } from '../../actions/eventsActions'
import { uiOpenModal } from '../../actions/uiActions'

export const AddNewFab = () => {
    const dispatch = useDispatch()
    const handleOpenAddEvent = () => {
        dispatch(eventClearActiveEvent());
        dispatch(uiOpenModal());
    }
    

    return (
            <button
                className="btn btn-primary fab"
                onClick={handleOpenAddEvent}
            >
                <i className="fas fa-plus"></i>
            </button>
    )
}
