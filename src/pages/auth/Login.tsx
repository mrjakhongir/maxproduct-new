import { LoginForm } from "@/components/login-form";

const Login = () => {
  return (
    <div className='flex min-h-[calc(100svh-200px)] w-full items-center justify-center p-6'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
