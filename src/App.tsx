import { Routes, Route } from "react-router-dom";
import Calculator from "./pages/calculator/Calculator";
import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/Login";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Features from "./pages/dashboard/Features";
import Offers from "./pages/dashboard/Offers";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import RequireAuth from "./components/RequireAuth";

function App() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return (
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Calculator />} />
        <Route path='login' element={<Login />} />

        <Route element={<RequireAuth isLoggedIn={isLoggedIn} />}>
          <Route path='dashboard' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='features' element={<Features />} />
            <Route path='offers' element={<Offers />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
