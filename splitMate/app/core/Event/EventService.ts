import { TEvent } from '~/types/TEvent';
import axios from 'axios';
import { createAxiosConfig } from '../../utils/api-helpers';

export const EventService = {
  async getAll(): Promise<TEvent[]> {
    const config = createAxiosConfig('GET_EVENTS');
    const { data } = await axios.get<TEvent[]>(config.url!, config);
    return data;
  },

  async getById(id: string): Promise<TEvent> {
    const config = createAxiosConfig('GET_EVENT_BY_ID', 'DEFAULT', { id });
    const { data } = await axios.get<TEvent>(config.url!, config);
    if (!data) throw new Error('Evento não encontrado');
    return data;
  },

  async create(event: Omit<TEvent, 'id'>): Promise<TEvent> {
    const config = createAxiosConfig('POST_EVENT');
    const { data } = await axios.post<TEvent>(config.url!, event, config);
    return data;
  },

  async update(id: string, event: TEvent): Promise<TEvent> {
    const config = createAxiosConfig('PUT_EVENT', 'DEFAULT', { id });
    const { data } = await axios.put<TEvent>(config.url!, event, config);
    return data;
  },

  async delete(id: string): Promise<void> {
    const config = createAxiosConfig('DELETE_EVENT', 'DEFAULT', { id });
    await axios.delete(config.url!, config);
  },

  async addParticipant(eventId: string, friendId: string): Promise<void> {
    const config = createAxiosConfig('POST_EVENT_PARTICIPANT', 'DEFAULT', { eventId, friendId });
    await axios.post(config.url!, {}, config);
  },

  async removeParticipant(eventId: string, friendId: string): Promise<void> {
    const config = createAxiosConfig('DELETE_EVENT_PARTICIPANT', 'DEFAULT', { eventId, friendId });
    await axios.delete(config.url!, config);
  }
};
