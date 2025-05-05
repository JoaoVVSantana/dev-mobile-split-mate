import { TFriend } from "~/types/TFriend";

const mockFriends: TFriend[] = [
  { name: "João", email: "joao@email.com", debts: [] },
  { name: "Ana", email: "ana@email.com", debts: [] },
  { name: "Leticia", email: "Leticia@email.com", debts: [] },
  { name: "Murilo", email: "murilo@email.com", debts: [] },
];

export const FriendService = {
  async getAll(): Promise<TFriend[]> {
    return mockFriends;
  },
};
