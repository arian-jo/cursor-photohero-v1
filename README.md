# PhotoHero

PhotoHero es una plataforma que permite a los usuarios entrenar un modelo de IA personalizado subiendo entre 10 y 15 fotos. El entrenamiento se realiza usando la API de fal.ai con sus modelos "flux".

## Descripción

PhotoHero ofrece:
- Entrenamiento de modelo personalizado por solo $9 USD
- Proceso simple de 4 pasos (registro, pago, subida de fotos, entrenamiento)
- Entrenamiento rápido en aproximadamente 10 minutos
- Generación de imágenes personalizadas con tu propio modelo

## Tecnologías Utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Autenticación con Google OAuth
- Integración de PayPal para pagos
- API de fal.ai para entrenamiento de modelos

## Funcionalidades Principales

1. **Landing Page**: Presentación del servicio con información sobre precios y funcionalidades
2. **Autenticación**: Flujo de registro con Google OAuth
3. **Pagos**: Integración con PayPal para el pago único de $9 USD
4. **Subida de Fotos**: Interfaz para subir 10-15 fotos para entrenar el modelo
5. **Entrenamiento de IA**: Integración con la API de fal.ai utilizando modelos "flux"

## Instalación y Ejecución

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Crear un archivo `.env.local` con las siguientes variables:
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_id_de_cliente_de_google
GOOGLE_CLIENT_SECRET=tu_secreto_de_cliente_de_google
NEXT_PUBLIC_PAYPAL_CLIENT_ID=tu_id_de_cliente_de_paypal
FALAI_API_KEY=tu_clave_api_de_falai
NEXTAUTH_SECRET=una_cadena_aleatoria_para_seguridad
NEXTAUTH_URL=http://localhost:3000
```
4. Ejecutar en modo desarrollo:
```bash
npm run dev
```
5. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Implementación en Producción

Para implementar en producción:

```bash
npm run build
npm start
```

O despliega directamente en plataformas como Vercel o Netlify.

## Flujo de Usuario

1. El usuario visita la landing page y hace clic en "Create My Model Now" o "Sign Up with Google"
2. Se autentica mediante Google OAuth
3. Es redirigido a la página de pago donde completa la transacción de $9 USD con PayPal
4. Después del pago exitoso, accede a la página para subir 10-15 fotos
5. Una vez subidas las fotos, comienza el entrenamiento del modelo (aprox. 10 minutos)
6. Cuando el modelo está listo, puede generar imágenes personalizadas

## Estructura del Proyecto

- `/src/app`: Páginas principales de la aplicación (Next.js App Router)
- `/src/components`: Componentes reutilizables
- `/src/styles`: Estilos globales y configuración de Tailwind CSS
- `/public`: Archivos estáticos

## Créditos y Licencia

© 2025 PhotoHero. All rights reserved. 