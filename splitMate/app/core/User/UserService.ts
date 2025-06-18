import { TUser } from '~/types/TUser';
import axios from 'axios';
import { createAxiosConfig } from '../../utils/api-helpers';

export const UserService = {
  async getAll(): Promise<TUser[]> {
    const config = createAxiosConfig('GET_USERS');
    const { data } = await axios.get<TUser[]>(config.url!, config);
    return data;
  },

  async getById(id: string): Promise<TUser> {
    const config = createAxiosConfig('GET_USER_BY_ID', 'DEFAULT', { id });
    const { data } = await axios.get<TUser>(config.url!, config);
    if (!data) throw new Error('Usuário não encontrado');
    return data;
  },

  async create(user: Omit<TUser, 'id'>): Promise<TUser> {
    const config = createAxiosConfig('POST_USER');
    const { data } = await axios.post<TUser>(config.url!, user, config);
    return data;
  },

  async update(id: string, user: TUser): Promise<TUser> {
    const config = createAxiosConfig('PUT_USER', 'DEFAULT', { id });
    const { data } = await axios.put<TUser>(config.url!, user, config);
    return data;
  },

  async delete(id: string): Promise<void> {
    const config = createAxiosConfig('DELETE_USER', 'DEFAULT', { id });
    await axios.delete(config.url!, config);
  }
}; 