package com.splitmate.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class ExpenseDTO {
    private String id;
    private String name;
    private Double value;
    private Boolean isPayed;
    private List<ExpenseParticipantDTO> participants;
    private FriendDTO owner;
} 