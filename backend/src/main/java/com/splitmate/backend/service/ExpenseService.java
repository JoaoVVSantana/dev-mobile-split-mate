package com.splitmate.backend.service;

import com.splitmate.backend.model.Expense;
import java.util.List;

public interface ExpenseService {
    List<Expense> getAllExpenses();
    List<Expense> getExpensesByEventId(String eventId);
    Expense getExpenseById(String id);
    Expense createExpense(Expense expense);
    Expense updateExpense(String id, Expense expense);
    void deleteExpense(String id);
}
