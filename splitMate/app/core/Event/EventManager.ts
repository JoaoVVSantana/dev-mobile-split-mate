import { TEvent } from '~/types/TEvent';
import { EventService } from './EventService';

export const EventManager = {
  async getAllEvents(): Promise<TEvent[]> {
    return EventService.getAll();
  },

  async getEventById(id: string): Promise<TEvent> {
    const event = await EventService.getById(id);

    if (!event.title) {
      throw new Error('Evento inválido');
    }

    return event;
  },
};
