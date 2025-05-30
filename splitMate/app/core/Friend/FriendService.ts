import { TFriend } from "~/types/TFriend";
import { FriendRepository } from "~/persistence/friendRepository";
import { DBUser } from "~/persistence/database";

// Convert DB model to domain model
const toFriend = (user: DBUser): TFriend => ({
  id: user.id,
  name: user.name,
  email: user.email || undefined,
  debts: [] // Debts will be loaded separately when needed
});

export const FriendService = {
  async getAll(): Promise<TFriend[]> {
    const users = await FriendRepository.getAll();
    return users.map(toFriend);
  },

  async getById(id: string): Promise<TFriend | null> {
    const user = await FriendRepository.getById(id);
    return user ? toFriend(user) : null;
  },

  async create(friend: Omit<TFriend, 'id' | 'debts'>): Promise<TFriend> {
    const id = await FriendRepository.create(friend);
    return {
      id,
      ...friend,
      debts: []
    };
  },

  async update(friend: TFriend): Promise<void> {
    await FriendRepository.update({
      id: friend.id,
      name: friend.name,
      email: friend.email
    });
  },

  async delete(id: string): Promise<void> {
    await FriendRepository.delete(id);
  },

  async findByEmail(email: string): Promise<TFriend | null> {
    const user = await FriendRepository.findByEmail(email);
    return user ? toFriend(user) : null;
  }
};
