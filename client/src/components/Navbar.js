import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const { getLoggin } = useContext(AuthContext);
    const navigate = useNavigate();

    async function clickHandler() {
        console.log("clicked");
        await axios.post('/user/logout/');
        getLoggin();
        navigate('/signin');
    }

    return (
        <div className='Navbar'>
            <span className='nav-logo'>Say Vehicle Service</span>
            <div className={`nav-items ${isOpen && "open"}`}>
                <Link to="/" ><a className='nav-tag' href="">View Jobcard</a></Link>
                <Link to="/create-jobcard"><a className='nav-tag' href="">Create Jobcard</a></Link>
                <a className='btn' href="" onClick={clickHandler}>SignOut</a>
            </div>
            <div
                className={`nav-toggle ${isOpen && "open"}`}
                onClick={() => setIsOpen(true)}
            >
                <div className="bar"></div>
            </div>
        </div>
    )
}

export default Navbar;
