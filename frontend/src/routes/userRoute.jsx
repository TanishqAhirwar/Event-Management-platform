import { Navigate, Outlet } from 'react-router';

export default function UserRoute() {
    let user = true;
    return (
        <>
            {user ? <Outlet /> : <Navigate to="/login" />}
        </>
    )
};