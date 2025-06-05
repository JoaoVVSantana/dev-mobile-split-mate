package com.splitmate.backend.service.impl;

import com.splitmate.backend.model.Event;
import com.splitmate.backend.repository.EventRepository;
import com.splitmate.backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Event getEventById(String id) {
        return eventRepository.findById(id).orElse(null);
    }

    @Override
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(String id, Event event) {
        if (eventRepository.existsById(id)) {
            event.setId(id);
            return eventRepository.save(event);
        }
        return null;
    }

    @Override
    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }
} 