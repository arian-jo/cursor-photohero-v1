import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  browserPopupRedirectResolver
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { getUserSubscription } from '@/services/subscriptionService';
import { UserSubscription } from '@/types/subscription';

interface AuthState {
  user: any | null;
  subscription: UserSubscription | null;
  loading: boolean;
  error: Error | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    subscription: null,
    loading: true,
    error: null
  });

  // Función para obtener la suscripción del usuario
  const fetchUserSubscription = async (userId: string) => {
    try {
      const subscription = await getUserSubscription(userId);
      setState(prevState => ({
        ...prevState,
        subscription
      }));
      return subscription;
    } catch (error) {
      console.error("Error al obtener la suscripción:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      console.log("Auth state changed:", user);
      
      setState(prevState => ({
        ...prevState,
        user,
        loading: user ? true : false, // Mantener loading en true mientras cargamos la suscripción
      }));

      // Si hay un usuario, obtener su suscripción
      if (user) {
        await fetchUserSubscription(user.uid);
        setState(prevState => ({
          ...prevState,
          loading: false
        }));
      }
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
      
      // Obtener la suscripción del usuario
      const subscription = await fetchUserSubscription(result.user.uid);
      
      setState({
        user: result.user,
        subscription,
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
      setState({
        user: null,
        subscription: null,
        loading: false,
        error: null
      });
    } catch (error) {
      setState({
        ...state,
        error: error as Error,
        loading: false
      });
    }
  };

  // Función para actualizar la suscripción en el estado
  const updateSubscriptionState = (subscription: UserSubscription | null) => {
    setState(prevState => ({
      ...prevState,
      subscription
    }));
  };

  return {
    user: state.user,
    subscription: state.subscription,
    loading: state.loading,
    error: state.error,
    signInWithGoogle,
    signOut,
    refreshSubscription: state.user ? () => fetchUserSubscription(state.user.uid) : null,
    updateSubscriptionState
  };
};
