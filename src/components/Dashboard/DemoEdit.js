import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

    const initialState = {
        firstName: undefined,
        lastName: undefined,
        country: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
        isVerified: false,
        role: "user",
        success: undefined,
        error: undefined,
        isLoading: false
    }
    const signUpReducer = (state, action) => {
        switch (action.type) {
            case "GET_INPUT_DATA":
                return { ...state, [action.name]: action.value };

            case 'SIGNUP_ACTIONS':
                return { ...state, [action.name]: action.value };

            default:
                return state;
        }
    }

    const [signupState, signupDispatch] = useReducer(signUpReducer, initialState);
    const { firstName, lastName, country, email, password, confirmPassword, isVerified, role, success, error, isLoading } = signupState;


    // GET DATA FROM INPUT
    const handleInput = (e) => {
        signupDispatch({
            type: 'GET_INPUT_DATA',
            name: e.target.name,
            value: e.target.value
        });
    }

    // HANDLE ACTIONS
    const handleActions = (name, value) => {
        signupDispatch({
            type: 'SIGNUP_ACTIONS',
            name, value
        });
    }

    /*===========================
     *  MANUAL REGISTRATION 
     *==========================*/
    const handleRegistration = (e) => {

        e.preventDefault();
        handleActions('isLoading', true);

        // MATCH PASS & CONFIRM PASS 
        if (password !== confirmPassword) {
            handleActions('isLoading', false);
            return handleActions('error', 'Password not matched!!');
        } else {
            handleActions('error', null);
        }

        // IF EMPTY FIELD
        if (!firstName || !lastName || !country || !email || !password) {
            handleActions('isLoading', false);
            return handleActions('error', "Please Fill up all fields carefully! Don't Use auto suggestions, please type");
        } else {
            handleActions('error', null);
        }

        // SAVE USER INFO
        const userInfo = {
            firstName, lastName, country, email, password, isVerified, role
        }

        axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/user`, { ...userInfo })
            .then(res => {
                e.target.reset();

                handleActions('isLoading', false);
                handleActions('success', res.data.message);

                setTimeout(() => handleActions('success', null), 20000);
            })
            .catch(err => {
                handleActions('isLoading', false);
                handleActions('success', null);
                handleActions('error', err?.response?.data);

                setTimeout(() => handleActions('error', null), 7000);
            });
    }

    return (
        <>
            <div className="container text-start">
                <div style={{ height: "100vh" }} className="row d-flex align-items-center">
                    <div className="col my-auto bg-white p-5">
                        <h1 className="mb-5 text-pink">SIGN UP</h1>
                        <form onSubmit={handleRegistration} className="border-0" autoComplete='on'>
                            <div className="mb-3">
                                <label className="form-label fw-bold">First Name</label>
                                <input onBlur={handleInput} type="text" name='firstName' className="form-control rounded-0 border-0 border-bottom border-2 border-dark" autoComplete='on' required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Last Name</label>
                                <input onBlur={handleInput} type="text" name="lastName" className="form-control rounded-0 border-0 border-bottom border-2 border-dark" autoComplete='on' required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Your Country</label>
                                <input onBlur={handleInput} type="text" name='country' className="form-control rounded-0 border-0 border-bottom border-2 border-dark" autoComplete='on' required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Email address</label>
                                <input onBlur={handleInput} type="email" name='email' className="form-control rounded-0  border-0 border-bottom border-2 border-dark" autoComplete='on' required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Password</label>
                                <input onBlur={handleInput} type="password" name='password' className="form-control rounded-0  border-0 border-bottom border-2 border-dark" autoComplete='on' required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Confirm Password</label>
                                <input onBlur={handleInput} type="password" name='confirmPassword' className="form-control rounded-0  border-0 border-bottom border-2 border-dark" autoComplete='on' required />
                            </div>

                            {success && <h6 className="mb-3 text-success">{success}</h6>}
                            {error && <h6 className="mb-3 text-danger">{error}</h6>}
                            {!isLoading && <button type="submit" className="btn bg-dark px-4 py-2 text-white text-uppercase">Sign Up</button>}
                            {isLoading && <div className="spinner-border text-pink  p-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>}

                            <div className="my-3 text-center">
                                <Link to="/login"><span className="text-pink">Already has an account?</span></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;