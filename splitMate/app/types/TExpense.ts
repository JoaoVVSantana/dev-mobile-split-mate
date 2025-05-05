import { IExpenseParticipant } from "./IExpenseParticipant";

export interface TExpense {
  name: string;
  value: number;
  isPayed: boolean;
  participants: IExpenseParticipant[];
}
