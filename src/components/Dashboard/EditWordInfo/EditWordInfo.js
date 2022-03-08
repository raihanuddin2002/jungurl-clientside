import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const EditWordInfo = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const initialState = {
        wordLine1: "",
        wordLine2: "",
        redirectUrl: "",
        username: "",
        days: "",
        page: "",
        symbol: "",
        successMessage: false,
        isLoading: false
    }
    const editReducer = (state, action) => {

        switch (action.type) {
            case "SET_WORD_INFO":
                return { ...state, ...action.data }

            case "UPDATE_WORD_INFO":
                return { ...state, [action.key]: action.value }

            case "ISLOADING":
                return { ...state, isLoading: action.payload };

            case "SUCCESS_MESSAGE":
                return { ...state, successMessage: action.payload };

            default:
                return state;
        }
    }

    const [editState, editDispatch] = useReducer(editReducer, initialState);
    const { wordLine1, wordLine2, redirectUrl, days, symbol, page, username, isLoading, successMessage } = editState;

    // GET INPUT DATA
    const handleInput = (e) => {
        editDispatch({
            type: "UPDATE_WORD_INFO",
            key: e.target.name,
            value: e.target.value
        })
    }
    // UPDATE WORD INFO
    const updateWordInfo = (e) => {
        e.preventDefault();

        editDispatch({ type: "ISLOADING", payload: true });

        const updateWord = {
            wordLine1, wordLine2, redirectUrl, days, symbol, page, username
        }
        axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/word/allWords/${id}`, updateWord, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => {
                if (res) {
                    e.target.reset();
                    editDispatch({ type: "SUCCESS_MESSAGE", payload: true });
                    editDispatch({ type: "ISLOADING", payload: false });


                    setTimeout(() => {
                        editDispatch({ type: "SUCCESS_MESSAGE", payload: false });
                    }, 3000);
                }
            })
    }


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/word/allWords/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => {
                editDispatch({
                    type: "SET_WORD_INFO",
                    data: res.data
                });


            })
    }, [id, token]);

    return (
        <div style={{ height: "100vh" }} className="bg-secondary d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="text-center"><NavLink className="text-info" to="/dashboard">Back to DashBoard</NavLink></div>
                    <h1 className="text-center">Edit Word Info</h1>
                    <div className="col-md-6">
                        <form onSubmit={updateWordInfo}>
                            <div className="mb-3">
                                <label className="form-label">Word Line 1</label>
                                <input onChange={handleInput} type="text" name="wordLine1" className="form-control" value={wordLine1} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Word Line 2</label>
                                <input onChange={handleInput} type="text" name="wordLine2" className="form-control" value={wordLine2} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Redirect URL</label>
                                <input onChange={handleInput} type="text" name="redirectUrl" className="form-control" value={redirectUrl} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input onChange={handleInput} type="text" name='username' className="form-control" value={username} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Days</label>
                                <input onChange={handleInput} type="text" name="days" className="form-control" value={days} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Page</label>
                                <div>
                                    <select onChange={handleInput} className="btn btn-dark px-2 w-100" name="page" id="">
                                        <option className="bg-dark" value="" disabled>Select Page</option>
                                        {
                                            (page === "home") && <option className="bg-dark" value="home">home</option>
                                        }
                                        {
                                            (page === "home") && <option className="bg-dark" value="jungurl">jungurl</option>
                                        }
                                        {
                                            (page === "jungurl") && <option className="bg-dark" value="jungurl">jungurl</option>
                                        }
                                        {
                                            (page === "jungurl") && <option className="bg-dark" value="home">home</option>
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Symbol</label>
                                <div>
                                    <select
                                        onChange={handleInput} className="btn btn-dark px-2 w-100" name="symbol" id="">

                                        <option className="bg-dark" value="" disabled>Choose Symbol</option>
                                        {
                                            (symbol === "diamond") && <option className="bg-dark" value="diamond">diamond</option>
                                        }
                                        {
                                            (symbol === "diamond") && <option className="bg-dark" value="bush">bush</option>
                                        }
                                        {
                                            (symbol === "bush") && <option className="bg-dark" value="bush">bush</option>
                                        }
                                        {
                                            (symbol === "bush") && <option className="bg-dark" value="diamond">diamond</option>
                                        }
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-dark">Update</button>
                        </form>
                        {successMessage && <div className="alert alert-success mt-3" role="alert">
                            Data Upadated successfully!
                        </div>}
                        {
                            isLoading && <div className="d-flex justify-content-center my-5">
                                <div className="spinner-border p-4" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditWordInfo;