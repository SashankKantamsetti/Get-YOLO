import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [reminders, setReminders] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [schedule, setSchedule] = useState('');
    const [startDate, setStartDate] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/reminder');
            setReminders(response.data);
        } catch (error) {
            console.error('Error fetching reminders:', error);
        }
    };

    const createReminder = async () => {
        try {
            await axios.post('http://localhost:5000/reminder', {
                name,
                email,
                message,
                schedule,
                startDate,
            });
            fetchReminders();
        } catch (error) {
            console.error('Error creating reminder:', error);
        }
    };

    const deleteReminder = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/reminder/${id}`);
            fetchReminders();
        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    };

    const handleViewHistory = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/reminder/${id}`);
            setHistory(response.data.history)
        } catch (error) {
            console.error('Error fetching history: ', error)
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h1>Reminders</h1>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Create Reminder</h5>
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
                                <button className="btn btn-primary" onClick={createReminder}>
                                    Create Reminder
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h2>Existing Reminders</h2>
                        {reminders.map((reminder) => (
                            <div key={reminder._id} className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{reminder.name}</h5>
                                    <p className="card-text">Email: {reminder.email}</p>
                                    <p className="card-text">Message: {reminder.message}</p>
                                    <p className="card-text">Start Date: {new Date(reminder.startDate).toLocaleString()}</p>
                                    <Link to={`/reminder/${reminder._id}`} className="btn btn-primary me-2">
                                        Update
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => deleteReminder(reminder._id)}>
                                        Delete
                                    </button>
                                    <button className="btn btn-secondary ms-2" onClick={() => handleViewHistory(reminder._id)}>
                                        View History
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <h2>Reminder History</h2>
                <div className="history-container">
                    {history.map((entry, index) => {
                        console.log(entry)
                        console.log(index)
                        return (
                            <div key={index} className="history-item card mb-3">
                                <div className="card-body">
                                    <p><strong>Run Date:</strong> {new Date(entry.runDate).toLocaleString()}</p>
                                    <p><strong>Message:</strong> {entry.response}</p>
                                </div>
                            </div>
                        )
                    })}
                    {history.length > 0 &&
                        (<button className="btn btn-secondary ms-2" onClick={() => setHistory([])}>
                            Close
                        </button>)}
                </div>
            </div>
        </>
    );
}

export default Home;
