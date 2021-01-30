import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/authActions';
import { eventClearLogout } from '../../actions/eventsActions';

export const Navbar = () => {
    const {name} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(eventClearLogout());
    }
    
    return (
        <div className="navbar navbar-dar bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>

            <button 
                className="btn btn-outline-danger"
                onClick={handleLogout}    
            >
                <i className="fas fa-sign-out-alt"></i> 
                <span> Salir</span>
            </button>
        </div>
    )
}
