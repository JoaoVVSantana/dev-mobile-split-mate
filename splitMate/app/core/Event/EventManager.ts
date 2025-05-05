import { EventService } from './EventService';
import { TEvent } from '~/types/TEvent';

export const EventManager = {
  async getAllEvents(): Promise<TEvent[]> {
    const events = await EventService.getAll();
    return events;
  },

  async getEventById(id: string): Promise<TEvent> {
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
