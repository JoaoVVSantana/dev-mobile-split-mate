import { auth, db } from '@/persistence/firebase';
import {
  collection,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { TFriend } from '~/types/TFriend';

class FriendService {
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
    const uid = await this.waitForUid(); // 🔑 garante UID
    const snap: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, 'user', uid, 'friends'),
    );
    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<TFriend, 'id'>),
    }));
  }
}

export { FriendService };
