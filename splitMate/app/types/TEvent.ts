import { TExpense } from "./TExpense";
import { TParticipant } from "./TParticipant";

export interface TEvent {
    id: string;
    title: string;
    date: string;
    expenses: TExpense[];
    participants: TParticipant[];
  }
  