'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserSubscription } from '@/types/subscription';

// Create a context with null as default value
type AuthContextType = ReturnType<typeof useAuth> | null;
const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Simplified hook to get subscription data
export const useSubscription = (): UserSubscription | null => {
  const authContext = useAuthContext();
  return authContext?.subscription;
};

// Hook to check if a user has an active subscription
export const useHasActiveSubscription = (): boolean => {
  const subscription = useSubscription();
  return subscription !== null && subscription.status === 'active';
};
