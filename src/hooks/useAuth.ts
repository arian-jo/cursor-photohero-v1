import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  browserPopupRedirectResolver
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
      console.log("Auth state changed:", user);
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
      setState({ ...state, loading: true, error: null });
      console.log("Starting Google sign in...");
      
      // Usar el resolver explícito para mejorar la compatibilidad
      const result = await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
      
      console.log("Google sign in successful:", result.user);
      setState({
        user: result.user,
        loading: false,
        error: null
      });
      
      return result;
    } catch (error) {
      console.error("Error during Google sign in:", error);
      setState({
        ...state,
        error: error as Error,
        loading: false
      });
      throw error;
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
    user: state.user,
    loading: state.loading,
    error: state.error,
    signInWithGoogle,
    signOut
  };
};
