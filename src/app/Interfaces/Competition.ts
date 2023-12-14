import { Time } from "@angular/common";

export interface Competition{
    code: string,
    date: Date,
    startTime: Time,
    endTime: Time,
    NumebrOfParticipants: number,
    location: String,
    amount: number
}