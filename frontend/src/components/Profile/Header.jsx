// rafce
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [UserData, setUserData] = useState({username: "", email: ""});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`https://vibecast-v9sc.onrender.com/api/v1/user-details`, {
          withCredentials: true
        });
        setUserData(prevUserData => ({...prevUserData, ...res.data.user}));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);
  const LogOutHandler = async()=>{
    const res = await axios.post(`https://vibecast-v9sc.onrender.com/api/v1/logout`,
    {withCredentials: true

    });
    console.log(res);
    dispatch(authActions.logout());
    navigate("/");
  };
  return (
    <>
      {UserData && (
        <div className="bg-[#2F2E41] rounded py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:px-12">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-zinc-300">Profile</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-zinc-100 font-bold text-center">
              {UserData.username}
            </h1>
            <p className="text-zinc-300 mt-1">{UserData.email}</p>
          </div> 
          <div>
            <button className="bg-white px-4 py-2 rounded text-zinc-800 font-semibold hover:shadow-xl transition-all duration-300" 
            onClick={LogOutHandler}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;