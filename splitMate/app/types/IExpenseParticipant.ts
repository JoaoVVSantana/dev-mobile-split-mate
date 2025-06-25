import { TFriend } from './TFriend';

export interface IExpenseParticipant extends TFriend {
  hasPaid: boolean;
}
