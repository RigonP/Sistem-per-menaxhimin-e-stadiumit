import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Authentication/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
        />
    );
};
