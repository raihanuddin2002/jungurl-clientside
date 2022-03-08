import axios from 'axios';
import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const Login = () => {
    const { dispatch } = useAuth();
    const token = localStorage.getItem("token");
    const history = useHistory();

    // IF USER LOGIN
    if (token) history.push("/");

    const initialState = {
        email: undefined,
        password: undefined,
        success: null,
        error: null,
        isLoading: false
    }
    const loginReducer = (state, action) => {
        switch (action.type) {

            case "LOGIN_SINGLE_ACTION":
                return { ...state, [action.name]: action.value }

            case "LOGIN_MULTIPLE_ACTIONS":
                return { ...state, ...action.loginSuccess };

            default:
                return state;
        }
    }
    const [loginState, loginDispatch] = useReducer(loginReducer, initialState);
    const { email, password, success, error, isLoading } = loginState;

    // HANDLE LOGIN ACIONS & GET FORM VALUES
    const handleActions = (name, value) => {
        loginDispatch({
            type: "LOGIN_SINGLE_ACTION",
            name, value
        });
    }

    //MANUAL LOGIN
    const handleManualLogin = (e) => {

        e.preventDefault();
        handleActions("isLoading", true);

        if (token) {
            handleActions("isLoading", false);
            return handleActions("error", "User Already Logged in");
        }

        if (!email || !password) {
            handleActions("isLoading", false);
            return handleActions("error", "Fill Correctly! Don't Use Suggesition, Please type..");
        }

        axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/user/login`, { email, password })
            .then(res => {
                loginDispatch({
                    type: "LOGIN_MULTIPLE_ACTIONS",
                    loginSuccess: { isLoading: false, success: "Login Successful", error: null }
                });

                dispatch({
                    type: "LOGIN",
                    loginActions: { isLogin: true, token: res.data }
                });

                localStorage.setItem("token", res.data);
                e.target.reset();

                setTimeout(() => handleActions('success', null), 4000);

            })
            .catch(err => {
                loginDispatch({
                    type: "LOGIN_MULTIPLE_ACTIONS",
                    loginSuccess: { isLoading: false, success: null, error: err?.response?.data }
                });
            });

    }
    return (
        <div className="container text-start bg-white my-5">
            <div style={{ height: "75vh" }} className="row d-flex align-items-center">
                <div className="col my-auto bg-white p-5">
                    <h1 className="mb-5 text-pink">LOG IN</h1>
                    <form onSubmit={handleManualLogin} className="border-0">
                        <div className="mb-3">
                            <label className="form-label fw-bold">Email address</label>
                            <input onBlur={e => handleActions(e.target.name, e.target.value)} type="email" name='email' className="form-control rounded-0  border-0 border-bottom border-2 border-dark" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Password</label>
                            <input onBlur={e => handleActions(e.target.name, e.target.value)} type="password" name='password' className="form-control rounded-0  border-0 border-bottom border-2 border-dark" />
                        </div>

                        {success && <h6 className="text-success mb-3">{success}</h6>}
                        {error && <h6 className="text-danger mb-3">{error}</h6>}
                        {!isLoading && <button type="submit" className="btn bg-dark px-4 py-2 text-uppercase text-white">Log in</button>}
                        {isLoading && <div className="spinner-border text-pink  p-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}

                        <div className="my-3 text-center">
                            <Link to="/signup"><span className="text-pink text-decoration-none">Create a new account?</span></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;