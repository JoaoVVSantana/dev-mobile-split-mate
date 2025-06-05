package com.splitmate.backend.service.mapper;

import com.splitmate.backend.dto.*;
import com.splitmate.backend.model.*;
import org.springframework.stereotype.Service;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EntityMapper {
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;

    public FriendDTO toFriendDTO(User user) {
        if (user == null) return null;
        
        FriendDTO dto = new FriendDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        return dto;
    }

    public ExpenseParticipantDTO toExpenseParticipantDTO(User user, boolean hasPaid) {
        if (user == null) return null;
        
        ExpenseParticipantDTO dto = new ExpenseParticipantDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setHasPaid(hasPaid);
        return dto;
    }

    public ExpenseDTO toExpenseDTO(Expense expense) {
        if (expense == null) return null;
        
        ExpenseDTO dto = new ExpenseDTO();
        dto.setId(expense.getId());
        dto.setName(expense.getName());
        dto.setValue(expense.getValue());
        dto.setIsPayed(expense.getIsPayed());
        dto.setOwner(toFriendDTO(expense.getOwner()));
        
        // Map participants with their payment status
        List<ExpenseParticipantDTO> participants = expense.getParticipants().stream()
            .map(participant -> {
                boolean hasPaid = expense.getParticipants().contains(participant);
                return toExpenseParticipantDTO(participant, hasPaid);
            })
            .collect(Collectors.toList());
        dto.setParticipants(participants);
        
        return dto;
    }

    public EventDTO toEventDTO(Event event) {
        if (event == null) return null;
        
        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setDate(event.getDate().format(DATE_FORMATTER));
        
        List<ExpenseDTO> expenses = event.getExpenses().stream()
            .map(this::toExpenseDTO)
            .collect(Collectors.toList());
        dto.setExpenses(expenses);
        
        List<FriendDTO> participants = event.getParticipants().stream()
            .map(this::toFriendDTO)
            .collect(Collectors.toList());
        dto.setParticipants(participants);
        
        return dto;
    }

    public List<EventDTO> toEventDTOs(Set<Event> events) {
        if (events == null) return List.of();
        return events.stream()
            .map(this::toEventDTO)
            .collect(Collectors.toList());
    }

    public List<ExpenseDTO> toExpenseDTOs(Set<Expense> expenses) {
        if (expenses == null) return List.of();
        return expenses.stream()
            .map(this::toExpenseDTO)
            .collect(Collectors.toList());
    }

    public List<FriendDTO> toFriendDTOs(Set<User> users) {
        if (users == null) return List.of();
        return users.stream()
            .map(this::toFriendDTO)
            .collect(Collectors.toList());
    }
} 