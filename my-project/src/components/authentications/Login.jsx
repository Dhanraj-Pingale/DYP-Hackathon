import React, { useContext, useState } from "react";


import image from '../../Assets/DYP.jpg';

const Login = () => {

  return (
   

        <div className="relative h-screen w-screen">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          
          {/* Overlay with less opacity */}
          <div className="absolute inset-0 bg-black opacity-50" />
    
          {/* Centered Content Div */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="bg-white bg-opacity-20 p-8 rounded-lg text-center">
              <h1 className="text-3xl font-bold text-white">Welcome to the Home Page</h1>
              <p className="text-lg text-white mt-4">This is a centered div on the page.</p>
            </div>
          </div>
        </div>
      );
    };
    
   
    

export default Login;
