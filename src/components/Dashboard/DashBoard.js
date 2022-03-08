import axios from 'axios';
import React, { useEffect, useReducer, } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../hooks/useAuth';
import WordInfo from './WordInfo/WordInfo';

const DashBoard = () => {
    const { state, dispatch } = useAuth();
    const token = localStorage.getItem("token");

    const initialState = {
        wordLine1: "",
        wordLine2: "",
        redirectUrl: "",
        username: "",
        days: "",
        page: "home",
        symbol: "diamond",
        wordInfo: [],
        isAddWord: '',
        wordSearchLine1: null,
        searchData: [],
        wordSearchByUsername: null,
        wordSearchByUsernameData: [],
        isLoading: false
    }
    const dashReducer = (state, action) => {
        switch (action.type) {
            case "DASHBOARD_ACTIONS":
                return { ...state, [action.name]: action.value };

            default:
                return state;
        }
    }

    const [dashState, dashDispatch] = useReducer(dashReducer, initialState);
    const { wordLine1, wordLine2, redirectUrl, days, symbol, page, username, wordInfo, isAddWord, wordSearchLine1, searchData, wordSearchByUsername, wordSearchByUsernameData, isLoading } = dashState;

    // GET DATA FROM INPUTS
    const handleInput = (e) => {
        dashDispatch({
            type: "DASHBOARD_ACTIONS",
            name: e.target.name,
            value: e.target.value
        })
    }

    // COMMON FUNCTIONS FOR CHANGE STATES
    const handleActions = (name, value) => {
        dashDispatch({
            type: "DASHBOARD_ACTIONS",
            name, value
        })
    }

    // SUBMIT DATA
    const submitWord = async (e) => {
        e.preventDefault();

        const wordInfo = {
            wordLine1, wordLine2, redirectUrl, days, symbol, page, username
        }

        fetch(`${process.env.REACT_APP_BACKEND_API_URL}/word/addWord`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(wordInfo)
        })
            .then(res => res.json())
            .then(data => {
                handleActions("isAddWord", data);
                e.target.reset();
            })
            .catch(err => console.log(err))

    }

    // DISPLAY WORDINFO
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/word`)
            .then(res => {
                handleActions("isLoading", true);
                if (res) {
                    handleActions("wordInfo", res.data);
                    handleActions("isLoading", false);
                }
            })
    }, [isAddWord, state.isDelete]);

    // SEARCH BY WORD LINE 1
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/word/wordSearch`, { wordSearchLine1 })
            .then(res => {
                if (res) {
                    handleActions("searchData", res.data);
                    if (wordSearchLine1 && !res.data.length) handleActions("isLoading", true);
                    if (res.data.length || !wordSearchLine1) handleActions("isLoading", false);
                }
            })
    }, [wordSearchLine1]);

    // SEARCH BY USERNAME
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/word/wordSearch`, { wordSearchByUsername })
            .then(res => {
                if (res) {
                    handleActions("wordSearchByUsernameData", res.data);

                    if (wordSearchByUsername && !res.data.length) {
                        handleActions("isLoading", true);
                        setTimeout(() => handleActions("isLoading", false), 5000);
                    }
                    if (res.data.length || !wordSearchByUsername) handleActions("isLoading", false);
                }
            })
    }, [wordSearchByUsername]);

    return (
        <>
            <div className="dashboard-container">
                <div className='row bg-dark align-items-center'>
                    <div className='col-1 text-end'><NavLink to="/" className='btn btn-danger'>Back Home</NavLink></div>
                    <div className='col-10'><h1 className="py-2 display-1 text-white text-center">Admin Dashboard</h1></div>
                    <div className='col-1'><button onClick={() => {
                        dispatch({
                            type: "LOGOUT",
                            logOutActions: { isLogin: false, token: localStorage.removeItem("token") }
                        })
                    }} className='btn btn-danger'>Logout</button></div>
                </div>


                <section>
                    <div className="container my-5">
                        <form onSubmit={submitWord} action="">
                            <div className="row justify-content-center">

                                <div className="col-lg-2">
                                    {/*  */}
                                    <div className="row">
                                        <div className="mb-3">
                                            <div><label className="form-label fw-bold fs-5">Choose Symbol</label></div>
                                            <select onChange={handleInput} className="btn btn-secondary px-2" name="symbol" id="">
                                                <option className="bg-dark" value="" disabled>Choose Symbol</option>
                                                <option value="diamond">Diamond</option>
                                                <option value="bush">Bush</option>
                                            </select>
                                        </div>

                                        <div className="dropdown">
                                            <label className="form-label fw-bold fs-5">List On</label>
                                            <div>
                                                <select onChange={handleInput} className="btn btn-secondary px-2" name="page" id="">
                                                    <option className="bg-dark" value="" disabled>Select Page</option>
                                                    <option value="home">Home</option>
                                                    <option value="jungurl">JungUrl</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold fs-5">Add Word</label>
                                        <input onBlur={handleInput} type="text" name="wordLine1" className="form-control mb-2" placeholder="Line 1 on wood" required />

                                        <input onBlur={handleInput} type="text" name="wordLine2" className="form-control" placeholder="Line 2 on wood" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold fs-5">Redirect URL</label>
                                        <input onBlur={handleInput} type="text" name="redirectUrl" className="form-control mb-2" placeholder="Type the website URL that user redirected to when he clicks on the words or Symbol" required />
                                    </div>

                                    {/*  */}
                                    <div className="dropdown mb-4">
                                        <label className="form-label fw-bold fs-5">How Many Days Before Deletation?</label>
                                        <input onBlur={handleInput} type="number" name="days" className="form-control mb-2" placeholder="How many days?" required />
                                    </div>
                                    <div className="dropdown mb-4">
                                        <label className="form-label fw-bold fs-5">Username</label>
                                        <div>
                                            <input onBlur={handleInput} type="text" name="username" className="form-control mb-2" placeholder="Username" required />
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-dark px-4">Submit</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </section>

                <section className="bg-secondary py-5">
                    <div className="container py-5">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <div className="input-group mb-3">
                                    <input onChange={handleInput} type="text" name="wordSearchLine1" className="form-control" placeholder="Search By Word" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                </div>

                                <div className="input-group mb-3">
                                    <input onChange={handleInput} type="text" name="wordSearchByUsername" className="form-control" placeholder="Search By Username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                </div>
                            </div>

                        </div>

                        {/*  */}
                        <div style={{ height: "100vh" }} className="col-12 overflow-scroll py-3">
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Word</th>
                                        <th scope="col">Redirect</th>
                                        <th scope="col">username</th>
                                        <th scope="col">Days</th>
                                        <th scope="col">Page</th>
                                        <th scope="col">Symbol</th>
                                        <th scope="col"> Edit</th>
                                        <th scope="col"> Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (!wordSearchLine1 && !wordSearchByUsername && !isLoading) ? wordInfo.map(data => <WordInfo key={data._id} data={data}></WordInfo>) : ""
                                    }
                                    {
                                        wordSearchLine1 && searchData.map(data => <WordInfo key={data._id} data={data}></WordInfo>)
                                    }
                                    {
                                        wordSearchByUsername && wordSearchByUsernameData.map(data => <WordInfo key={data._id} data={data}></WordInfo>)
                                    }
                                </tbody>
                            </table>

                            {
                                isLoading && <div className="d-flex justify-content-center my-5">
                                    <div className="spinner-border p-4" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};

export default DashBoard;