import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TTimetable = () => {
    const [timetableData, setTimetableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        class: '',
        division: '',
        batch: '',
        subject: '',
        teacherId: '',
        teacherName: '',
        roomNumber: '',
        day: '',
        startTime: '',
        endTime: '',
        classCancelledByTeacher: false,
    });

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const response = await axios.get('http://localhost:3000/timetable');
                // Sort data by class, division, and startTime
                const sortedData = response.data.sort((a, b) => {
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

        fetchTimetable();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/timetable', formData);
            alert(response.data.message);
            setFormData({
                class: '',
                division: '',
                batch: '',
                subject: '',
                teacherId: '',
                teacherName: '',
                roomNumber: '',
                day: '',
                startTime: '',
                endTime: '',
                classCancelledByTeacher: false,
            });
        } catch (error) {
            const errorMessage = error.response?.data?.error || "An error occurred";
            alert(errorMessage);
        }
    };

    if (loading) return <div className="text-center text-xl font-semibold">Loading...</div>;
    if (error) return <div className="text-red-500 text-center text-lg">{error}</div>;

    return (
        <div className="container mx-auto p-8">
              

            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Timetable</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-100 rounded-lg shadow-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-300 text-gray-700">
                            {['Class', 'Division', 'Batch', 'Subject', 'Teacher ID', 'Teacher Name', 'Room Number', 'Day', 'Start Time', 'End Time', 'Cancelled'].map((heading) => (
                                <th key={heading} className="p-4 text-left text-sm font-semibold">{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timetableData.map((entry) => (
                            <tr key={entry._id} className="hover:bg-gray-200 transition-all">
                                <td className="p-4 border-b border-gray-300">{entry.class}</td>
                                <td className="p-4 border-b border-gray-300">{entry.division}</td>
                                <td className="p-4 border-b border-gray-300">{entry.batch}</td>
                                <td className="p-4 border-b border-gray-300">{entry.subject}</td>
                                <td className="p-4 border-b border-gray-300">{entry.teacherId}</td>
                                <td className="p-4 border-b border-gray-300">{entry.teacherName}</td>
                                <td className="p-4 border-b border-gray-300">{entry.roomNumber}</td>
                                <td className="p-4 border-b border-gray-300">{entry.day}</td>
                                <td className="p-4 border-b border-gray-300">{entry.startTime}</td>
                                <td className="p-4 border-b border-gray-300">{entry.endTime}</td>
                                <td className="p-4 border-b border-gray-300 text-center">
                                    <button
                                        className={`py-2 px-4 rounded-lg text-white ${entry.classCancelledByTeacher ? 'bg-red-500' : 'bg-green-500'}`}
                                    >
                                        {entry.classCancelledByTeacher ? 'Yes' : 'No'}
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
