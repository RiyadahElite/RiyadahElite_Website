import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingScreen from "../ui/LoadingScreen";

type UserRole = "user" | "admin" | "moderator" | "host";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[]; // roles allowed to access this route
}

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based access check
  if (allowedRoles.length > 0 && (!user || !allowedRoles.includes(user.role as UserRole))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
