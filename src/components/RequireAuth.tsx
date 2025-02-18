import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace />;
};

export default RequireAuth;
