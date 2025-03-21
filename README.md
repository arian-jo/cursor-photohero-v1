# PhotoHero

PhotoHero es una plataforma que permite a los usuarios entrenar un modelo de IA personalizado subiendo entre 4 y 15 fotos. El entrenamiento se realiza usando la API de fal.ai con sus modelos FLUX LoRA fine-tuning.

## Descripción

PhotoHero ofrece:
- Entrenamiento de modelo personalizado por solo $9 USD
- Proceso simple de 4 pasos (registro, pago, subida de fotos, entrenamiento)
- Entrenamiento rápido en aproximadamente 10-20 minutos
- Generación de imágenes personalizadas con tu propio modelo
- Personalización del entrenamiento con opciones de LoRA

## Tecnologías Utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Autenticación con Firebase (Google Sign-In)
- Integración de PayPal para pagos
- API de fal.ai FLUX LoRA para entrenamiento de modelos
- JSZip para el procesamiento de archivos

## Funcionalidades Principales

1. **Landing Page**: Presentación del servicio con información sobre precios y funcionalidades
2. **Autenticación**: Flujo de registro simplificado con Firebase Authentication y Google Sign-In
3. **Pagos**: Integración con PayPal para el pago único de $9 USD
4. **Entrenamiento de IA**: 
   - Subida de 4-15 fotos para entrenar el modelo
   - Configuración de parámetros de entrenamiento (palabra gatillo, estilo, pasos)
   - Integración con la API FLUX LoRA de fal.ai
   - Seguimiento en tiempo real del progreso del entrenamiento

## Instalación y Ejecución

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Crear un archivo `.env.local` con las siguientes variables:
```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_de_firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=tu_id_de_cliente_de_paypal

# FAL.AI Configuration (para el entrenamiento del modelo)
FAL_API_KEY=tu_clave_api_de_falai
```
4. Ejecutar en modo desarrollo:
```bash
npm run dev
```
5. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Seguridad

Este proyecto utiliza variables de entorno para manejar claves API y otras credenciales sensibles. Nunca expongas estas claves directamente en el código fuente o las incluyas en el control de versiones.

Para despliegue:
1. En Netlify o Vercel, configura las variables de entorno en la sección correspondiente
2. Asegúrate de que todos los servicios externos (Firebase, PayPal) tengan los dominios correctos autorizados

## Implementación en Producción

Para implementar en producción:

```bash
npm run build
npm start
```

O despliega directamente en plataformas como Vercel o Netlify.

## Flujo de Usuario

1. El usuario visita la landing page y hace clic en "Create My Model Now" o "Sign Up with Google"
2. Se autentica mediante Google OAuth directamente desde la página principal
3. Es redirigido a la página de pago donde completa la transacción de $9 USD con PayPal
4. Después del pago exitoso, accede a la página de entrenamiento donde puede:
   - Subir 4-15 fotos de referencia
   - Especificar una palabra gatillo para su modelo
   - Configurar parámetros de entrenamiento (tipo de LoRA, pasos, máscaras de segmentación)
   - Iniciar el entrenamiento del modelo con la API FLUX LoRA de fal.ai
5. El usuario puede seguir el progreso del entrenamiento en tiempo real
6. Una vez completado el entrenamiento, puede descargar y utilizar su modelo personalizado

## Integración con fal.ai

PhotoHero utiliza la API FLUX LoRA de fal.ai para el entrenamiento de modelos personalizados. Esta integración permite:

1. **Subida de archivos**: Las imágenes se cargan directamente a fal.ai para su procesamiento
2. **Entrenamiento LoRA**: Personalización del modelo mediante técnica LoRA (Low-Rank Adaptation)
3. **Seguimiento de estado**: Monitoreo en tiempo real del progreso de entrenamiento
4. **Recuperación de resultados**: Acceso al modelo entrenado y ejemplos generados

Para más información sobre la API FLUX LoRA, visita la [documentación oficial de fal.ai](https://fal.ai/models/flux).

## Estructura del Proyecto

- `/src/app`: Páginas principales de la aplicación (Next.js App Router)
- `/src/components`: Componentes reutilizables
  - `/src/components/ModelTraining.tsx`: Componente para entrenar modelos con fal.ai
- `/src/services`: Servicios de la aplicación
  - `/src/services/falApi.ts`: Servicio para interactuar con la API de fal.ai
- `/src/context`: Contextos de React
- `/src/hooks`: Hooks personalizados
- `/src/styles`: Estilos globales y configuración de Tailwind CSS
- `/public`: Archivos estáticos

## Créditos y Licencia

 2025 PhotoHero. All rights reserved.