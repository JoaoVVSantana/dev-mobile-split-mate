import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { EventData } from '~/types/EventData';
import { EventManager } from '~/core/Event/EventManager';

export function useHomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await EventManager.getAllEvents();
        setEvents(allEvents);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setIsOverlayActive(!isOverlayActive);
  };

  const closeOptions = () => {
    setShowOptions(false);
    setIsOverlayActive(false);
  };

  const navigateToEvent = (event: EventData) => {
    router.push({
      pathname: '/views/EventScreen',
      params: { eventId: event.id },
    });
  };

  const navigateToNewEvent = () => {
    router.push('/views/NewEventScreen');
  };

  return {
    searchQuery,
    setSearchQuery,
    showOptions,
    isOverlayActive,
    toggleOptions,
    closeOptions,
    filteredEvents,
    navigateToEvent,
    navigateToNewEvent,
  };
}
