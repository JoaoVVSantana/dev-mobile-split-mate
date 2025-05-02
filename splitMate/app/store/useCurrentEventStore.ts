import { create } from 'zustand';

interface CurrentEventStore {
  eventId: string | null;
  setEventId: (id: string) => void;
  clearEventId: () => void;
}

export const useCurrentEventStore = create<CurrentEventStore>((set) => ({
  eventId: null,
  setEventId: (id) => set({ eventId: id }),
  clearEventId: () => set({ eventId: null }),
}));
