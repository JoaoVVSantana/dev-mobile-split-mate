import { useEffect, useState } from 'react';
import { auth, db } from '@/persistence/firebase';
import {
  signInAnonymously,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';

import { useCommunityStore } from '~/store/useCommunityStore';

interface IUserData {
  userName: string;
  userEmail: string;
  userDebt: string;
}

export function useFirebaseUser(): IUserData {
  const [userData, setUserData] = useState<IUserData>({
    userName: '',
    userEmail: '',
    userDebt: 'R$ 0,00',
  });

  const mockUserID = '1d3PdNbqEtVwXSrpiZRKxDx1eh43'; // Mock user ID for testing

  const { setUser, setIsAuthenticated } = useCommunityStore.getState();

  useEffect(() => {
    const authenticate = async () => {
      await signInAnonymously(auth);
    };

    const loadUserDoc = async (fbUser: FirebaseUser) => {
      const userRef = doc(db, 'user', mockUserID);

      onSnapshot(userRef, (snap) => {
        const data = snap.data();
        if (data) {
          setUser({
            id: fbUser.uid,
            name: data.name,
            email: data.email,
            debts: [],
          });
          setIsAuthenticated(true);     

          setUserData({
            userName: data.name,
            userEmail: data.email,
            userDebt: `R$ ${data.totalDebt
              ?.toFixed(2)
              .replace('.', ',') ?? '0,00'}`,
          });
        }
      });
    };

    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) loadUserDoc(fbUser);
      else authenticate();
    });

    return unsub;
  }, []);

  return userData;
}
