import { Schema } from 'mongoose';

export const ReminderSchema = new Schema({
    name: String,
    email: String,
    message: String,
    schedule: String, // Cron expression
    startDate: Date,
    history: [
        {
            runDate: Date,
            response: String,
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
});
