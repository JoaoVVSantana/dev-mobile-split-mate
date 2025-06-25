import { auth, db } from "@/persistence/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
  getDoc,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
  getDocsFromServer,
  updateDoc,
} from "firebase/firestore";
import { TEvent } from "~/types/TEvent";
import { TFriend } from "~/types/TFriend";
import { IExpenseParticipant } from "~/types/IExpenseParticipant";
import { TExpense } from "~/types/TExpense";

class EventService {
  private static uid = "1d3PdNbqEtVwXSrpiZRKxDx1eh43";
  private static eventsCol() {
    if (!EventService.uid) throw new Error("Usuário não autenticado");
    return collection(db, "user", EventService.uid, "events");
  }

  private static async eventFromSnap(
    snap: QueryDocumentSnapshot<DocumentData>
  ): Promise<TEvent> {
    const data = snap.data();
    const expSnap = await getDocs(collection(snap.ref, "expenses"));
    const expenses = expSnap.docs.map(
      (d) =>
        ({
          id: d.id,
          ...d.data(),
        } as TExpense)
    );
    return {
      id: snap.id,
      title: data.title,
      date: data.date,
      participants: data.participants as TFriend[],
      expenses,
    };
  }

  static async getAll(): Promise<TEvent[]> {
    const snap = await getDocsFromServer(this.eventsCol());
    const promises = snap.docs.map((d) => this.eventFromSnap(d));
    return Promise.all(promises);
  }

  static async getById(id: string): Promise<TEvent> {
    const ref = doc(this.eventsCol(), id);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error("Evento não encontrado");
    return this.eventFromSnap(snap as any);
  }

  static async create(
    data: Omit<TEvent, "id" | "expenses">
  ): Promise<TEvent> {
    const ref = await addDoc(this.eventsCol(), {
      ...data,
      createdAt: Timestamp.now(),
      expenses: [],
    });
    return { ...data, id: ref.id, expenses: [] };
  }

  static async addExpense(
    eventId: string,
    expense: {
      name: string;
      value: number;
      owner: TFriend;
      participants: IExpenseParticipant[];
    }
  ): Promise<TExpense> {
    const ref = await addDoc(
      collection(this.eventsCol(), eventId, "expenses"),
      {
        ...expense,
        isPayed: false,
        createdAt: Timestamp.now(),
      }
    );
    return { id: ref.id, isPayed: false, ...expense };
  }

  static async updateExpense(
    eventId: string,
    expenseId: string,
    data: Partial<TExpense>
  ): Promise<void> {
    const ref = doc(
      this.eventsCol(),
      eventId,
      "expenses",
      expenseId
    );
    await updateDoc(ref, data);
  }

  static async deleteEvent(id: string): Promise<void> {
    const eventRef = doc(this.eventsCol(), id);
    const expensesSnapshot = await getDocs(collection(eventRef, "expenses"));
    const expenseDeletions = expensesSnapshot.docs.map((doc) =>
      deleteDoc(doc.ref)
    );
    await Promise.all(expenseDeletions);
    await deleteDoc(eventRef);
  }
}

export default EventService;
