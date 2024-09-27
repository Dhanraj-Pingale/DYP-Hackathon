import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import event from "../../Assets/event.webp"

const CDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-white text-zinc-600">
      {/* Sidebar */}
      <div className={`relative min-h-full ${isOpen ? 'w-64' : 'w-20'} bg-gray-300 duration-300`}>
        <div className="absolute top-0 right-0 p-4">
          <button onClick={toggleSidebar} className="text-xl">
            {isOpen ? '<<' : '>>'}
          </button>
        </div>
        <div className="flex flex-col items-start p-6 space-y-4 mt-16">
          {/* Link to the Add Event form route */}
          <Link to="/add-event" className="hover:text-gray-900 flex items-center">
            <span className="text-lg mr-2">🎭</span>
            {isOpen && <span>Add Event</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Club Dashboard</h1>
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
}

export default CDashboard;
