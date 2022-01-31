import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import NewJobcard from '../components/NewJobcard';
import Table from '../components/Table';
import ViewJobcard from '../components/ViewJobcard';
import './Home.css'

function Home(props) {
    const [jobcardId, setJobcardId] = useState('');

    return (
        <div className='body_home'>
            <Navbar />
            <div className='cardb'>
                {props.page === "list_jobcard" &&

                    <Table
                        setJobcardId={setJobcardId}
                    />
                }
                {props.page === "view_jobcard" &&
                    <ViewJobcard
                        jobcardId={jobcardId}
                    />
                }
                {props.page === "new_jobcard" && <NewJobcard
                    setJobcardId={setJobcardId}
                />}
            </div>
        </div>
    );
}

export default Home;