import { UserSubscription, SubscriptionTier, BillingCycle, SUBSCRIPTION_LIMITS } from '@/types/subscription';

// Esta es una implementación de ejemplo que en producción se conectaría a Firebase
// o a otro servicio de backend para gestionar las suscripciones

/**
 * Obtiene la suscripción del usuario actual
 * @param userId ID del usuario
 * @returns Suscripción del usuario
 */
export const getUserSubscription = async (userId: string): Promise<UserSubscription | null> => {
  try {
    // En una implementación real, esto haría una petición a la base de datos
    // Por ahora, usaremos datos mock para simular una respuesta
    
    // Simulamos una demora en la red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verificamos si tenemos datos guardados localmente
    const savedSubscription = localStorage.getItem(`subscription_${userId}`);
    if (savedSubscription) {
      const subscription = JSON.parse(savedSubscription);
      
      // Convertir strings a objetos Date
      subscription.currentPeriodStart = new Date(subscription.currentPeriodStart);
      subscription.currentPeriodEnd = new Date(subscription.currentPeriodEnd);
      subscription.createdAt = new Date(subscription.createdAt);
      subscription.updatedAt = new Date(subscription.updatedAt);
      
      return subscription;
    }
    
    // Si no hay datos guardados, devolvemos null
    return null;
  } catch (error) {
    console.error('Error al obtener la suscripción:', error);
    return null;
  }
};

/**
 * Crea una nueva suscripción para el usuario
 * @param userId ID del usuario
 * @param planId Plan seleccionado (starter, pro, premium, ultra)
 * @param billingCycle Ciclo de facturación (mensual o anual)
 * @returns La suscripción creada
 */
export const createSubscription = async (
  userId: string, 
  planId: SubscriptionTier, 
  billingCycle: BillingCycle
): Promise<UserSubscription> => {
  try {
    const now = new Date();
    let endDate = new Date();
    
    // Calcular la fecha de finalización según el ciclo de facturación
    if (billingCycle === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    // Crear la suscripción
    const subscription: UserSubscription = {
      userId,
      planId,
      status: 'active',
      currentPeriodStart: now,
      currentPeriodEnd: endDate,
      billingCycle,
      cancelAtPeriodEnd: false,
      availableCredits: SUBSCRIPTION_LIMITS[planId].photoCredits,
      modelsCreated: 0,
      createdAt: now,
      updatedAt: now
    };
    
    // En una implementación real, esto guardaría los datos en la base de datos
    // Por ahora, guardamos localmente para simular
    localStorage.setItem(`subscription_${userId}`, JSON.stringify(subscription));
    
    return subscription;
  } catch (error) {
    console.error('Error al crear la suscripción:', error);
    throw new Error('No se pudo crear la suscripción');
  }
};

/**
 * Actualiza una suscripción existente
 * @param userId ID del usuario
 * @param updates Campos a actualizar
 * @returns La suscripción actualizada
 */
export const updateSubscription = async (
  userId: string, 
  updates: Partial<UserSubscription>
): Promise<UserSubscription | null> => {
  try {
    // Obtener la suscripción actual
    const currentSubscription = await getUserSubscription(userId);
    if (!currentSubscription) {
      throw new Error('No existe una suscripción para este usuario');
    }
    
    // Actualizar los campos
    const updatedSubscription = {
      ...currentSubscription,
      ...updates,
      updatedAt: new Date()
    };
    
    // Guardar los cambios
    localStorage.setItem(`subscription_${userId}`, JSON.stringify(updatedSubscription));
    
    return updatedSubscription;
  } catch (error) {
    console.error('Error al actualizar la suscripción:', error);
    return null;
  }
};

/**
 * Reduce los créditos disponibles del usuario
 * @param userId ID del usuario
 * @param creditsToUse Cantidad de créditos a utilizar
 * @returns La suscripción actualizada o null si no hay suficientes créditos
 */
export const useCredits = async (
  userId: string, 
  creditsToUse: number
): Promise<UserSubscription | null> => {
  try {
    const subscription = await getUserSubscription(userId);
    if (!subscription) {
      throw new Error('No existe una suscripción para este usuario');
    }
    
    // Verificar si hay suficientes créditos
    if (subscription.availableCredits < creditsToUse) {
      return null; // No hay suficientes créditos
    }
    
    // Actualizar los créditos
    return updateSubscription(userId, {
      availableCredits: subscription.availableCredits - creditsToUse
    });
  } catch (error) {
    console.error('Error al usar créditos:', error);
    return null;
  }
};

/**
 * Incrementa el contador de modelos creados
 * @param userId ID del usuario
 * @returns La suscripción actualizada o null si se alcanzó el límite
 */
export const incrementModelsCreated = async (userId: string): Promise<UserSubscription | null> => {
  try {
    const subscription = await getUserSubscription(userId);
    if (!subscription) {
      throw new Error('No existe una suscripción para este usuario');
    }
    
    // Verificar si se alcanzó el límite de modelos
    const limit = SUBSCRIPTION_LIMITS[subscription.planId].maxModels;
    if (subscription.modelsCreated >= limit) {
      return null; // Se alcanzó el límite
    }
    
    // Incrementar el contador
    return updateSubscription(userId, {
      modelsCreated: subscription.modelsCreated + 1
    });
  } catch (error) {
    console.error('Error al incrementar modelos:', error);
    return null;
  }
};

/**
 * Verifica si el usuario puede crear un nuevo modelo
 * @param userId ID del usuario
 * @returns true si puede crear un modelo, false en caso contrario
 */
export const canCreateModel = async (userId: string): Promise<boolean> => {
  try {
    const subscription = await getUserSubscription(userId);
    if (!subscription) return false;
    
    const limit = SUBSCRIPTION_LIMITS[subscription.planId].maxModels;
    return subscription.modelsCreated < limit;
  } catch (error) {
    console.error('Error al verificar si puede crear modelo:', error);
    return false;
  }
};

/**
 * Verifica si el usuario puede generar imágenes en paralelo
 * @param userId ID del usuario
 * @returns El número máximo de imágenes en paralelo
 */
export const getMaxParallelImages = async (userId: string): Promise<number> => {
  try {
    const subscription = await getUserSubscription(userId);
    if (!subscription) return 1; // Valor por defecto
    
    return SUBSCRIPTION_LIMITS[subscription.planId].maxParallelGeneration;
  } catch (error) {
    console.error('Error al obtener máximo de imágenes en paralelo:', error);
    return 1;
  }
};
