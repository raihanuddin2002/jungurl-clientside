import React, { createContext, useReducer } from 'react';
import reducer from './reducer';

export const Auth = createContext();

const AuthContext = ({ children }) => {

    const initialState = {
        isDelete: undefined,
        token: localStorage.getItem("token"),
        isLogin: false,
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Auth.Provider value={{ state, dispatch }}>
            {children}
        </Auth.Provider>
    );
};

export default AuthContext;