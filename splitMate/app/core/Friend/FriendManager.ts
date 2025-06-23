import { TFriend } from '~/types/TFriend';
import { FriendService, TFriendInput } from '~/core/Friend/FriendService';

class FriendManager {
  private static normalize(friend: TFriend): TFriend {
    return { ...friend, debts: Array.isArray(friend.debts) ? friend.debts : [] };
  }

  static async getAllFriends(): Promise<TFriend[]> {
    const raw = await FriendService.getAll();
    return this.sortByName(raw.map(this.normalize));
  }

  static async createFriend(data: TFriendInput): Promise<TFriend> {
    const created = await FriendService.createFriend(data);
    return this.normalize(created);
  }

  static sortByName(friends: TFriend[]): TFriend[] {
    return [...friends].sort((a, b) =>
      a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }),
    );
  }

  static findByEmail(friends: TFriend[], email: string): TFriend | undefined {
    return friends.find((f) => f.email === email);
  }
}

export default FriendManager;
