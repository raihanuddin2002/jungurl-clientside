import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const VerifyEmail = () => {
    const history = useHistory();
    const [message, setMessage] = useState('Account Verified Successful');

    setTimeout(() => {
        setMessage("Your Account Created Successfully! Wait..")
    }, 2000);
    setTimeout(() => {
        history.push("/login");
    }, 4000);
    return (
        <div style={{ height: "100vh" }} className='bg-white d-flex justify-content-center align-items-center'>
            <div className='p-5 shadow-lg'>
                <h1 className="fs-3 text-uppercase">{message}</h1>
            </div>
        </div>
    );
};

export default VerifyEmail;