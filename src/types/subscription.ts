export type SubscriptionTier = 'starter' | 'pro' | 'premium' | 'ultra';

export type BillingCycle = 'monthly' | 'yearly';

export type SubscriptionStatus = 'active' | 'canceled' | 'expired' | 'cancelling';

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  monthlyPrice: number;
  yearlyPrice: number;
  isPopular: boolean;
  features: string[];
  photoCredits: number;
  maxModels: number;
  maxParallelGeneration: number;
  supportedFeatures: {
    photoQuality: 'low' | 'medium' | 'high' | 'ultra';
    resemblance: 'low' | 'passable' | 'high' | 'ultra';
    customPrompts: boolean;
    zoomOut: boolean;
    unlimitedStorage: boolean;
  };
}

export interface UserSubscription {
  userId: string;
  planId: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  billingCycle: BillingCycle;
  cancelAtPeriodEnd: boolean;
  availableCredits: number;
  modelsCreated: number;
  createdAt: Date;
  updatedAt: Date;
}

// Constants that define the features of each plan
export const SUBSCRIPTION_LIMITS = {
  starter: {
    photoCredits: 50,
    maxModels: 1,
    maxParallelGeneration: 1,
  },
  pro: {
    photoCredits: 1000,
    maxModels: 3,
    maxParallelGeneration: 4,
  },
  premium: {
    photoCredits: 3000,
    maxModels: 10,
    maxParallelGeneration: 8,
  },
  ultra: {
    photoCredits: 10000,
    maxModels: 50,
    maxParallelGeneration: 16,
  },
};
