// Configuración de Firebase
// NOTA: En producción, estas credenciales deberían estar en variables de entorno
// Por ejemplo: process.env.NEXT_PUBLIC_FIREBASE_API_KEY

export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "REPLACE_WITH_ENV_VARIABLE",
  authDomain: "photohero-f55da.firebaseapp.com",
  projectId: "photohero-f55da",
  storageBucket: "photohero-f55da.firebasestorage.app",
  messagingSenderId: "61827278943",
  appId: "1:61827278943:web:2e7dccf37095e7ff1353ea",
  measurementId: "G-CHKPBN82XD"
};
