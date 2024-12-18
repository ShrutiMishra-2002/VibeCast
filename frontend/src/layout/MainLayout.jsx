import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import Footer from '../components/Footer/Footer';
const MainLayout = () =>{
  return (
    <div className="relative min-h-screen">
        <Navbar />
        <main className="">
        <Outlet />
        </main>
        <div className="w-full">
        <AudioPlayer/>
        </div>
        <Footer/>
    </div>
  );
};
export default MainLayout;