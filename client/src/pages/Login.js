import React, { useState } from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import './Login.css'

function Login() {

    const [signUpStatus, setSignupStatus] = useState(false);

    function signUp() {
        setSignupStatus(true);
    }

    function signIn() {
        setSignupStatus(false);
    }

    return (
        <div className='body_login'>
            <div className="container" id="container">
                {signUpStatus ? <SignUp onChange={signIn} /> : <SignIn onChange={signUp} />}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Say Vehicle Services</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
