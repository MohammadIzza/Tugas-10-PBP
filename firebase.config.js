// firebase.config.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBXr6t0stvMEQJHBT8iEazeR1_3uqSz7bY",
  authDomain: "moonlit-aria-469711-a4.firebaseapp.com",
  projectId: "moonlit-aria-469711-a4",
  storageBucket: "moonlit-aria-469711-a4.firebasestorage.app",
  messagingSenderId: "710220152896",
  appId: "1:710220152896:web:b1760abfa12a9147a39fa5",
  measurementId: "G-H3QFQYP6QF",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
