import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthContextProvider(props) {

    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggin() {
        try {
            const loggedInRes = await axios.get('/user/loggedIn');
            setLoggedIn(loggedInRes);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getLoggin();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, getLoggin }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;
export { AuthContextProvider };

