import { EventService } from './EventService';
import { EventData } from '~/types/EventData';

export const EventManager = {
  async getAllEvents(): Promise<EventData[]> {
    const events = await EventService.getAll();
    return events;
  },

  async getEventById(id: string): Promise<EventData> {
    const rawEvent = await EventService.getById(id);

    if (!rawEvent.title) {
      throw new Error('Evento inválido');
    }

    return {
      ...rawEvent,
      date: formatDate(rawEvent.date),
    };
  }
};

function formatDate(date: string) {
  return date;
}
