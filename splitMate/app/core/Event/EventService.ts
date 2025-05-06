import { TEvent } from '~/types/TEvent';
import { IExpenseParticipant } from '~/types/IExpenseParticipant';
import { useCommunityStore } from '~/store/useCommunityStore';
import { TFriend } from '~/types/TFriend';

const getParticipants = (): TFriend[] => {
  const friends = useCommunityStore.getState().friends;
  return friends.map(friend => ({ ...friend, debts: [] }));
};

export const EventService = {

  async getAll(): Promise<TEvent[]> {
    const participants: TFriend[] = getParticipants()
    const events: TEvent[] = [
      {
        id: '1',
        title: 'Carnaval',
        date: '10/02/2025',
        participants,
        expenses: [
          {
            id:'1',
            name: 'Beats',
            value: 75.90,
            isPayed: false,
            owner:{
              id:'1',
              name:'João '
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
          {
            id:'2',
            name: 'Uber',
            value: 43.80,
            isPayed: true,
            owner:{
              id:'2',
              name:'Ana '
            },
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i % 2 === 0,
            })) as IExpenseParticipant[],
          },
        ],
      },
      {
        id: '2',
        title: 'Churrasco',
        date: '15/03/2025',
        participants,
        expenses: [
          {
            id:'3',
            name: 'Carvão',
            value: 20.00,
            isPayed: false,
            owner:{
              id:'2',
              name:'Ana '
            },
            participants: participants.map(p => ({
              ...p,
              hasPaid: false,
            })) as IExpenseParticipant[],
          },
          {
            id:'3',
            name: 'Carne',
            value: 120.00,
            owner:{
              id:'4',
              name:'Murilo'
            },
            isPayed: participants.every((_, i) => i !== 2),
            participants: participants.map((p, i) => ({
              ...p,
              hasPaid: i !== 2,
            })) as IExpenseParticipant[],
          },
        ],
      },
    ];

    return events;
  },

  async getById(id: string): Promise<TEvent> {
    const all = await this.getAll();
    const found = all.find(e => e.id === id);
    if (!found) throw new Error('Evento não encontrado');
    return found;
  },
};
