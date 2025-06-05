package com.splitmate.backend.model;

import lombok.Data;
import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "friends")
public class User {
    @Id
    private String id;
    
    @Column(nullable = false)
    private String name;
    
    private String email;

    @ManyToMany(mappedBy = "participants")
    private Set<Event> events;

    @OneToMany(mappedBy = "owner")
    private Set<Expense> ownedExpenses;

    @ManyToMany(mappedBy = "participants")
    private Set<Expense> participatingExpenses;
} 