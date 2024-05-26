// reminder.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reminder } from './interfaces/reminder.interface';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment-timezone';
var cronParser = require('cron-parser')
import * as cron from 'node-cron'
import axios from 'axios';

const options = {
    tz: 'UTC' // Set timezone to UTC
};

@Injectable()
export class ReminderService {
    private readonly logger = new Logger(ReminderService.name);

    constructor(@InjectModel('Reminder') private readonly reminderModel: Model<Reminder>) { }

    async create(createReminderDto: CreateReminderDto): Promise<Reminder> {
        const createdReminder = new this.reminderModel(createReminderDto);
        return createdReminder.save();
    }

    async findAll(): Promise<Reminder[]> {
        return this.reminderModel.find().exec();
    }

    async findOne(id: string): Promise<Reminder> {
        return this.reminderModel.findById(id).exec();
    }

    async update(id: string, updateReminderDto: UpdateReminderDto): Promise<Reminder> {
        this.reminderModel.findByIdAndUpdate(id, updateReminderDto, { new: true }).exec();
        const reminder = await this.reminderModel.findById(id).exec();
        reminder.history.push({
            runDate: new Date(),
            response: `Updated at ${new Date().toISOString()}`,
        });

        return reminder.save();

    }

    async delete(id: string): Promise<any> {
        return this.reminderModel.findByIdAndDelete(id).exec();
    }

    /*@Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        const reminders = await this.findAll();
        const now = moment();
        reminders.forEach(async (reminder) => {
            if (now.isAfter(moment(reminder.startDate))) {
                this.logger.debug(`Sending reminder: ${reminder.name}`);
                reminder.history.push({
                    runDate: new Date(),
                    response: reminder.message,
                });
                await reminder.save();
            }
        });
    }*/

    async triggerReminder(reminder: Reminder) {
        this.logger.debug(`Sending reminder: ${reminder.name}`);
        reminder.history.push({
            runDate: new Date(),
            response: reminder.message,
        });
        await reminder.save();
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        const now = moment().tz('Asia/Kolkata'); // Consider time in IST (Indian Standard Time)
        const reminders = await this.findAll();
        reminders.forEach(async (reminder) => {
            console.log(reminder.schedule)
            console.log(new Date())
            try {
                const nextOccurrence = cronParser.parseExpression(reminder.schedule).prev().toDate(); // Get the next scheduled occurrence
                console.log(nextOccurrence)
                if (now.isSame(nextOccurrence, 'minute')) {
                    await this.triggerReminder(reminder);
                }
            } catch (error) {
                this.logger.error(`Error parsing cron expression for reminder: ${reminder.name}`, error);
            }
        });
    }

}