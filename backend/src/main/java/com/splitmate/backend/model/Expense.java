package com.splitmate.backend.model;

import lombok.Data;
import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    private String id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "amount", nullable = false)
    private Double value;
    
    @Column(name = "is_payed")
    private Boolean isPayed = false;
    
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
    
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
    
    @ManyToMany
    @JoinTable(
        name = "expense_participants",
        joinColumns = @JoinColumn(name = "expense_id"),
        inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private Set<User> participants;
} 