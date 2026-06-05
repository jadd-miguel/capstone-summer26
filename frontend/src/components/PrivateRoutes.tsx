import { Navigate, Outlet } from 'react-router-dom'

interface PrivateRoutesProps {
	isAuthenticated: boolean;
}
{/* Component to only allow user to navigate other pages if logged in */}
export default function PrivateRoutes({ isAuthenticated }: PrivateRoutesProps): React.JSX.Element {
    
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}
