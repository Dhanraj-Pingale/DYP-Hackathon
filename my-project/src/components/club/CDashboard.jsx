import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import event from "../../Assets/event.webp";

const CDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-white text-zinc-600">
      {/* Sidebar */}
      <div className={`relative min-h-full ${isOpen ? 'w-80' : 'w-20'} bg-gray-300 transition-width duration-300`}>
        <div className="absolute top-0 right-0 p-4">
          <button onClick={toggleSidebar} className="text-3xl">
            {isOpen ? '<<' : '>>'} {/* Simple text for toggle */}
          </button>
        </div>
        <div className="flex flex-col text-xl items-start p-9 space-y-8 mt-20">
          <Link to="/add-event" className="hover:text-gray-900 flex items-center">
            <span className="text-xl mr-4">🎭</span>
            {isOpen && <span>Add Event</span>}
          </Link>
          <Link to="/add-club-details" className="hover:text-gray-900 flex items-center">
            <span className="text-lg mr-4">📝</span>
            {isOpen && <span>Add Club Details</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Club Dashboard</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default CDashboard;
