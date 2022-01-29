import React, { createContext, useState } from 'react';
import axios from "axios";
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function SignUp(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifypassword, setVerifypassword] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { getLoggin } = createContext(AuthContext);
    const navigate = useNavigate();




    async function clickHandler(event) {
        event.preventDefault();
        try {
            const signUpData = {
                name: name,
                email: email,
                mobile: mobile,
                username: username,
                password: password,
                verifyPassword: verifypassword
            }

            await axios.post('/user/register', signUpData)
            getLoggin();
            navigate('/');

        } catch (e) {
            setErrorStatus(true)
            setErrorMessage(e.response.data.errorMessage)
        }

    }

    return <div className="form-container log-in-container">
        <form action="#">
            <h1>SignUp</h1>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Mobile" onChange={(e) => setMobile(e.target.value)} />
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="VerifyPassword" onChange={(e) => setVerifypassword(e.target.value)} />
            {errorStatus && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button onClick={clickHandler}>Register</button>
            <a onClick={props.onChange}>Already have an Account?</a>
        </form>
    </div>;
}

export default SignUp;
