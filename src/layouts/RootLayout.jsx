import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/Shared/NavBar';
import Footer from '../pages/Shared/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-full mx-auto'>
            <NavBar/>
            <Outlet></Outlet>
            <Footer/>
        </div>
    );
};

export default RootLayout;