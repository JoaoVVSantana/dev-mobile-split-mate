import { create } from "zustand";
import { TEvent } from "~/types/TEvent";
import { TExpense } from "~/types/TExpense";

interface CurrentEventState {
  events: TEvent[];
  currentEvent: TEvent | null;
  currentExpense: TExpense | null;
  setEvents: (events: TEvent[]) => void;
  setCurrentEvent: (event: TEvent) => void;
  setCurrentExpense: (expense: TExpense | null) => void;
  addEvent: (event: TEvent) => void;
  removeEvent: (id: string) => void;
  reorderEvents: (newOrder: TEvent[]) => void;
  updateExpense: (eventId: string, expense: TExpense) => void;
}

export const useCurrentEventStore = create<CurrentEventState>((set) => ({
  events: [],
  currentEvent: null,
  currentExpense: null,

  setEvents: (events) => set({ events }),

  setCurrentEvent: (event) => set({ currentEvent: event }),

  setCurrentExpense: (expense) => set({ currentExpense: expense }),

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),

  reorderEvents: (newOrder) =>
    set(() => ({
      events: newOrder,
    })),

  updateExpense: (eventId, expense) =>
    set((state) => ({
      currentExpense:
        state.currentExpense && state.currentExpense.id === expense.id
          ? expense
          : state.currentExpense,
      currentEvent:
        state.currentEvent && state.currentEvent.id === eventId
          ? {
              ...state.currentEvent,
              expenses: state.currentEvent.expenses.map((e) =>
                e.id === expense.id ? expense : e
              ),
            }
          : state.currentEvent,
      events: state.events.map((ev) =>
        ev.id === eventId
          ? {
              ...ev,
              expenses: ev.expenses.map((e) =>
                e.id === expense.id ? expense : e
              ),
            }
          : ev
      ),
    })),
}));
