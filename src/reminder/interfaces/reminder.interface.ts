import { Document } from 'mongoose';

export interface Reminder extends Document {
    id?: string;
    name: string;
    email: string;
    message: string;
    schedule: string;
    startDate: Date;
    history: {
        runDate: Date;
        response: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

