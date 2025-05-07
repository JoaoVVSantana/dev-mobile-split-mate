import { TFriend } from "~/types/TFriend";

const mockFriends: TFriend[] = [
  { id:'1', name: "João", email: "joao@email.com", debts: [] },
  { id:'2',  name: "Ana", email: "ana@email.com", debts: [] },
  { id:'3',  name: "Leticia", email: "Leticia@email.com", debts: [] },
  { id:'4',  name: "Murilo", email: "murilo@email.com", debts: [] },
  { id:'5',  name: "Lucas", email: "lucas@email.com, ", debts: [] },
  { id:'6',  name: "Marcos", email: "marcos@email.com", debts: [] },
  { id:'7',  name: "Fernanda", email: "fernanda@email.com", debts: [] },
  { id:'8',  name: "Juliana", email: "juliana@email.com", debts: [] },
  { id:'9',  name: "Carlos", email: "carlos@email.com", debts: [] },
];

export const FriendService = {
  async getAll(): Promise<TFriend[]> {
    return mockFriends;
  },
};
