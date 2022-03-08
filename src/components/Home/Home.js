import React, { useEffect, useState } from 'react';
import bushImg from "../../images/Untitled_design__7_-removebg-preview.png";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Word from './Word/Word';
const Home = () => {
    const [words, setWords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/word/wordsLimit`).then(res => {
            setIsLoading(true);
            if (res) {
                setWords(res.data);
                setIsLoading(false);
            }
        })
    }, [words]);
    return (
        <div>
            <section className="hero-section mb-5">
                <div className="text-center">
                    <iframe className="hero-iframe" src="https://www.youtube.com/embed/AhP5Tg_BLIk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </section>

            <section>
                <div className="container mb-5">
                    <div className="row align-items-center">

                        {
                            !isLoading && words.map(word => <Word key={word._id} data={word}></Word>)
                        }
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

            <section>
                <div className="container justify-content-center">
                    <div className="row">
                        <div className="col-12 text-center">
                            <NavLink to="/jungurl"><img className="img-fluid" src={bushImg} alt="" /></NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;