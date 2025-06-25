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

  useEffect(() => {
    const authenticate = async () => {
      await signInAnonymously(auth); 
    };

    const loadUser = async (user: FirebaseUser) => {
      const userRef = doc(db, 'user', user.uid);

      onSnapshot(userRef, (snapshot) => {
        const data = snapshot.data();
        if (data) {
          setUserData({
            userName: data.name,
            userEmail: data.email,
            userDebt: `R$ ${data.totalDebt?.toFixed(2).replace('.', ',') ?? '0,00'}`,
          });
        }
      });
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) loadUser(user);
      else authenticate();
    });

    return unsubscribe;
  }, []);

  return userData;
}
