import React from 'react';
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from './ErrorPage.jsx';
import InputPodcast from '../components/AddPodcast/InputPodcast';
// import AllPodcasts from "../pages/AllPodcast"
const AddPodcast = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  return (
    <div>
        {isLoggedIn ?  <InputPodcast /> : <ErrorPage/>}
    </div>
  );
};

export default AddPodcast;