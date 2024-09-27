import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/authentications/Login";
import Register from "./components/authentications/Register";
import Homepage from "./components/homepages/Homepage";
import ProtectedRoute from "./components/authentications/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import About from "./components/homepages/About";
import ALogin from "./components/Admin/ALogin";
import TLogin from "./components/teacher/TLogin";
import CLogin from "./components/club/CLogin";
import Adashboard from "./components/Admin/Adashboard";
import SLogin from "./components/student/SLogin";
import Cregistration from "./components/Admin/Cregistration";
import Tregistration from "./components/Admin/Tregistration";
import Sregistration from "./components/Admin/Sregistration";
import CDashboard from "./components/club/CDashboard";
import AddEventForm from "./components/club/AddEventForm";
import Sdashboard from "./components/student/Sdashboard";


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/about" element={<About></About>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/alogin" element={<ALogin></ALogin>} />
          <Route path="/tlogin" element={<TLogin></TLogin>} />
          <Route path="/clogin" element={<CLogin></CLogin>} />
          <Route path="/adashboard" element={<Adashboard />} />
          <Route path="/sdashboard" element={<Sdashboard />} />
          <Route path="/Cdashboard" element={<CDashboard />} />

          <Route path="/slogin" element={<SLogin></SLogin>} />
          <Route path="/cregister" element={<Cregistration></Cregistration>} />
          <Route path="/tregister" element={<Tregistration></Tregistration>} />
          <Route path="/sregister" element={<Sregistration></Sregistration>} />
          <Route path="/add-event" element={<AddEventForm />} />
          {/* Protected Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;