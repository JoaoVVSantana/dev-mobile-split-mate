import { TEvent } from '~/types/TEvent';
import { EventRepository } from '~/persistence/eventRepository';
import { FriendService } from '../Friend/FriendService';
import { DBEvent } from '~/persistence/database';

// Convert DB model to domain model
const toEvent = async (event: DBEvent): Promise<TEvent> => {
  // Get participants
  const participantIds = await EventRepository.getParticipants(event.id);
  const participants = await Promise.all(
    participantIds.map(id => FriendService.getById(id))
  );

  return {
    id: event.id,
    title: event.title,
    date: event.date,
    expenses: [], // Expenses will be loaded separately when needed
    participants: participants.filter((p): p is NonNullable<typeof p> => p !== null)
  };
};

export const EventService = {
  async getAll(): Promise<TEvent[]> {
    const events = await EventRepository.getAll();
    return Promise.all(events.map(toEvent));
  },

  async getById(id: string): Promise<TEvent> {
    const event = await EventRepository.getById(id);
    if (!event) {
      throw new Error('Event not found');
    }
    return toEvent(event);
  },

  async create(event: Omit<TEvent, 'id' | 'expenses' | 'participants'>): Promise<TEvent> {
    const id = await EventRepository.create(event);
    return {
      id,
      ...event,
      expenses: [],
      participants: []
    };
  },

  async update(event: TEvent): Promise<void> {
    await EventRepository.update({
      id: event.id,
      title: event.title,
      date: event.date
    });
  },

  async delete(id: string): Promise<void> {
    await EventRepository.delete(id);
  }
};
