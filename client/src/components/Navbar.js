import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='Navbar'>
            <span className='nav-logo'>Say Vehicle Service</span>
            <div className={`nav-items ${isOpen && "open"}`}>
                <a href="">New Jobcard</a>
                <a href="">Search Jobcard</a>
                <a className='btn' href="">SignOut</a>
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
