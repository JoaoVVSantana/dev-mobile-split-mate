import { db } from '@/persistence/firebase';
import {
  collection,
  getDocs,
  addDoc,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { TFriend } from '~/types/TFriend';

export type TFriendInput = Omit<TFriend, 'id' | 'debts'>;

class FriendService {
  private static uid = '1d3PdNbqEtVwXSrpiZRKxDx1eh43';

  static async getAll(): Promise<TFriend[]> {
    const snap: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, 'user', FriendService.uid, 'friends'),
    );

    return snap.docs.map((d) => ({
      id: d.id,
      debts: [],
      ...(d.data() as Omit<TFriend, 'id' | 'debts'>),
    }));
  }

  static async createFriend(data: TFriendInput): Promise<TFriend> {
    const docRef = await addDoc(
      collection(db, 'user', FriendService.uid, 'friends'),
      {
        ...data,
        debts: [],
      },
    );

    return { id: docRef.id, debts: [], ...data };
  }
}

export { FriendService };
