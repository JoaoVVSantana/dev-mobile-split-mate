import { TDebt } from "./TDebt";

export interface TFriend {
  name: string;
  email?: string;
  debts?: TDebt[];
}
