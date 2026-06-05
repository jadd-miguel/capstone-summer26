import { Navigate, Outlet } from 'react-router-dom'

interface PrivateRoutesProps {
	isAuthenticated: boolean;
}

export default function PrivateRoutes({ isAuthenticated }: PrivateRoutesProps): React.JSX.Element {
    
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}
