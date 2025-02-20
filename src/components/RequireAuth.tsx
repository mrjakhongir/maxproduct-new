import { Navigate, Outlet } from "react-router-dom";

interface RequireAuthProps {
  user: { role: string } | null;
  allowedRole: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ user, allowedRole }) => {
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  if (!allowedRole.includes(user.role)) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};

export default RequireAuth;
