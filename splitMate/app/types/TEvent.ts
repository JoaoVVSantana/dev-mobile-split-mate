import { TExpense } from "./TExpense";
import { TFriend } from "./TFriend";

export interface TEvent {
    id: string;
    title: string;
    date: string;
    expenses: TExpense[];
    participants: TFriend[];
  }
  