import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Tregistration = () => {
  const [teacherName, setName] = useState("");
  const [teacherID, setTeacherID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/teacherregisterdb", { teacherName, teacherID, password })
      .then((result) => {
        console.log(result);
        navigate("/adashboard");
      })
      .catch((err) => {
        console.log(err);
        setError("Registration failed. Please try again.");
      });
  };

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name of Teacher"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="off"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="teacherID"
              placeholder="Create ID"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="off"
              required
              onChange={(e) => setTeacherID(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Set Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Teacher
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Tregistration;
