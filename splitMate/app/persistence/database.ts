import { database } from '../../utils/storage';

// Database models based on types (flat, for DB tables)
export interface DBUser {
  id: string;
  name: string;
  email?: string | null;
}

export interface DBEvent {
  id: string;
  title: string;
  date: string; // corresponds to TEvent.date
}

export interface DBExpense {
  id: string;
  event_id: string;
  name: string;
  value: number;
  is_payed: boolean;
  owner_id: string; // references DBUser
}

export interface DBExpenseParticipant {
  expense_id: string;
  user_id: string;
  has_paid: boolean;
}

export interface DBDebt {
  user_id: string; // who owes
  event_id: string;
  amount: number;
}

// Initialize database and create tables
export const initDatabase = async () => {
  await database.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      email TEXT
    );

    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY NOT NULL,
      event_id TEXT NOT NULL,
      name TEXT NOT NULL,
      value REAL NOT NULL,
      is_payed BOOLEAN NOT NULL DEFAULT 0,
      owner_id TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
      FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS expense_participants (
      expense_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      has_paid BOOLEAN NOT NULL DEFAULT 0,
      PRIMARY KEY (expense_id, user_id),
      FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS debts (
      user_id TEXT NOT NULL,
      event_id TEXT NOT NULL,
      amount REAL NOT NULL,
      PRIMARY KEY (user_id, event_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    );
  `);
};
