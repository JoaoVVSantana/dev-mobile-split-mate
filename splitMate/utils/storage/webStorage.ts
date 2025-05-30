import { openDB, type IDBPDatabase } from 'idb';

interface DatabaseSchema {
  expenses: {
    key: number;
    value: any;
  };
  // Add other tables as needed
}

class WebStorage {
  private db: IDBPDatabase<DatabaseSchema> | null = null;
  private dbName = 'splitMateDB';
  private version = 1;

  async init() {
    if (this.db) return;

    this.db = await openDB<DatabaseSchema>(this.dbName, this.version, {
      upgrade(db) {
        // Create tables/stores
        if (!db.objectStoreNames.contains('expenses')) {
          db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
        }
        // Add other stores as needed
      },
    });
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    // Simple SQL parsing for basic operations
    if (sql.toLowerCase().startsWith('select')) {
      return this.handleSelect(sql);
    } else if (sql.toLowerCase().startsWith('insert')) {
      return this.handleInsert(sql, params);
    } else if (sql.toLowerCase().startsWith('update')) {
      return this.handleUpdate(sql, params);
    } else if (sql.toLowerCase().startsWith('delete')) {
      return this.handleDelete(sql);
    }
    
    throw new Error('Unsupported operation');
  }

  private async handleSelect(sql: string) {
    if (!this.db) throw new Error('Database not initialized');
    // Basic implementation - you can expand this based on your needs
    const store = sql.toLowerCase().includes('from expenses') ? 'expenses' : null;
    if (!store) throw new Error('Table not found');
    
    return await this.db.getAll(store);
  }

  private async handleInsert(sql: string, params: any[]) {
    if (!this.db) throw new Error('Database not initialized');
    const store = sql.toLowerCase().includes('into expenses') ? 'expenses' : null;
    if (!store) throw new Error('Table not found');

    const data = params[0] || {};
    await this.db.add(store, data);
    return { insertId: await this.db.count(store) };
  }

  private async handleUpdate(sql: string, params: any[]) {
    if (!this.db) throw new Error('Database not initialized');
    const store = sql.toLowerCase().includes('expenses') ? 'expenses' : null;
    if (!store) throw new Error('Table not found');

    const data = params[0] || {};
    await this.db.put(store, data);
    return { rowsAffected: 1 };
  }

  private async handleDelete(sql: string) {
    if (!this.db) throw new Error('Database not initialized');
    const store = sql.toLowerCase().includes('from expenses') ? 'expenses' : null;
    if (!store) throw new Error('Table not found');

    const key = parseInt(sql.match(/where\s+id\s*=\s*(\d+)/i)?.[1] || '0');
    if (key) {
      await this.db.delete(store, key);
      return { rowsAffected: 1 };
    }
    return { rowsAffected: 0 };
  }
}

export const webStorage = new WebStorage(); 