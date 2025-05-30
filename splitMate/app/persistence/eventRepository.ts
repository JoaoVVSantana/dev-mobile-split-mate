import { database } from '../../utils/storage';
import { DBEvent } from './database';

export const createEvent = async (event: DBEvent): Promise<void> => {
  await database.executeSql(
    'INSERT INTO events (id, title, date) VALUES (?, ?, ?)',
    [event.id, event.title, event.date]
  );
};

export const getEvents = async (): Promise<DBEvent[]> => {
  const result = await database.executeSql('SELECT * FROM events ORDER BY date DESC');
  return result.rows._array;
};

export const getEventById = async (id: string): Promise<DBEvent | null> => {
  const result = await database.executeSql(
    'SELECT * FROM events WHERE id = ?',
    [id]
  );
  return result.rows._array[0] || null;
};

export const updateEvent = async (event: DBEvent): Promise<void> => {
  await database.executeSql(
    'UPDATE events SET title = ?, date = ? WHERE id = ?',
    [event.title, event.date, event.id]
  );
};

export const deleteEvent = async (id: string): Promise<void> => {
  await database.executeSql('DELETE FROM events WHERE id = ?', [id]);
};

export const deleteAllEvents = async (): Promise<void> => {
  await database.executeSql('DELETE FROM events');
};

// Get all participants for an event
export const getParticipants = async (eventId: string): Promise<string[]> => {
  const result = await database.executeSql(
    `SELECT DISTINCT u.id as user_id 
     FROM users u
     INNER JOIN expense_participants ep ON ep.user_id = u.id
     INNER JOIN expenses e ON e.id = ep.expense_id
     WHERE e.event_id = ?`,
    [eventId]
  );
  return result.rows._array.map((r: { user_id: string }) => r.user_id);
}; 