/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      modal: {
        // Agrega la clase `centered` para centrar verticalmente el modal
        centered: "flex justify-center items-center fixed inset-0 z-50",

        // Agrega la clase `overlay` para personalizar el fondo oscuro del modal
        overlay: "bg-gray-800 opacity-50",

        // Agrega la clase `content` para personalizar el contenido del modal
        content:
          "bg-white rounded-lg shadow-lg px-6 py-4 max-w-xl w-full max-h-screen overflow-auto",
      },
    },
  },
  plugins: [],
};
