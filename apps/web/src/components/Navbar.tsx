'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles, MessageCircle, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '@repo/ui';

export const Navbar: React.FC = () => {
  const { totalItems, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#tienda', label: 'Tienda' },
    { href: '#bienestares', label: 'Propósitos' },
    { href: '#terapias', label: 'Terapias' },
    { href: '#sobre-mi', label: 'Sobre Mí' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-zen-crema/90 backdrop-blur-md border-b border-zen-dorado-300/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo de la Marca */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-zen-bosque-500 text-white flex items-center justify-center shadow-zen group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-zen-dorado-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-zen-bosque-900 group-hover:text-zen-bosque-600 transition-colors">
              Blanco y Negro
            </span>
            <span className="text-[10px] tracking-widest uppercase text-zen-dorado-700 font-medium">
              Terapias & Tienda · Boiro
            </span>
          </div>
        </Link>

        {/* Enlaces de Navegación Escritorio */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-700 hover:text-zen-bosque-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Acciones Rápidas: Carrito & WhatsApp */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/34600000000?text=Hola%20Pepi,%20tengo%20una%20consulta%20sobre%20Blanco%20y%20Negro"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-full transition-colors border border-emerald-200"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          {/* Botón Carrito con Contador */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-zen-bosque-600 hover:border-zen-bosque-300 transition-all shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-zen-bosque-500/20"
            aria-label="Abrir carrito de compras"
          >
            <ShoppingBag className="w-5 h-5 text-zen-bosque-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-zen-dorado-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow animate-in zoom-in-75">
                {totalItems}
              </span>
            )}
          </button>

          {/* Menú Móvil Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-zen-bosque-600"
            aria-label="Alternar menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zen-crema border-b border-stone-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800 hover:text-zen-bosque-600 border-b border-stone-100"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium shadow"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
