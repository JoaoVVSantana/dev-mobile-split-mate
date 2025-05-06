import { IExpenseParticipant } from "./IExpenseParticipant";
import { TFriend } from "./TFriend";

export interface TExpense {
  id: string;
  name: string;
  value: number;
  isPayed: boolean;
  participants: IExpenseParticipant[];
  owner: TFriend;
}
