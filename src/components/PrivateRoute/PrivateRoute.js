
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { state } = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                state.token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}

                    />
                )
            }
        />
    );
};

export default PrivateRoute;