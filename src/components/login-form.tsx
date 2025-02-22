"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const uid = result.user.uid;
      const userDoc = await getDoc(doc(db, "users", uid));

      if (userDoc.exists()) {
        const newUser = {
          ...userDoc.data(),
        };
        dispatch(SET_ACTIVE_USER(newUser));
      }

      navigate("/", { replace: true });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Логин</CardTitle>
          <CardDescription>Войдите в свой аккаунт</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6 pb-4 relative'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Логин</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='nusratovjahongir@gmail.com'
                  required
                  name='email'
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  value={credentials.email}
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Пароль</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  name='password'
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  value={credentials.password}
                />
              </div>
              <Button type='submit' className='w-full mt-1'>
                {loading ? "Загрузка..." : "Войти"}
              </Button>
              {error && (
                <p className='absolute text-red-500 text-sm left-1/2 -translate-x-1/2 top-[98%]'>
                  Неправильный логин или пароль
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
