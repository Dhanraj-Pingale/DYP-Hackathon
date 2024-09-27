import React from "react";
import logo from "../../Assets/logo.png";
import image from '../../Assets/institute-of-engineering-and-technology.jpg';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  
  const handleAdmin = () => {
    navigate('/alogin');
  }
  
  const handleTeacher = () => {
    navigate('/tlogin');
  }
  
  const handleStudent = () => {
    navigate('/slogin');
  }
  
  const handleClub = () => {
    navigate('/clogin');
  }
  
  return (
    <div className="relative h-screen w-screen flex items-center justify-center ">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }} // Corrected inline style for background image
      />

      {/* Overlay with less opacity */}
      <div className="absolute inset-0 bg-black opacity-50 " />

      {/* Centered Content Div */}
      <div className="relative z-10 flex items-center justify-center h-full w-[80%] shadow-black">
        <div className="bg-zinc-50 p-8 rounded-3xl text-center flex items-center w-[70%] h-[60%] shadow-sm"> {/* Adjust size if needed */}
          {/* Left Section with Logo */}
          <div className="flex flex-col items-center w-[50%] h-full">
            <img src={logo} alt="Logo" className="w-44 m-10" /> {/* Adjust logo size */}
            <h1 className="text-red-700 text-2xl font-bold text-center">
              Dr. D. Y. Patil Unitech Society's <br />
              Dr. D. Y. Patil Institute of Technology
              
            </h1>
            <h1 className="text-[#00ACD6] p-16 text-lg ">
            Accredited by NAAC with a CGPA of 3.74 on a four point scale at 'A++' Grade
            </h1>
          </div> 

          {/* Button Group */}
          <div className="flex flex-col items-center space-y-6 border-l-4 border-gray-300 p-4 justify-center w-[50%] h-full">
            <h1 className=" font-bold text-3xl text-zinc-500">
              Sign In</h1> {/* Vertical spacing between buttons */}
            <button onClick={handleAdmin} className="w-[50%] bg-[#00ACD6] text-white p-2 rounded">Admin</button>
            <button onClick={handleTeacher} className="w-[50%] bg-[#00ACD6] text-white p-2 rounded">Teacher</button>
            <button onClick={handleStudent} className="w-[50%] bg-[#00ACD6] text-white p-2 rounded">Student</button>
            <button onClick={handleClub} className="w-[50%] bg-[#00ACD6] text-white p-2 rounded">Club</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
