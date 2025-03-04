/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7F56D9", // Tono púrpura para botones y destacados
        secondary: "#EC4899", // Tono rosado para acentos secundarios
        dark: "#111827", // Fondo oscuro principal
        darkLight: "#1F2937", // Fondo oscuro secundario
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}; 