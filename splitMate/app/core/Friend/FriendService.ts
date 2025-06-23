import { auth, db } from '@/persistence/firebase';
import {
  collection,
  getDocs,
  addDoc,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { TFriend } from '~/types/TFriend';

export type TFriendInput = Omit<TFriend, 'id' | 'debts'>;
class FriendService {
  private static uid = '1d3PdNbqEtVwXSrpiZRKxDx1eh43'; // uid mockado enquanto nao temos login
  private static waitForUid(): Promise<string> {
    if (auth.currentUser?.uid) return Promise.resolve(auth.currentUser.uid);

    return new Promise((resolve) => {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          unsub();
          resolve(user.uid);
        }
      });
    });
  }

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
    const uid = await this.waitForUid();
    const docRef = await addDoc(collection(db, 'user', uid, 'friends'), {
      ...data,
      debts: [], 
    });

    return { id: docRef.id, debts: [], ...data };
  }
}

export { FriendService };
