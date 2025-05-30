import { database } from '../../utils/storage';
import { DBExpense, DBExpenseParticipant } from './database';

export const createExpense = async (expense: DBExpense, participants: string[]): Promise<void> => {
  await database.transaction(async (tx) => {
    // Insert expense
    tx.executeSql(
      'INSERT INTO expenses (id, event_id, name, value, is_payed, owner_id) VALUES (?, ?, ?, ?, ?, ?)',
      [expense.id, expense.event_id, expense.name, expense.value, expense.is_payed ? 1 : 0, expense.owner_id],
      () => {},
      () => false
    );

    // Insert participants
    for (const userId of participants) {
      tx.executeSql(
        'INSERT INTO expense_participants (expense_id, user_id, has_paid) VALUES (?, ?, ?)',
        [expense.id, userId, 0],
        () => {},
        () => false
      );
    }
  });
};

export const getExpenses = async (eventId: string): Promise<DBExpense[]> => {
  const result = await database.executeSql(
    'SELECT * FROM expenses WHERE event_id = ? ORDER BY created_at DESC',
    [eventId]
  );
  return result.rows._array;
};

export const getExpenseById = async (id: string): Promise<DBExpense | null> => {
  const result = await database.executeSql(
    'SELECT * FROM expenses WHERE id = ?',
    [id]
  );
  return result.rows._array[0] || null;
};

export const updateExpense = async (expense: DBExpense): Promise<void> => {
  await database.executeSql(
    'UPDATE expenses SET name = ?, value = ?, is_payed = ? WHERE id = ?',
    [expense.name, expense.value, expense.is_payed ? 1 : 0, expense.id]
  );
};

export const deleteExpense = async (id: string): Promise<void> => {
  await database.executeSql('DELETE FROM expenses WHERE id = ?', [id]);
};

export const getExpenseParticipants = async (expenseId: string): Promise<DBExpenseParticipant[]> => {
  const result = await database.executeSql(
    'SELECT * FROM expense_participants WHERE expense_id = ?',
    [expenseId]
  );
  return result.rows._array;
};

export const updateExpenseParticipant = async (expenseId: string, userId: string, hasPaid: boolean): Promise<void> => {
  await database.executeSql(
    'UPDATE expense_participants SET has_paid = ? WHERE expense_id = ? AND user_id = ?',
    [hasPaid ? 1 : 0, expenseId, userId]
  );
};

export const deleteAllExpenses = async (): Promise<void> => {
  await database.executeSql('DELETE FROM expenses');
}; 