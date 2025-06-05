package com.splitmate.backend.controller;

import com.splitmate.backend.dto.EventDTO;
import com.splitmate.backend.model.Event;
import com.splitmate.backend.service.EventService;
import com.splitmate.backend.service.mapper.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {
    
    @Autowired
    private EventService eventService;
    
    @Autowired
    private EntityMapper mapper;
    
    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(mapper.toEventDTOs(Set.copyOf(events)));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEvent(@PathVariable String id) {
        Event event = eventService.getEventById(id);
        EventDTO dto = mapper.toEventDTO(event);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable String id, @RequestBody Event event) {
        return eventService.updateEvent(id, event);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
    }
} 