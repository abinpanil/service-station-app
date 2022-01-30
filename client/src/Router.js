import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import AuthContext from './context/AuthContext'
import ViewJobcard from './components/ViewJobcard';

function Router() {

    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={loggedIn ? <Home page="view_jobcard" /> : <Navigate to='/signin' />} />
                <Route path='/create-jobcard' element={loggedIn ? <Home page="new_jobcard" /> : <Navigate to='/signin' />} />
                <Route path='/signin' element={loggedIn ? <Navigate to='/' /> : <Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;