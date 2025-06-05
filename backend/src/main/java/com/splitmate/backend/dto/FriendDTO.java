package com.splitmate.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class FriendDTO {
    private String id;
    private String name;
    private String email;
    private List<DebtDTO> debts;
} 