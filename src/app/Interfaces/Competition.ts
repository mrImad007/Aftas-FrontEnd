import { Time } from "@angular/common";

export interface Competition {
  code: string;
  date: Date;
  startTime: string; // Assuming you handle time in a string format like "HH:mm:ss"
  endTime: string;   // Assuming you handle time in a string format like "HH:mm:ss"
  numberOfParticipants: number;
  location: string;
  amount: number;
}