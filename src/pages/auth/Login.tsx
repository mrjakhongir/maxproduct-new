import { LoginForm } from "@/components/login-form";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (user) return <Navigate to='/' replace />;
  return (
    <div className='flex min-h-[calc(100svh-200px)] w-full items-center justify-center p-6'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
