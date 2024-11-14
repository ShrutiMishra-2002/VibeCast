import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import MainLayout from './layout/MainLayout';
import Categories from './pages/Categories';
import Home from './pages/Home';
import AuthLayout from './layout/AuthLayout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { authActions } from "./store/auth";
import AddPodcast from "../src/pages/AddPodcast";
import AllPodcasts from "../src/pages/AllPodcasts";
import CategoriesPage from './pages/CategoriesPage';
import DescriptionPage from './pages/DescriptionPage';

const App = () => {
 const dispatch = useDispatch();
 useEffect(() => {
 const fetch = async () =>{
try{
 const res = await axios.get(
  `${process.env.REACT_APP_SERVER_URL}/api/v1/check-cookie`,
  {withCredentials : true}
);
 if(res.data.message == true)
 {
  dispatch(authActions.login());
 }
}
 catch(error){
 // console.log(error);
 }
 };
fetch();
}, []);
  return (
    <Router>
      <Routes>
        {/* MainLayout for Home page */}
        <Route path="/" element={<MainLayout />}>
        {" "}
          <Route index element={<Home />} />
          <Route path= "/categories" element={<Categories/>} />
          <Route path= "/profile" element={<Profile/>} />
          <Route path= "/add-podcast" element={<AddPodcast/>} />
          <Route path="/all-podcasts" element={<AllPodcasts />} />
          <Route path="/categories/:cat" element={<CategoriesPage />} />
          <Route path="/description/:id" element={<DescriptionPage />} />
          </Route>

        {/* AuthLayout for authentication-related routes */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
        </Route>
      </Routes>
    </Router>
    // </div>
  );
};

export default App;
