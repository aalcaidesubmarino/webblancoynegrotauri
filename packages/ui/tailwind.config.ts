import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        zen: {
          crema: '#fbf9f5',
          'crema-dark': '#f4efe6',
          bosque: {
            50: '#f2f6f4',
            100: '#e1ebe6',
            200: '#c5d8cf',
            300: '#9dbfb0',
            400: '#6d9e89',
            500: '#3d5a4c', // Verde Bosque Terapéutico Principal
            600: '#324a3e',
            700: '#2d473b',
            800: '#24372e',
            900: '#1b2d25',
          },
          dorado: {
            100: '#f7f2e8',
            200: '#ede1cf',
            300: '#dfc89f', // Dorado Arena
            400: '#cbab75',
            500: '#b5935b', // Bambú Dorado
            600: '#9d7c47',
            700: '#836539',
            800: '#695030',
          },
          terracota: '#c88d7a',
          humo: '#7e827a',
          carbon: '#26292b',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        zen: '0 4px 20px -2px rgba(61, 90, 76, 0.08), 0 2px 6px -1px rgba(61, 90, 76, 0.04)',
        'zen-hover': '0 10px 25px -3px rgba(61, 90, 76, 0.12), 0 4px 10px -2px rgba(61, 90, 76, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
