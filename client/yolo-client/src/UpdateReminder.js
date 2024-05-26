import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateReminder() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [schedule, setSchedule] = useState('');
    const [startDate, setStartDate] = useState('');

    useEffect(() => {
        fetchReminder();
    }, []);

    const fetchReminder = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/reminder/${id}`);
            const { name, email, message, schedule, startDate } = response.data;
            setName(name);
            setEmail(email);
            setSchedule(schedule);
            setMessage(message);
            setStartDate(new Date(startDate).toISOString().slice(0, 16));
        } catch (error) {
            console.error('Error fetching reminder:', error);
        }
    };

    const updateReminder = async () => {
        try {
            await axios.put(`http://localhost:5000/reminder/${id}`, {
                name,
                email,
                message,
                schedule,
                startDate,
            });
            // Redirect to home page after updating
            window.location.href = '/';
        } catch (error) {
            console.error('Error updating reminder:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Update Reminder</h1>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Message</label>
                <input
                    type="text"
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Schedule</label>
                <input
                    type="text"
                    className="form-control"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={updateReminder}>
                Update Reminder
            </button>
            {/* Link to home page */}
            <Link to="/" className="btn btn-secondary ms-2">Cancel</Link>
        </div>
    );
}

export default UpdateReminder;
