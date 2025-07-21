
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
        
    );
};

export default HomeLayout;
