import { TFriend } from "~/types/TFriend";

export const FriendManager = {
  normalizeFriend(friend: TFriend): TFriend {
    return {
      ...friend,
      debts: friend.debts ?? [],
    };
  },

  normalizeAll(friends: TFriend[]): TFriend[] {
    return friends.map(FriendManager.normalizeFriend);
  },
};
