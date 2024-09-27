import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sdashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (showEvents) {
      fetchEvents();
    }
  }, [showEvents]);

  const handleEventsClick = () => {
    setShowEvents(true);
  };

  return (
    <div className="flex h-screen bg-white text-zinc-600">
      {/* Sidebar */}
      <div className={`relative min-h-full ${isOpen ? 'w-80' : 'w-20'} bg-gray-300 duration-300`}>
        <div className="absolute top-0 right-0 p-4">
          <button onClick={toggleSidebar} className="text-3xl">
            {isOpen ? '<<' : '>>'}
          </button>
        </div>
        <div className="flex flex-col text-xl items-start p-9 space-y-8 mt-20">
          <Link to="/sregister" className="hover:text-gray-900 flex items-center">
            <span className="text-xl mr-4">📝</span>
            {isOpen && <span>Notices</span>}
          </Link>
          <Link to="/tregister" className="hover:text-gray-900 flex items-center">
            <span className="text-xl mr-4">🗓️</span>
            {isOpen && <span>Timetable</span>}
          </Link>
          <div onClick={handleEventsClick} className="hover:text-gray-900 flex items-center cursor-pointer">
            <span className="text-xl mr-4">🎭</span>
            {isOpen && <span>Events</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        {showEvents && (
          <div className="grid grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event._id} className="bg-gray-800 text-white p-4 rounded shadow-lg">
                <h2 className="text-lg">{event.clubName}</h2>
                <p>{event.eventName}</p>
                <p>{event.eventDescription}</p>
                <p>{event.eventDate}</p>
                <p>{event.eventTime}</p>
                <p>{event.eventVenue}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sdashboard;
