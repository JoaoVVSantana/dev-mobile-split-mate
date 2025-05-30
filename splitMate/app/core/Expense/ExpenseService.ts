import { TExpense } from '~/types/TExpense';
import { ExpenseRepository } from '~/persistence/expenseRepository';
import { FriendService } from '../Friend/FriendService';
import { DBExpense } from '~/persistence/database';
import { IExpenseParticipant } from '~/types/IExpenseParticipant';

// Convert DB model to domain model
const toExpense = async (expense: DBExpense): Promise<TExpense> => {
  // Get owner
  const owner = await FriendService.getById(expense.owner_id);
  if (!owner) {
    throw new Error('Expense owner not found');
  }

  // Get participants
  const dbParticipants = await ExpenseRepository.getParticipants(expense.id);
  const participants: IExpenseParticipant[] = await Promise.all(
    dbParticipants.map(async (p) => {
      const user = await FriendService.getById(p.user_id);
      if (!user) {
        throw new Error('Participant not found');
      }
      return {
        ...user,
        hasPaid: p.has_paid
      };
    })
  );

  return {
    id: expense.id,
    name: expense.name,
    value: expense.value,
    isPayed: expense.is_payed,
    owner,
    participants
  };
};

export const ExpenseService = {
  async getAllForEvent(eventId: string): Promise<TExpense[]> {
    const expenses = await ExpenseRepository.getAllForEvent(eventId);
    return Promise.all(expenses.map(toExpense));
  },

  async getById(id: string): Promise<TExpense> {
    const expense = await ExpenseRepository.getById(id);
    if (!expense) {
      throw new Error('Expense not found');
    }
    return toExpense(expense);
  },

  async create(
    eventId: string,
    expense: Omit<TExpense, 'id' | 'participants'>
  ): Promise<TExpense> {
    const id = await ExpenseRepository.create({
      event_id: eventId,
      name: expense.name,
      value: expense.value,
      is_payed: expense.isPayed,
      owner_id: expense.owner.id
    });

    return {
      id,
      ...expense,
      participants: []
    };
  },

  async update(expense: TExpense): Promise<void> {
    await ExpenseRepository.update({
      id: expense.id,
      event_id: '', // This should come from the context or be passed as parameter
      name: expense.name,
      value: expense.value,
      is_payed: expense.isPayed,
      owner_id: expense.owner.id
    });

    // Update participants
    const currentParticipants = await ExpenseRepository.getParticipants(expense.id);
    const newParticipantIds = new Set(expense.participants.map(p => p.id));
    const currentParticipantIds = new Set(currentParticipants.map(p => p.user_id));

    // Remove participants that are no longer in the expense
    for (const participant of currentParticipants) {
      if (!newParticipantIds.has(participant.user_id)) {
        await ExpenseRepository.removeParticipant(expense.id, participant.user_id);
      }
    }

    // Add new participants and update existing ones
    for (const participant of expense.participants) {
      if (!currentParticipantIds.has(participant.id)) {
        await ExpenseRepository.addParticipant(expense.id, participant.id);
      }
      await ExpenseRepository.updateParticipantStatus(
        expense.id,
        participant.id,
        participant.hasPaid
      );
    }
  },

  async delete(id: string): Promise<void> {
    await ExpenseRepository.delete(id);
  },

  async addParticipant(expenseId: string, userId: string): Promise<void> {
    await ExpenseRepository.addParticipant(expenseId, userId);
  },

  async updateParticipantStatus(
    expenseId: string,
    userId: string,
    hasPaid: boolean
  ): Promise<void> {
    await ExpenseRepository.updateParticipantStatus(expenseId, userId, hasPaid);
  },

  async removeParticipant(expenseId: string, userId: string): Promise<void> {
    await ExpenseRepository.removeParticipant(expenseId, userId);
  }
}; 