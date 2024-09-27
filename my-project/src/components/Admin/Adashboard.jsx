import React, { useState } from 'react';

const Adashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className={`relative min-h-full ${isOpen ? 'w-64' : 'w-20'} bg-gray-800 duration-300`}>
        <div className="absolute top-0 right-0 p-4">
          <button onClick={toggleSidebar} className="text-xl">
            {isOpen ? '<<' : '>>'} {/* Simple text for toggle */}
          </button>
        </div>
        <div className="flex flex-col items-start p-6 space-y-4 mt-16">
          <a href="#student" className="hover:text-gray-300 flex items-center">
            <span className="text-lg mr-2">👤</span>
            {isOpen && <span>Register Student</span>}
          </a>
          <a href="#teacher" className="hover:text-gray-300 flex items-center">
            <span className="text-lg mr-2">👨‍🏫</span>
            {isOpen && <span>Register Teacher</span>}
          </a>
          <a href="#club" className="hover:text-gray-300 flex items-center">
            <span className="text-lg mr-2">🏢</span>
            {isOpen && <span>Register Club</span>}
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default Adashboard;
