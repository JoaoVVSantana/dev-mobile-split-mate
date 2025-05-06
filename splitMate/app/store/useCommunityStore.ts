import { create } from 'zustand';
import { TFriend } from '~/types/TFriend';
import { TEvent } from '~/types/TEvent';
import { TDebt } from '~/types/TDebt';
import { FriendService } from '~/core/Friend/FriendService';

interface CommunityStore {
  friends: TFriend[];
  user: TFriend | null;
  addFriend: (friend: TFriend) => void;
  removeFriend: (name: string) => void;
  setUser: (friend: TFriend) => void;
  updateDebtsFromEvent: (event: TEvent) => void;
  loadFriends: () => Promise<void>;
}

export const useCommunityStore = create<CommunityStore>((set, get) => ({
  friends: [],
  user: null,

  addFriend: (friend) => {
    set((state) => ({
      friends: [...state.friends, { ...friend, debts: [] }],
    }));
  },

  setUser: (user) => {
    set((state) => ({
      user: { ...user, debts: [] },
      friends: [...state.friends, { ...user, debts: [] }],
    }));
  },

  removeFriend: (name) => {
    set((state) => ({
      friends: state.friends.filter((f) => f.name !== name),
    }));
  },

  updateDebtsFromEvent: (event: TEvent) => {
    const updatedFriends = get().friends.map((friend) => {
      const isParticipant = event.participants.some((p) => p.name === friend.name);
      if (!isParticipant) return friend;

      let amountOwed = 0;

      for (const expense of event.expenses) {
        const involved = expense.participants.find((p) => p.name === friend.name);
        if (involved) {
          amountOwed += expense.value / expense.participants.length;
        }
      }

      const updatedDebts: TDebt[] = [
        ...(friend.debts ?? []).filter((d) => d.event.id !== event.id),
        { event, amount: amountOwed },
      ];

      return { ...friend, debts: updatedDebts };
    });

    set({ friends: updatedFriends });
  },

  loadFriends: async () => {
    const friendsFromService = await FriendService.getAll();
    set({ friends: friendsFromService });
  },
}));
