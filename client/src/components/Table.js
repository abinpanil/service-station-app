import React, { useEffect, useState } from 'react';
import { Pagination, Select } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import "./Table.css";
import { Option } from 'antd/lib/mentions';
// import Search from './Search';

function Table() {
    const [jobcards, setJobcards] = useState([]);
    const [count, setCount] = useState(0);
    const [change, setChange] = useState(false);
    const [customers, setCustomers] =useState([]);
    const [search, setSearch] = useState('')

    useEffect(async () => {
        try {
            let response = await axios.get('/jobcard');
            setJobcards(response.data.jobcard);
            setCount(response.data.count);
        } catch (e) {

        }
    }, [change]);
    
    return (
        <div className='table'>
            <div className="table-top">
                <div className="select">
                    <label htmlFor="">Select Status</label>
                    <Select style={{ width: 120 }} allowClear>
                        <Option value="0">Pending Completion</Option>
                        <Option value="1">Work Completed</Option>
                        <Option value="2">Vehicle Delevered</Option>
                    </Select>
                </div>
                <div className="search">
                    {/* <Search /> */}
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer Name</th>
                        <th>Customer Number</th>
                        <th>Reg No.</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Jobcard Status</th>
                        <th>Created User</th>
                    </tr>
                </thead>
                <tbody>
                    {jobcards.map((jobcard) => {
                        return (
                            <tr key={jobcard._id}>
                                <td>1</td>
                                <td>{jobcard.customer[0].name}</td>
                                <td>{jobcard.customer[0].mobile_no}</td>
                                <td>{jobcard.reg_no}</td>
                                <td>{jobcard.vehicle_make}</td>
                                <td>{jobcard.vehicle_model}</td>
                                <td>{jobcard.jobcard_status === 0 && "Pending Completion" || jobcard.jobcard_status === 1 && "Work Completed" || jobcard.jobcard_status === 2 && "Vehicle Delivered"}</td>
                                <td>{jobcard.user[0].name}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <div className="pagination">
                <Pagination size='small' total={count} onChange={(e) => { console.log(e) }} />
            </div>
        </div>

    )
}

export default Table;
