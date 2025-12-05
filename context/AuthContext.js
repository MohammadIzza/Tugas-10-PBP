import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth } from '../firebase.config';
import { saveAuthData, getAuthData, clearAuthData, isLoggedIn } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check apakah user sudah login dari AsyncStorage saat app dibuka
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedIn = await isLoggedIn();
        if (loggedIn) {
          const authData = await getAuthData();
          setUser({
            uid: authData.userId,
            email: authData.userEmail,
          });
          console.log('✅ User already logged in:', authData.userEmail);
        }
      } catch (error) {
        console.error('❌ Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Function untuk login
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail } = userCredential.user;
      
      // Dapatkan token
      const token = await userCredential.user.getIdToken();
      
      // Simpan ke AsyncStorage
      await saveAuthData(uid, userEmail, token);
      
      // Update state
      setUser({ uid, email: userEmail });
      
      console.log('✅ Login successful:', userEmail);
      return { success: true };
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Function untuk register
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail } = userCredential.user;
      
      const token = await userCredential.user.getIdToken();
      await saveAuthData(uid, userEmail, token);
      
      setUser({ uid, email: userEmail });
      
      console.log('✅ Registration successful:', userEmail);
      return { success: true };
    } catch (error) {
      console.error('❌ Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  // Function untuk logout
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      await clearAuthData();
      setUser(null);
      console.log('✅ Logout successful');
      return { success: true };
    } catch (error) {
      console.error('❌ Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};