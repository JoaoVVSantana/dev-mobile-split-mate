package com.splitmate.backend.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ExpenseParticipantDTO extends FriendDTO {
    private Boolean hasPaid;
} 