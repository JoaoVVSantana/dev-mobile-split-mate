import { TFriend } from "~/types/TFriend";

export const FriendManager = {
  normalizeFriend(friend: TFriend): TFriend {
    return {
      ...friend,
      debts: Array.isArray(friend.debts) ? friend.debts : [],
    };
  },

  normalizeAll(friends: TFriend[]): TFriend[] {
    return friends.map(this.normalizeFriend);
  },

  sortByName(friends: TFriend[]): TFriend[] {
    return [...friends].sort((a, b) =>
      a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" })
    );
  },

  findByEmail(friends: TFriend[], email: string): TFriend | undefined {
    return friends.find(friend => friend.email === email);
  },
};
