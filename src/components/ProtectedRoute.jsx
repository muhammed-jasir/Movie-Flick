import React from 'react'
import { useAuthContext } from '../store/authContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to='/login' />;
    }

    return children;
}

export default ProtectedRoute