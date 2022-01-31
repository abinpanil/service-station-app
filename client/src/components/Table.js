import React, { useEffect, useState } from 'react';
import { Pagination, Select } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import "./Table.css";
import { Option } from 'antd/lib/mentions';
import Search from './Search';
import { useNavigate } from 'react-router-dom';
// import Search from './Search';

function Table(props) {
    const { setJobcardId } = props;
    const [jobcards, setJobcards] = useState([]);
    const [count, setCount] = useState(0);
    const [change, setChange] = useState(false);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState(3);
    const [customers, setCustomers] = useState([]);
    const [tableErrorStatus, setTableErrorStatus] = useState(false);
    const [tableErrorMessage, setTableErrorMessage] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [customerErrorMessage, setCustomerErrorMessage] = useState('');
    const [customerErrorStatus, setCustomerErrorStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(async () => {
        try {
            const params = {
                status: status,
                page: page,
                customer_id: customerId
            }
            setCount(0);
            setJobcards([])
            setTableErrorStatus(false);
            let response = await axios.get(`/jobcard`, { params });
            console.log(response.data.count);
            setJobcards(response.data.jobcard);
            setCount(response.data.count);
        } catch (e) {
            setTableErrorMessage(e.response.data.errorMessage);
            setTableErrorStatus(true);
        }
    }, [change]);

    async function handleInputChange(event) {
        try {
            setCustomers([]);
            setCustomerName(event.target.value);
            setCustomerErrorStatus(false);
            let response = await axios.get('/customer', { params: { name: customerName } });
            setCustomers(response.data);
        } catch (e) {
            setCustomerErrorMessage(e.response.data.errorMessage);
            setCustomerErrorStatus(true);
        }

    }

    return (
        <div className='table'>
            <div className="table-top">
                <div className="select">
                    <label htmlFor="">Select Status</label>
                    <Select defaultValue="All" style={{ width: 120 }} allowClear onChange={(value) => {
                        setStatus(value)
                        setChange(!change);
                    }} >
                        <Option value="0">Pending Completion</Option>
                        <Option value="1">Work Completed</Option>
                        <Option value="2">Vehicle Delevered</Option>
                    </Select>
                </div>
                <div className="search">
                    <Search
                        options={customers}
                        inputOnChange={handleInputChange}
                        errorStatus={customerErrorStatus}
                        errorMessage={customerErrorMessage}
                        setCustomerId={setCustomerId}
                        setChange={setChange}
                        change={change}
                    />
                </div>
            </div>
            {tableErrorStatus ? <h4>{tableErrorMessage}</h4> :
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
                    <tbody >
                        {jobcards.map((jobcard) => {
                            return (
                                <tr key={jobcard._id} onClick={() => {
                                    setJobcardId(jobcard._id);
                                    navigate('/view-jobcard');
                                }}>
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
            }
            {
                count > 10 &&
                <div className="pagination">
                    <Pagination size='small' total={50} onChange={(e) => {
                        setPage(e);
                        setChange(!change);
                    }} />
                </div>
            }
        </div>

    )
}

export default Table;
