import axios from 'axios';
import { COMMON_REQ_CONFIG, URL_DICTIONARY } from '../../constants/api-endpoints';
import { TEvent } from '../../types/TEvent';
import { createAxiosConfig } from '../../utils/api-helpers';

export const getEvents = async () => {
  const config = createAxiosConfig('GET_EVENTS');
  const { data } = await axios.get<TEvent[]>(config.url!, config);
  return data;
};

export const getEventById = async (id: string) => {
  const config = createAxiosConfig('GET_EVENT_BY_ID', 'DEFAULT', { id });
  const { data } = await axios.get<TEvent>(config.url!, config);
  return data;
};

export const createEvent = async (event: Omit<TEvent, 'id'>) => {
  const config = createAxiosConfig('POST_EVENT');
  const { data } = await axios.post<TEvent>(config.url!, event, config);
  return data;
};

export const updateEvent = async (id: string, event: TEvent) => {
  const config = createAxiosConfig('PUT_EVENT', 'DEFAULT', { id });
  const { data } = await axios.put<TEvent>(config.url!, event, config);
  return data;
};

export const deleteEvent = async (id: string) => {
  const config = createAxiosConfig('DELETE_EVENT', 'DEFAULT', { id });
  await axios.delete(config.url!, config);
};

export const addEventParticipant = async (eventId: string, friendId: string) => {
  const config = createAxiosConfig('POST_EVENT_PARTICIPANT', 'DEFAULT', { eventId, friendId });
  await axios.post(config.url!, {}, config);
};

export const removeEventParticipant = async (eventId: string, friendId: string) => {
  const config = createAxiosConfig('DELETE_EVENT_PARTICIPANT', 'DEFAULT', { eventId, friendId });
  await axios.delete(config.url!, config);
}; 