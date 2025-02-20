import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { REMOVE_ACTIVE_USER } from "@/redux/slices/authSlice";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  async function signOutUser() {
    await signOut(auth);
    dispatch(REMOVE_ACTIVE_USER());
    navigate("/login");
  }
  return (
    <header>
      <Container>
        <div className='flex items-center gap-2 bg-[#A6AEBF] py-1 px-3 rounded-lg mb-1'>
          <div className='flex gap-1 border-r pr-2'>
            <img src='/headset.svg' alt='headset' className='w-4 h-4' />
            <span className='text-[12px] font-semibold text-white tracking-wide'>
              {user?.fName}
            </span>
          </div>
          <span className='text-[10px] text-white uppercase font-semibold tracking-widest  border-r pr-2'>
            {user?.role}
          </span>
          <span className='text-[11px] text-white'>{user?.phone}</span>
        </div>
        <div className='flex items-center justify-between py-2 px-3 rounded-lg bg-[rgb(0,102,176)]'>
          <h1 className='text-2xl text-white font-semibold'>Simple Steps</h1>
          <div className='flex gap-4'>
            {user?.role === "admin" && (
              <div>
                <Link to='/dashboard'>
                  <Button
                    variant='link'
                    className={`${
                      location.pathname.includes("dashboard") && "underline"
                    } text-white`}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link to='/'>
                  <Button
                    variant='link'
                    className={`${
                      location.pathname === "/" && "underline"
                    } text-white`}
                  >
                    Calculator
                  </Button>
                </Link>
              </div>
            )}
            {user && (
              <Button onClick={signOutUser} variant='outline'>
                <span>Logout</span>
                <LogOut />
              </Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
