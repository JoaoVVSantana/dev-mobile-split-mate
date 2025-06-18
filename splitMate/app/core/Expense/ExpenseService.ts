import { TExpense } from '~/types/TExpense';
import axios from 'axios';
import { createAxiosConfig } from '../../utils/api-helpers';

export const ExpenseService = {
  async getAll(): Promise<TExpense[]> {
    const config = createAxiosConfig('GET_EXPENSES');
    const { data } = await axios.get<TExpense[]>(config.url!, config);
    return data;
  },

  async getById(id: string): Promise<TExpense> {
    const config = createAxiosConfig('GET_EXPENSE_BY_ID', 'DEFAULT', { id });
    const { data } = await axios.get<TExpense>(config.url!, config);
    if (!data) throw new Error('Despesa não encontrada');
    return data;
  },

  async create(expense: Omit<TExpense, 'id'>): Promise<TExpense> {
    const config = createAxiosConfig('POST_EXPENSE');
    const { data } = await axios.post<TExpense>(config.url!, expense, config);
    return data;
  },

  async update(id: string, expense: TExpense): Promise<TExpense> {
    const config = createAxiosConfig('PUT_EXPENSE', 'DEFAULT', { id });
    const { data } = await axios.put<TExpense>(config.url!, expense, config);
    return data;
  },

  async delete(id: string): Promise<void> {
    const config = createAxiosConfig('DELETE_EXPENSE', 'DEFAULT', { id });
    await axios.delete(config.url!, config);
  },

  async addParticipant(expenseId: string, friendId: string): Promise<void> {
    const config = createAxiosConfig('POST_EXPENSE_PARTICIPANT', 'DEFAULT', { expenseId, friendId });
    await axios.post(config.url!, {}, config);
  },

  async removeParticipant(expenseId: string, friendId: string): Promise<void> {
    const config = createAxiosConfig('DELETE_EXPENSE_PARTICIPANT', 'DEFAULT', { expenseId, friendId });
    await axios.delete(config.url!, config);
  },

  async updatePaymentStatus(expenseId: string, participantId: string, hasPaid: boolean): Promise<void> {
    const config = createAxiosConfig('PUT_EXPENSE_PAYMENT_STATUS', 'DEFAULT', { id: expenseId, participantId });
    await axios.put(config.url!, { hasPaid }, config);
  }
}; 