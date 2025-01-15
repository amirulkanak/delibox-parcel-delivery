import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const MainLayout = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <main className="flex flex-col min-h-screen">
        {/* Dynamic children component from router */}
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
      <Toaster />
    </>
  );
};

export default MainLayout;
