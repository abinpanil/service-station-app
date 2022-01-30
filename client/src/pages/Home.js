import React from 'react';
import Navbar from '../components/Navbar';
import NewJobcard from '../components/NewJobcard';
import Table from '../components/Table';
import ViewJobcard from '../components/ViewJobcard';
import './Home.css'

function Home(props) {
    console.log(props.page);
    return (
        <div className='body_home'>
            <Navbar />
            <div className='card'>
                {props.page === "view_jobcard" && <Table  />}
                {props.page === "new_jobcard" && <NewJobcard />}
            </div>
        </div>
    );
}

export default Home;