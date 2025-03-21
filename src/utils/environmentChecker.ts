/**
 * Utility for checking required environment variables
 * This file helps with troubleshooting deployment issues related to missing environment variables
 */

interface EnvVariable {
  name: string;
  required: boolean;
  isDefined: boolean;
}

export function checkEnvironmentVariables(): EnvVariable[] {
  const requiredVariables = [
    // Firebase Configuration
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
    // PayPal Configuration
    "NEXT_PUBLIC_PAYPAL_CLIENT_ID",
    // Fal.ai Configuration (optional for client-side)
    "FAL_API_KEY"
  ];

  return requiredVariables.map(name => ({
    name,
    required: !name.includes("FAL_API_KEY"), // All except FAL_API_KEY are required
    isDefined: typeof process.env[name] !== 'undefined' && process.env[name] !== ''
  }));
}

export function getMissingVariables(): string[] {
  const variables = checkEnvironmentVariables();
  return variables
    .filter(v => v.required && !v.isDefined)
    .map(v => v.name);
}

export function logEnvironmentStatus(): void {
  const variables = checkEnvironmentVariables();
  const missingRequired = variables.filter(v => v.required && !v.isDefined);
  
  console.log('Environment Variables Status:');
  variables.forEach(v => {
    console.log(`- ${v.name}: ${v.isDefined ? 'Defined' : 'Missing'}${v.required ? ' (Required)' : ' (Optional)'}`);
  });
  
  if (missingRequired.length > 0) {
    console.warn('⚠️ Missing required environment variables:');
    missingRequired.forEach(v => {
      console.warn(`  - ${v.name}`);
    });
    console.warn('Please add these variables to your environment before deploying.');
  } else {
    console.log('✅ All required environment variables are defined.');
  }
}
