import { ExpenseData } from "./ExpensesData";

export interface EventData {
    id: string;
    title: string;
    date: string;
    expenses: ExpenseData[];
  }
  