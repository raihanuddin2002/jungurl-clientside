import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo2.png';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { state, dispatch } = useAuth();
    const [login, setLogin] = useState('');

    useEffect(() => {
        setLogin(localStorage.getItem("token"));
    }, [state.isLogin]);

    return (
        <div className='container-fluid'>
            <div className="row align-items-center">
                <div className="col-md-4"></div>
                <div className="text-center col-md-4">
                    <NavLink to="/"><img className="img-fluid logo" src={logo} alt="" srcSet="" title='Back to home page' /></NavLink>
                </div>

                <div className="col-md-4 text-uppercase">
                    <NavLink to="/signup"><button className='btn btn-outline-success px-3 fs-4 fw-bold border-2 me-3 text-uppercase'>Sign Up</button></NavLink>
                    <NavLink to="/dashboard"><button className='btn btn-outline-success px-3 fs-4 fw-bold border-2 me-3 text-uppercase'>Admin Panel</button></NavLink>
                    <NavLink to="/userpanel"><button className='btn btn-outline-success px-3 fs-4 fw-bold border-2 me-3 text-uppercase'>User Panel</button></NavLink>
                    {
                        !login && <NavLink to="/login"><button className='btn btn-outline-success px-3 fs-4 fw-bold border-2 text-uppercase'>Log in</button></NavLink>

                    }
                    {
                        login && <button onClick={() => {
                            dispatch({
                                type: "LOGOUT",
                                logOutActions: { isLogin: false, token: localStorage.removeItem("token") }
                            })
                        }} className='btn btn-outline-success px-3 fs-4 fw-bold border-2 text-uppercase'>Logout</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;