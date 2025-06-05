package com.splitmate.backend.service;

import com.splitmate.backend.model.Event;
import java.util.List;

public interface EventService {
    List<Event> getAllEvents();
    Event getEventById(String id);
    Event createEvent(Event event);
    Event updateEvent(String id, Event event);
    void deleteEvent(String id);
}
