import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { ReminderModule } from './reminder/reminder.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Sashank:TovH1z4y7fVtJMV1@weather.i9eog8d.mongodb.net/GetYolo?retryWrites=true&w=majority&appName=Weather'),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    ReminderModule,
  ],
  providers: [AppService],
  controllers: [AppController],
  exports: [AppService],
})
export class AppModule { }
