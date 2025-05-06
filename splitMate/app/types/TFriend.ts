import { TDebt } from "./TDebt";

export interface TFriend {
  id: string;
  name: string;
  email?: string;
  debts?: TDebt[];
}
