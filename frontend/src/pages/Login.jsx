import React , {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import ErrorPage from "./ErrorPage.jsx";


const Login = () =>{
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Prevent form submission & submit values
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    try {
      const res = await axios.post(
        "${process.env.REACT_APP_SERVER_URL}/api/v1/sign-in",
        values , { withCredentials : true }
      );
      dispatch(authActions.login());
    //   console.log(res.data);
      navigate("/profile");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

    return(
      <>
      { isLoggedIn ? <ErrorPage/> : <div className="h-screen bg-[#C7D2FE] flex items-center justify-center">
        <div className="w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center justify-center">
        <Link to ="/" className="text-2xl font-bold">
           VibeCast
        </Link>
        <div className="mt-6 w-full">
            <div className="w-full flex flex-col mt-2">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" className="mt-2 px-2 py-2 rounded outline-none border border-black " 
                required placeholder="Email" name="email" value={values.email} onChange={change}
                />
            </div>
            <div className="w-full flex flex-col mt-2">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" className="mt-2 px-2 py-2 rounded outline-none border border-black " 
                required placeholder="Password" name="password" value={values.password} onChange={change}
                />
            </div>
            <div className="w-full flex flex-col mt-4">
                <button className="bg-[#2F2E41] font-semibold text-xl text-white rounded py-2" onClick={handleSubmit}>
                    Login
                </button>
            </div>
            <div className="w-full flex flex-col mt-4">
               <p className="text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="font-semibold hover:text-blue-600">
                Signup
                </Link>
               </p>
            </div>
        </div>
        </div>
    </div> }
    </>
        
    );
}
export default Login;