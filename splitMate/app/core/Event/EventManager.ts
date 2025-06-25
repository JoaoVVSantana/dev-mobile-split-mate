import EventService from "./EventService";
import { TEvent } from "~/types/TEvent";
import { TFriend } from "~/types/TFriend";
import { IExpenseParticipant } from "~/types/IExpenseParticipant";
import { TExpense } from "~/types/TExpense";

export const EventManager = {
  getAllEvents: () => EventService.getAll(),

  async getEventById(id: string): Promise<TEvent> {
    const ev = await EventService.getById(id);
    if (!ev.title) throw new Error("Evento inválido");
    return ev;
  },

  createEvent: (data: Omit<TEvent, "id" | "expenses">) =>
    EventService.create(data),

  addExpense: (
    eventId: string,
    data: {
      name: string;
      value: number;
      owner: TFriend;
      participants: IExpenseParticipant[];
    }
  ) => EventService.addExpense(eventId, data),

  updateExpense: (
    eventId: string,
    expenseId: string,
    data: Partial<TExpense>
  ) => EventService.updateExpense(eventId, expenseId, data),

  deleteEvent: (id: string) => EventService.deleteEvent(id),
};
