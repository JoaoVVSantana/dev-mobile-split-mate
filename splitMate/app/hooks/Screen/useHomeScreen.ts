import { useEffect, useState } from 'react';
import { useCurrentEventStore } from '~/store/useCurrentEventStore'; 
import { TEvent } from '~/types/TEvent'; 
import { router } from 'expo-router';
import { EventManager } from '~/core/Event/EventManager';
import { useCommunityStore } from '~/store/useCommunityStore';

export const useHomeScreen = () => {
  const { events, setEvents, setCurrentEvent, removeEvent } = useCurrentEventStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { loadFriends } = useCommunityStore();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventManager.getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        loadFriends();
      } catch (error) {
        console.error('Erro ao buscar amigos:', error);
      }
    };
    fetchFriends();
  }, []);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
    setIsOverlayActive((prev) => !prev);
  };

  const closeOptions = () => {
    setShowOptions(false);
    setIsOverlayActive(false);
  };

  const navigateToNewEvent = () => {
    try {
      router.push('/views/NewEventScreen');
    } catch (error) {
      console.error('Erro ao navegar para criar novo evento:', error);
    }
  };

  const navigateToEvent = (event: TEvent) => {
    try {
      setCurrentEvent(event);
      router.push('/views/EventScreen');
    } catch (error) {
      console.error('Erro ao navegar para tela do evento:', error);
    }
  };

  const deleteEvent = (event: TEvent) => {
    try {
      removeEvent(event.id);
    } catch (error) {
      console.error('Erro ao remover evento:', error);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    isEditing,
    setIsEditing,
    deleteEvent,
  };
};
