import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export const ProtectedRoute: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const isAuthenticated = useAppSelector(state => state.userAuthentication.isAuthenticated);

    useEffect(() => {
        console.log('isAuth', isAuthenticated);
    }, [isAuthenticated]);

    return isAuthenticated ? <div className='bg-white col-span-10 p-4 rounded-3xl'>{children}</div> : <Navigate to="/" />;
};