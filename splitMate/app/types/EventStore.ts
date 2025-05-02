interface CurrentEventStore {
    eventId: string | null;
    setEventId: (id: string) => void;
    clearEventId: () => void;
  }
  