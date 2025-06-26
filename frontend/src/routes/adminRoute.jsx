import { Navigate, Outlet } from 'react-router';

export default function AdminRoute() {
    let admin = true;
    return (
        <>
            {admin ? <Outlet /> : <Navigate to="/login" />}
        </>
    )
};
