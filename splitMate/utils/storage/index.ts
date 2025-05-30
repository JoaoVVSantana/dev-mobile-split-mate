import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { webStorage } from './webStorage';

interface SQLTransaction {
  executeSql: (
    sql: string,
    params: any[],
    success: (transaction: SQLTransaction, resultSet: any) => void,
    error: (transaction: SQLTransaction, error: Error) => boolean
  ) => void;
}

interface DatabaseError extends Error {
  code?: number;
}

class Database {
  private db: any = null;

  constructor() {
    if (Platform.OS === 'web') {
      this.db = webStorage;
    } else {
      this.db = SQLite.openDatabaseSync('splitmate.db');
    }
  }

  async transaction(callback: (tx: SQLTransaction) => void): Promise<void> {
    if (Platform.OS === 'web') {
      // Web platform - using our custom implementation
      await callback(this.db);
    } else {
      // Mobile platforms - using SQLite
      return new Promise((resolve, reject) => {
        this.db?.transaction(
          (tx: SQLTransaction) => {
            callback(tx);
            resolve();
          },
          (error: DatabaseError) => {
            reject(error);
          }
        );
      });
    }
  }

  async executeSql(sql: string, params: any[] = []): Promise<any> {
    if (Platform.OS === 'web') {
      // Web platform - using our custom implementation
      return await (this.db as typeof webStorage).query(sql, params);
    } else {
      // Mobile platforms - using SQLite
      return new Promise((resolve, reject) => {
        this.db?.transaction(
          (tx: SQLTransaction) => {
            tx.executeSql(
              sql,
              params,
              (_: SQLTransaction, result: any) => resolve(result),
              (_: SQLTransaction, error: DatabaseError) => {
                reject(error);
                return false;
              }
            );
          },
          (error: DatabaseError) => reject(error)
        );
      });
    }
  }
}

export const database = new Database(); 