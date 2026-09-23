import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import { Navbar } from '../components/Navbar';
import { CartDrawer } from '../components/CartDrawer';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Blanco y Negro | Terapias Holísticas, Bienestar & Tienda en Boiro',
  description:
    'Templo de serenidad y equilibrio en Boiro (A Coruña). Quiromasaje, Reiki Usui, Registros Akáshicos, gemas naturales, aromaterapia sagrada y velas de soja.',
  keywords: [
    'Blanco y Negro Boiro',
    'Terapias Holísticas Boiro',
    'Quiromasaje Boiro',
    'Reiki Galicia',
    'Minerales y cristales',
    'Pepi Clemente',
    'Tienda esotérica Boiro',
  ],
  authors: [{ name: 'Josefa Clemente Gómez (Pepi)' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-zen-crema text-stone-800 antialiased selection:bg-zen-bosque-500 selection:text-white">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
