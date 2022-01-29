import axios from 'axios';
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'



function SignIn(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { getLoggin } = createContext(AuthContext);
    const navigate = useNavigate();

    async function clickHandler(e) {
        e.preventDefault();
        console.log("clicked");
        try {
            const loginData = {
                username: username,
                password: password
            }

            await axios.post('/user/login', loginData);
            getLoggin();
            navigate('/');

        } catch (e) {
            setErrorStatus(true)
            setErrorMessage(e.response.data.errorMessage)
        }
    }

    return (
        <div className="form-container log-in-container">
            <form action="#">
                <h1>SignIn</h1>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                {errorStatus && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button onClick={clickHandler}>Log In</button>
                <a onClick={props.onChange}>New User. Register?</a>
            </form>
        </div>
    );
}

export default SignIn;
