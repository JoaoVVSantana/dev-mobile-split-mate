import { openDatabase, type SQLiteDatabase } from 'expo-sqlite';

export const getDBConnection = (): SQLite.SQLiteDatabase => {
  return SQLite.openDatabase('splitmate.db');
};

export const createTables = () => {
  const db = getDBConnection();

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        created_at TEXT NOT NULL
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS expenses (
        id TEXT PRIMARY KEY NOT NULL,
        event_id TEXT NOT NULL,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        payer_id TEXT NOT NULL,
        FOREIGN KEY (event_id) REFERENCES events(id),
        FOREIGN KEY (payer_id) REFERENCES users(id)
      );`
    );
  });
};
