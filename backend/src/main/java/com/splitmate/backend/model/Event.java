package com.splitmate.backend.model;

import lombok.Data;
import javax.persistence.*;
import java.util.Set;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "events")
public class Event {
    @Id
    private String id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private LocalDate date;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private Set<Expense> expenses;

    @ManyToMany
    @JoinTable(
        name = "event_participants",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private Set<User> participants;
} 