// reminder.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReminderService } from './reminder.service';
import { ReminderSchema } from './schemas/reminder.schema';
import { ReminderController } from './reminder.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reminder', schema: ReminderSchema }]),
  ],
  providers: [ReminderService],
  controllers: [ReminderController],
  exports: [ReminderService],
})
export class ReminderModule { }