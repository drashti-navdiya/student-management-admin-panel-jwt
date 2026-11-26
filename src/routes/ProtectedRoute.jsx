import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute Component
 * Guards routes by checking if a valid JWT token exists in localStorage.
 * Redirects unauthenticated users to /login.
 */
function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
