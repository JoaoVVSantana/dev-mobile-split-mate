import { TParticipant } from "./TParticipant";

export interface TExpense {
    name: string;
    value: number;
    isPayed: boolean;
    participants: TParticipant[];
  }
  