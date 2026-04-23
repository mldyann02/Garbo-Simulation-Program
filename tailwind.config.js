/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    // Color classes that are dynamically generated
    'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-800', 'bg-gray-900',
    'bg-blue-600', 'bg-green-600', 'bg-gray-100',
    'text-white', 'text-gray-700', 'text-gray-600', 'text-gray-400', 'text-gray-800', 'text-gray-900', 'text-gray-200',
    'text-blue-400', 'text-green-400', 'text-red-400', 'text-yellow-400',
    'border-blue-500', 'border-green-500', 'border-yellow-500', 'border-gray-700', 'border-gray-300', 'border-gray-200',
    'hover:bg-blue-700', 'hover:bg-green-700', 'hover:bg-gray-900',
    'focus:ring-blue-500', 'focus:border-blue-500',
  ],
  plugins: [],
}
