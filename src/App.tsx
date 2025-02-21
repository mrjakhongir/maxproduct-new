import { Routes, Route } from "react-router-dom";
import Calculator from "./pages/calculator/Calculator";
import Login from "./pages/auth/Login";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Prices from "./pages/dashboard/Prices";
import Offers from "./pages/dashboard/Offers";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import RequireAuth from "./components/RequireAuth";
import Features from "./pages/dashboard";
import History from "./pages/history/History";

function App() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route element={<RequireAuth allowedRole={["admin"]} user={user} />}>
          <Route path='dashboard' element={<DashboardLayout />}>
            <Route index element={<Features />} />
            <Route path='prices' element={<Prices />} />
            <Route path='offers' element={<Offers />} />
          </Route>
        </Route>
        <Route
          element={
            <RequireAuth allowedRole={["manager", "admin"]} user={user} />
          }
        >
          <Route index element={<Calculator />} />
          <Route path='history' element={<History />} />
        </Route>
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
