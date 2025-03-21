import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { UserSubscription, SubscriptionTier, BillingCycle } from '@/types/subscription';
import { 
  createSubscription, 
  updateSubscription, 
  useCredits,
  canCreateModel,
  incrementModelsCreated as incrementModelsCreatedService
} from '@/services/subscriptionService';

export const useSubscriptionManagement = () => {
  const { user, subscription, updateSubscriptionState, refreshSubscription } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Suscribe al usuario a un plan
   */
  const subscribe = async (plan: SubscriptionTier, cycle: BillingCycle) => {
    if (!user) {
      setError('Debes iniciar sesión para suscribirte');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // En una implementación real, aquí se llamaría a una API de pagos
      // como Stripe para procesar el pago antes de crear la suscripción
      
      const newSubscription = await createSubscription(user.uid, plan, cycle);
      
      // Actualizar el estado de la autenticación
      updateSubscriptionState(newSubscription);
      
      setLoading(false);
      return newSubscription;
    } catch (error: any) {
      setError(error.message || 'Error al crear la suscripción');
      setLoading(false);
      return null;
    }
  };

  /**
   * Cambia el plan de suscripción del usuario
   */
  const changePlan = async (newPlan: SubscriptionTier, newCycle?: BillingCycle) => {
    if (!user || !subscription) {
      setError('No tienes una suscripción activa');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // En una implementación real, aquí se llamaría a una API de pagos
      // para procesar el cambio de plan
      
      const updates: Partial<UserSubscription> = {
        planId: newPlan
      };
      
      if (newCycle) {
        updates.billingCycle = newCycle;
      }
      
      const updatedSubscription = await updateSubscription(user.uid, updates);
      
      // Actualizar el estado de la autenticación
      if (updatedSubscription) {
        updateSubscriptionState(updatedSubscription);
      }
      
      setLoading(false);
      return updatedSubscription;
    } catch (error: any) {
      setError(error.message || 'Error al cambiar el plan');
      setLoading(false);
      return null;
    }
  };

  /**
   * Cancela la suscripción al final del período actual
   */
  const cancelSubscription = async () => {
    if (!user || !subscription) {
      setError('No tienes una suscripción activa');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      // En una implementación real, aquí se llamaría a una API de pagos
      // para cancelar la suscripción
      
      const updatedSubscription = await updateSubscription(user.uid, {
        cancelAtPeriodEnd: true,
        status: 'cancelling'
      });
      
      // Actualizar el estado de la autenticación
      if (updatedSubscription) {
        updateSubscriptionState(updatedSubscription);
      }
      
      setLoading(false);
      return true;
    } catch (error: any) {
      setError(error.message || 'Error al cancelar la suscripción');
      setLoading(false);
      return false;
    }
  };

  /**
   * Usa créditos de la suscripción
   */
  const consumeCredits = async (amount: number) => {
    if (!user || !subscription) {
      setError('No tienes una suscripción activa');
      return false;
    }

    if (subscription.availableCredits < amount) {
      setError('No tienes suficientes créditos');
      return false;
    }

    try {
      const updatedSubscription = await useCredits(user.uid, amount);
      
      if (!updatedSubscription) {
        setError('No se pudieron usar los créditos');
        return false;
      }
      
      // Actualizar el estado de la autenticación
      updateSubscriptionState(updatedSubscription);
      
      return true;
    } catch (error: any) {
      setError(error.message || 'Error al usar créditos');
      return false;
    }
  };

  /**
   * Incrementa el contador de modelos creados
   */
  const incrementModelsCreated = async () => {
    if (!user || !subscription) {
      setError('No tienes una suscripción activa');
      return false;
    }
    
    try {
      const updatedSubscription = await incrementModelsCreatedService(user.uid);
      
      if (!updatedSubscription) {
        setError('No se pudo incrementar el contador de modelos');
        return false;
      }
      
      // Actualizar el estado de la autenticación
      updateSubscriptionState(updatedSubscription);
      
      return true;
    } catch (error: any) {
      setError(error.message || 'Error al incrementar el contador de modelos');
      return false;
    }
  };

  /**
   * Verifica si el usuario puede crear un nuevo modelo
   */
  const checkCanCreateModel = async () => {
    if (!user) return false;
    return canCreateModel(user.uid);
  };

  /**
   * Recarga la información de la suscripción
   */
  const reload = async () => {
    if (!user || !refreshSubscription) return null;
    
    setLoading(true);
    try {
      const reloadedSubscription = await refreshSubscription();
      setLoading(false);
      return reloadedSubscription;
    } catch (error: any) {
      setError(error.message || 'Error al recargar la información de suscripción');
      setLoading(false);
      return null;
    }
  };

  return {
    subscription,
    loading,
    error,
    subscribe,
    changePlan,
    cancelSubscription,
    consumeCredits,
    incrementModelsCreated,
    checkCanCreateModel,
    reload
  };
};
