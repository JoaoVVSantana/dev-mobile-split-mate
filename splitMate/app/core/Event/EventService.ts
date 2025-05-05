import { TEvent } from '~/types/TEvent';
import { TParticipant } from '~/types/TParticipant';

const participants: TParticipant[] = [
  { name: 'João' },
  { name: 'Maria' },
  { name: 'Pedro' },
];

const mockEvents: TEvent[] = [
  {
    id: '1',
    title: 'Carnaval',
    date: '10/02/2025',
    participants,
    expenses: [
      { name: 'Beats', value: 75.90, isPayed: false, participants },
      { name: 'Uber', value: 43.80, isPayed: true, participants },
    ],
  },
  {
    id: '2',
    title: 'Churrasco',
    date: '15/03/2025',
    participants,
    expenses: [
      { name: 'Carvão', value: 20.00, isPayed: false, participants },
      { name: 'Carne', value: 120.00, isPayed: false, participants },
    ],
  },
];

export const EventService = {
  async getAll(): Promise<TEvent[]> {
    return mockEvents;
  },

  async getById(id: string): Promise<TEvent> {
    const event = mockEvents.find(e => e.id === id);
    if (!event) throw new Error('Evento não encontrado');
    return event;
  },
};
