import React from 'react';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import './Home.css'

function Home() {
    return (
        <div className='body_home'>
            <Navbar />
            <div className='card'>
                <Table />
            </div>
        </div>
    );
}

export default Home;