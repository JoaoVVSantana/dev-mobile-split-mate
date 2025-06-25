import { Platform } from 'react-native';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import Constants from 'expo-constants';

const WEB_CONFIG = { //Sim, estou comitando a chave aqui... 
  apiKey: 'AIzaSyDCcM8zKElijy-X1bNyE1Z7gIC-05QswSs',
  authDomain: 'splitmatedb.firebaseapp.com',
  projectId: 'splitmatedb',
  storageBucket: 'splitmatedb.appspot.com',   
  messagingSenderId: '338951562108',
  appId: '1:338951562108:web:6c6f6c125fe52a5475baf9',
};

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} = Constants.expoConfig!.extra as Record<string, string>; // aqui também

const NATIVE_CONFIG = { 
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};


const firebaseConfig = Platform.OS === 'web' ? WEB_CONFIG : NATIVE_CONFIG;


const firebaseApp: FirebaseApp =
  getApps().length ? getApp() : initializeApp(firebaseConfig);


const auth: Auth = getAuth(firebaseApp);
const db: Firestore = getFirestore(firebaseApp);


export { firebaseApp, auth, db };
