
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
        
    );
};

export default HomeLayout;
