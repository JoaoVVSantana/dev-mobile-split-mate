package com.splitmate.backend.controller;

import com.splitmate.backend.model.Expense;
import com.splitmate.backend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    
    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }
    
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @GetMapping("/event/{eventId}")
    public List<Expense> getExpensesByEventId(@PathVariable String eventId) {
        return expenseService.getExpensesByEventId(eventId);
    }

    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable String id) {
        return expenseService.getExpenseById(id);
    }

    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        return expenseService.createExpense(expense);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable String id, @RequestBody Expense expense) {
        return expenseService.updateExpense(id, expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable String id) {
        expenseService.deleteExpense(id);
    }
} 