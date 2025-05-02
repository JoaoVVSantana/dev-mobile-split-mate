import { EventData } from '~/types/EventData';

const mockEvents: EventData[] = [
  {
    id: '1',
    title: 'Carnaval',
    date: '10/02/2025',
    expenses: [
      { name: 'Beats', value: '75,90', isPayed: false },
      { name: 'Uber', value: '43,80', isPayed: true },
    ],
  },
  {
    id: '2',
    title: 'Churrasco',
    date: '15/03/2025',
    expenses: [
      { name: 'Carvão', value: '20,00', isPayed: false },
      { name: 'Carne', value: '120,00', isPayed: false },
    ],
  },
];

export const EventService = {
  async getAll(): Promise<EventData[]> {
    return mockEvents;
  },

  async getById(id: string): Promise<EventData> {
    const event = mockEvents.find(e => e.id === id);
    if (!event) throw new Error('Evento não encontrado');
    return event;
  },
};
