package com.splitmate.backend.service.impl;

import com.splitmate.backend.model.Expense;
import com.splitmate.backend.repository.ExpenseRepository;
import com.splitmate.backend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpenseServiceImpl implements ExpenseService {
    private final ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseServiceImpl(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public List<Expense> getExpensesByEventId(String eventId) {
        return expenseRepository.findByEventId(eventId);
    }

    @Override
    public Expense getExpenseById(String id) {
        return expenseRepository.findById(id).orElse(null);
    }

    @Override
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public Expense updateExpense(String id, Expense expense) {
        if (expenseRepository.existsById(id)) {
            expense.setId(id);
            return expenseRepository.save(expense);
        }
        return null;
    }

    @Override
    public void deleteExpense(String id) {
        expenseRepository.deleteById(id);
    }
} 