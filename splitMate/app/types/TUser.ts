import { TDebt } from "./TDebt";

export interface TUser {
  id: string;
  name: string;
  email: string;
  debts: TDebt[];
} 