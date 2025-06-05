package com.splitmate.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class EventDTO {
    private String id;
    private String title;
    private String date;
    private List<ExpenseDTO> expenses;
    private List<FriendDTO> participants;
} 