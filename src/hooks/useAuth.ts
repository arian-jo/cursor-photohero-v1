import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

interface AuthState {
  user: any | null;
  loading: boolean;
  error: Error | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setState({
        user,
        loading: false,
        error: null
      });
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setState({ ...state, loading: true });
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setState({
        ...state,
        error: error as Error,
        loading: false
      });
    }
  };

  const signOut = async () => {
    try {
      setState({ ...state, loading: true });
      await firebaseSignOut(auth);
    } catch (error) {
      setState({
        ...state,
        error: error as Error,
        loading: false
      });
    }
  };

  return {
    ...state,
    signInWithGoogle,
    signOut
  };
};
