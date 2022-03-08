import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import Word from '../Home/Word/Word';

const Jungurl = () => {

    const initialState = {
        data: [],
        wordSearchLine1: null,
        searchData: [],
        wordSearchLine2: null,
        searchData2: [],
        isLoading: true,
        isLoadingSearch: false,
        isLoadingSearch2: false
    }

    const jungReducer = (state, action) => {
        switch (action.type) {
            case 'JUNGURL_PAGE_ACTIONS':
                return { ...state, [action.name]: action.value };

            default:
                return state;
        }
    }

    const [jungState, jungDispatch] = useReducer(jungReducer, initialState);
    const { data, wordSearchLine1, searchData, wordSearchLine2, searchData2, isLoading, isLoadingSearch, isLoadingSearch2 } = jungState;

    // HANDLE JUNG ACTIONS
    const handleActions = (name, value) => {
        jungDispatch({
            type: "JUNGURL_PAGE_ACTIONS",
            name, value
        });
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/word`)
            .then(res => {
                handleActions('isLoading', true);

                if (res) {
                    handleActions('data', res.data);
                    handleActions('isLoading', false);
                }
            })
    }, [data]);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/word/wordSearch`, { wordSearchLine1 })
            .then(res => {
                if (res) {
                    handleActions('searchData', res.data);

                    if (wordSearchLine1 && !res.data.length) handleActions('isLoadingSearch', true);
                    if (res.data.length || !wordSearchLine1) handleActions('isLoadingSearch', false);
                }
            })
    }, [wordSearchLine1]);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/word/wordSearch`, { wordSearchLine2 })
            .then(res => {
                if (res) {
                    handleActions('searchData2', res.data);

                    if (wordSearchLine2 && !res.data.length) handleActions('isLoadingSearch2', true);
                    if (!wordSearchLine2 || res.data.length) handleActions('isLoadingSearch2', false);

                }
            })
    }, [wordSearchLine2]);

    // FILTERING DATA
    let count = 1;
    let jungUrlArray = [];

    for (const element of data) {
        if (element.page === "home" && count <= 60) count = count + 1;
        else if (element.page === "home" && count > 60) jungUrlArray.push(element);
        else if (element.page === "jungurl") jungUrlArray.push(element);
    }

    return (
        <div className="my-5">
            <div className="mb-5 text-center"><NavLink to="/">Back to Home</NavLink></div>

            <section>
                <div className="container mb-4">
                    <div className="row justify-content-center">
                        <div className="col-6 col-md-4">
                            <div className="input-group mb-3">
                                <input onChange={e => handleActions(e.target.name, e.target.value.toLowerCase())} type="text" name='wordSearchLine1' className="form-control py-2" placeholder="Search Word Line 1" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            </div>
                            <div className="input-group mb-3">
                                <input onChange={e => handleActions(e.target.name, e.target.value.toLowerCase())} type="text" name='wordSearchLine2' className="form-control py-2" placeholder="Search Word Line 2" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section>
                <div className="container mb-5">
                    <div className="row align-items-center">

                        {
                            ((!wordSearchLine1 && !wordSearchLine2) || (!wordSearchLine1 && wordSearchLine2) || (wordSearchLine1 && !wordSearchLine2)) ? jungUrlArray.map(word => <Word key={word._id} data={word}></Word>) : null
                        }

                        {
                            wordSearchLine1 && searchData.map(word => <Word key={word._id} data={word}></Word>)
                        }
                        {
                            wordSearchLine2 && searchData2.map(word => <Word key={word._id} data={word}></Word>)
                        }

                        {
                            (isLoading || isLoadingSearch || isLoadingSearch2) && <div className="d-flex justify-content-center my-5">
                                <div className="spinner-border p-5" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Jungurl;