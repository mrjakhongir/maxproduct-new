import Container from "@/components/Container";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <Container className='flex gap-3 mt-3 px-0 h-[calc(100svh-120px)]'>
      <DashboardSidebar />
      <main className='flex-[3] border rounded-lg py-4 px-2 h-full '>
        <Outlet />
      </main>
    </Container>
  );
};

export default DashboardLayout;
