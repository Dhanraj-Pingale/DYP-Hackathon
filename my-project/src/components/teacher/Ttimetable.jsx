import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TTimetable = ({ loggedInTeacherId }) => {
    const [timetableData, setTimetableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [swapTeacherId, setSwapTeacherId] = useState('');

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const response = await axios.get('http://localhost:3000/timetable');
                const filteredData = response.data.filter(entry => entry.teacherId === loggedInTeacherId);
                const sortedData = filteredData.sort((a, b) => {
                    if (a.class !== b.class) return a.class.localeCompare(b.class);
                    if (a.division !== b.division) return a.division.localeCompare(b.division);
                    return a.startTime.localeCompare(b.startTime);
                });
                setTimetableData(sortedData);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.error || "An error occurred while fetching the timetable.");
                setLoading(false);
            }
        };

        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/teachers');
                console.log("Fetched Teachers:", response.data);
                setTeachers(response.data);
            } catch (err) {
                console.error('Error fetching teachers:', err);
                setError(err.response?.data?.error || "An error occurred while fetching teachers.");
            }
        };

        fetchTimetable();
        fetchTeachers();
    }, [loggedInTeacherId]);

    const handleCancelClass = async (entryId) => {
        try {
            await axios.patch(`http://localhost:3000/timetable/${entryId}/cancel`);
            setTimetableData(prevData => prevData.map(entry =>
                entry._id === entryId ? { ...entry, classCancelledByTeacher: true } : entry
            ));
            alert("Class cancelled successfully.");
        } catch (error) {
            const errorMessage = error.response?.data?.error || "An error occurred while cancelling the class.";
            alert(errorMessage);
        }
    };

    const handleSwapClass = async (entryId) => {
        const previousTimetableData = [...timetableData]; // Make a copy for rollback

        // Optimistically update the timetable data
        setTimetableData(prevData => prevData.map(entry =>
            entry._id === entryId ? { ...entry, teacherId: swapTeacherId } : entry
        ));
        
        try {
            await axios.patch(`http://localhost:3000/timetable/${entryId}/swap`, { newTeacherId: swapTeacherId });
            alert("Class swapped successfully.");
            setSwapTeacherId(''); // Clear the input after swapping
        } catch (error) {
            // Rollback on error
            setTimetableData(previousTimetableData);
            const errorMessage = error.response?.data?.error || "An error occurred while swapping the class.";
            alert(errorMessage);
        }
    };

    if (loading) return <div className="text-center text-xl font-semibold">Loading...</div>;
    if (error) return <div className="text-red-500 text-center text-lg">{error}</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6 text-center">Your Timetable</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-100 rounded-lg shadow-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-300 text-gray-700">
                            {['Class', 'Division', 'Batch', 'Subject', 'Teacher Name', 'Room Number', 'Day', 'Start Time', 'End Time', 'Cancelled', 'Actions'].map((heading) => (
                                <th key={heading} className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold">{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timetableData.map((entry) => (
                            <tr key={entry._id} className="hover:bg-gray-200 transition-all">
                                <td className="p-2 md:p-4 border-b border-gray-300 text-xs md:text-sm">{entry.class}</td>
                                <td className="p-2 md:p-4 border-b border-gray-300 text-xs md:text-sm">{entry.division}</td>
                                <td className="p-2 md:p-4 border-b border-gray-300 text-xs md:text-sm">{entry.batch}</td>
                                <td className="p-2 md:p-4 border-b border-gray-300 text-xs md:text-sm">{entry.subject}</td>
                                <td className="p-2 md:p-4 border-b border-gray-300 text-xs md:text-sm">{entry.teacherName}</td>
                                <td className="p-2 md:p-4 border-b border-gray-300 text-xs md:text-sm">{entry.roomNumber}</td>
                                <td className="p-2 md:p-4 border-b border-gray-300 text-xs md:text-sm">{entry.day}</td>
                                <td className="p-2 md:p-4 border-b border-gray-300 text-xs md:text-sm">{entry.startTime}</td>
                                <td className="p-2 md:p-4 border-b border-gray-300 text-xs md:text-sm">{entry.endTime}</td>
                                <td className="p-2 md:p-4 border-b border-gray-300 text-xs md:text-sm text-center">
                                    <button
                                        className={`py-1 px-2 rounded-lg text-white ${entry.classCancelledByTeacher ? 'bg-red-500' : 'bg-green-500'}`}
                                    >
                                        {entry.classCancelledByTeacher ? 'Yes' : 'No'}
                                    </button>
                                </td>
                                <td className="p-2 md:p-4 border-b border-gray-300 text-xs md:text-sm flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                                    <button 
                                        onClick={() => handleCancelClass(entry._id)} 
                                        className="py-2 px-4 bg-red-500 text-white rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <select
                                        value={swapTeacherId}
                                        onChange={(e) => setSwapTeacherId(e.target.value)}
                                        className="p-2 border border-gray-300 rounded-lg text-xs md:text-sm"
                                    >
                                        <option value="">Select Teacher</option>
                                        {teachers.map((teacher) => (
                                            <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                                        ))}
                                    </select>
                                    <button 
                                        onClick={() => handleSwapClass(entry._id)} 
                                        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
                                    >
                                        Swap
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TTimetable;
