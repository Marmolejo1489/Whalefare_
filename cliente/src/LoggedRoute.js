import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function LoggedRoute({ isAuth, Component, ...rest }) {
    return (
        <Route {...rest}
            render={(props) => {
                if (!isAuth) {
                    return (
                        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )
                } else {
                    return <Component />

                }
            }} />
    )
}

export default LoggedRoute;