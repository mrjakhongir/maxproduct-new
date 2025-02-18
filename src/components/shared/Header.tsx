import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { REMOVE_ACTIVE_USER } from "@/redux/slices/authSlice";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function signOutUser() {
    await signOut(auth);
    dispatch(REMOVE_ACTIVE_USER());
    navigate("/");
  }
  return (
    <header>
      <Container className='py-5 flex items-center justify-between border-b-2'>
        <h1 className='text-3xl font-semibold'>Simple Steps</h1>
        <div className='flex gap-3'>
          <Link to='/'>
            <Button>Calculator</Button>
          </Link>
          {isLoggedIn && (
            <Button variant='outline' onClick={signOutUser}>
              Logout
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
