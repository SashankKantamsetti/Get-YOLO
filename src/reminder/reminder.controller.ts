import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder } from './interfaces/reminder.interface';

@Controller('reminder')
export class ReminderController {
    constructor(private readonly reminderService: ReminderService) { }

    @Post()
    async create(@Body() createReminderDto: CreateReminderDto): Promise<Reminder> {
        return this.reminderService.create(createReminderDto);
    }

    @Get()
    async findAll(): Promise<Reminder[]> {
        return this.reminderService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Reminder> {
        return this.reminderService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateReminderDto: UpdateReminderDto): Promise<Reminder> {
        return this.reminderService.update(id, updateReminderDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any> {
        return this.reminderService.delete(id);
    }
}
