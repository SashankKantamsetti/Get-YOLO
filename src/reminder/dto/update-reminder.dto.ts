export class UpdateReminderDto {
    readonly name?: string;
    readonly email?: string;
    readonly message?: string;
    readonly schedule?: string;
    readonly startDate?: Date;
}