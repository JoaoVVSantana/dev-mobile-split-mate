import { TFriend } from "~/types/TFriend";
import axiosInstance from '../../config/axios';
import { createAxiosConfig } from '../../utils/api-helpers';

export const FriendService = {
  async getAll(): Promise<TFriend[]> {
    try {
      const config = createAxiosConfig('GET_FRIENDS');
      const { data } = await axiosInstance.get<TFriend[]>(config.url!);
      return data;
    } catch (error) {
      console.error('Error fetching friends:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<TFriend> {
    const config = createAxiosConfig('GET_FRIEND_BY_ID', 'DEFAULT', { id });
    const { data } = await axiosInstance.get<TFriend>(config.url!);
    return data;
  },

  async create(friend: Omit<TFriend, 'id'>): Promise<TFriend> {
    const config = createAxiosConfig('POST_FRIEND');
    const { data } = await axiosInstance.post<TFriend>(config.url!, friend);
    return data;
  },

  async update(id: string, friend: TFriend): Promise<TFriend> {
    const config = createAxiosConfig('PUT_FRIEND', 'DEFAULT', { id });
    const { data } = await axiosInstance.put<TFriend>(config.url!, friend);
    return data;
  },

  async delete(id: string): Promise<void> {
    const config = createAxiosConfig('DELETE_FRIEND', 'DEFAULT', { id });
    await axiosInstance.delete(config.url!);
  }
};
