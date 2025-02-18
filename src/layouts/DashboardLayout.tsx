import Container from "@/components/Container";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <Container className='flex gap-3 mt-3 px-0 h-[calc(100svh-100px)]'>
      <DashboardSidebar />
      <main className='flex-[3] bg-muted rounded-lg p-5'>
        <Outlet />
      </main>
    </Container>
  );
};

export default DashboardLayout;
