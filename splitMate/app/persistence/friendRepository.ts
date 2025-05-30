import { database } from '../../utils/storage';
import { DBUser } from './database';
import { TFriend } from '~/types/TFriend';

export const FriendRepository = {
  async getAll(): Promise<DBUser[]> {
    const result = await database.executeSql('SELECT * FROM users ORDER BY name');
    return result.rows._array;
  },

  async getById(id: string): Promise<DBUser | null> {
    const result = await database.executeSql(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return result.rows._array[0] || null;
  },

  async create(friend: Omit<DBUser, 'id'>): Promise<string> {
    const id = Math.random().toString(36).substring(7); // Simple ID generation for MVP
    await database.executeSql(
      'INSERT INTO users (id, name, email) VALUES (?, ?, ?)',
      [id, friend.name, friend.email || null] // Convert undefined to null for SQLite
    );
    return id;
  },

  async update(friend: DBUser): Promise<void> {
    await database.executeSql(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [friend.name, friend.email || null, friend.id] // Convert undefined to null for SQLite
    );
  },

  async delete(id: string): Promise<void> {
    await database.executeSql('DELETE FROM users WHERE id = ?', [id]);
  },

  async findByEmail(email: string): Promise<DBUser | null> {
    const result = await database.executeSql(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return result.rows._array[0] || null;
  },

  async deleteAll(): Promise<void> {
    await database.executeSql('DELETE FROM users');
  }
}; 