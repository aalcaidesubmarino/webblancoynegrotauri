'use client';

import React, { useState, useMemo } from 'react';
import { ShoppingBag, Sparkles, Filter, Check, MessageCircle } from 'lucide-react';
import { ProductoWebItem } from '../lib/get-data';
import { useCart } from '../context/CartContext';
import { Button, Badge, Card, CardContent } from '@repo/ui';
import { formatEuro } from '@repo/shared';

interface TiendaProps {
  productos: ProductoWebItem[];
  seccionData?: {
    titulo?: string;
    subtitulo?: string;
    contenido?: {
      mensajeAgotado?: string;
      badgeEnvioGratis?: string;
    };
  };
}

const CATEGORIAS_FILTRO = [
  { id: 'todos', label: 'Todos' },
  { id: 'minerales', label: 'Minerales' },
  { id: 'aromaterapia', label: 'Aromaterapia' },
  { id: 'velas', label: 'Velas' },
  { id: 'inciensos', label: 'Inciensos & Sahumos' },
  { id: 'quemadores', label: 'Quemadores' },
];

export const Tienda: React.FC<TiendaProps> = ({ productos, seccionData }) => {
  const { addItem } = useCart();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [agregadoReciente, setAgregadoReciente] = useState<string | null>(null);

  const titulo = seccionData?.titulo || 'Tienda Holística & Minerales';
  const subtitulo =
    seccionData?.subtitulo ||
    'Herramientas sagradas, gemas naturales y aromaterapia para tu espacio';
  const envioGratisBadge =
    seccionData?.contenido?.badgeEnvioGratis || 'Envío gratis a partir de 50€';

  const productosFiltrados = useMemo(() => {
    if (categoriaSeleccionada === 'todos') {
      return productos.filter((p) => !p.esServicio);
    }
    return productos.filter(
      (p) => !p.esServicio && (p.categoria === categoriaSeleccionada || p.familiaId === categoriaSeleccionada)
    );
  }, [productos, categoriaSeleccionada]);

  const handleAgregar = (prod: ProductoWebItem) => {
    addItem({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precioVenta,
      imagenUrl: prod.imagenUrl,
      categoria: prod.categoria,
      ref: prod.ref,
    });

    setAgregadoReciente(prod.id);
    setTimeout(() => {
      setAgregadoReciente(null);
    }, 1500);
  };

  return (
    <section id="tienda" className="py-16 md:py-24 bg-zen-crema scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zen-bosque-50 border border-zen-bosque-200 text-zen-bosque-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-zen-dorado-500" />
              <span>Catálogo Oficial</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zen-bosque-900">
              {titulo}
            </h2>
            <p className="mt-2 text-base text-stone-600 max-w-xl">
              {subtitulo}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zen-dorado-100 text-zen-dorado-800 text-xs font-medium border border-zen-dorado-300 self-start md:self-auto">
            <span>{envioGratisBadge}</span>
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Filter className="w-4 h-4 text-stone-400 shrink-0 mr-1" />
          {CATEGORIAS_FILTRO.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                categoriaSeleccionada === cat.id
                  ? 'bg-zen-bosque-500 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de Productos */}
        {productosFiltrados.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300">
            <p className="text-stone-500 text-sm">
              No hay productos disponibles en esta categoría en este momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {productosFiltrados.map((prod) => (
              <Card
                key={prod.id}
                hoverEffect
                className="flex flex-col justify-between group h-full border-stone-200/80 bg-white"
              >
                <div>
                  {/* Contenedor de Imagen */}
                  <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                    {prod.imagenUrl ? (
                      <img
                        src={prod.imagenUrl}
                        alt={prod.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-50">
                        <Sparkles className="w-10 h-10 opacity-30" />
                      </div>
                    )}

                    {/* Etiquetas Superiores */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {prod.destacado && (
                        <Badge variant="dorado" size="sm" className="shadow-sm">
                          {prod.destacado}
                        </Badge>
                      )}
                      {prod.categoriaLabel && (
                        <Badge variant="neutral" size="sm" className="bg-white/90 backdrop-blur-sm">
                          {prod.categoriaLabel}
                        </Badge>
                      )}
                    </div>

                    {/* Indicador de Stock */}
                    <div className="absolute bottom-3 right-3">
                      {prod.stockActual > 0 ? (
                        <span className="text-[11px] font-medium bg-emerald-50/90 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200 shadow-sm backdrop-blur-sm">
                          {prod.stockActual <= 3 ? `¡Solo ${prod.stockActual}! Quedan pocas` : 'En Stock'}
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium bg-rose-50/90 text-rose-700 px-2 py-0.5 rounded-md border border-rose-200 shadow-sm backdrop-blur-sm">
                          Bajo Encargo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Datos del Producto */}
                  <CardContent className="pt-4 pb-2">
                    <h3 className="font-serif font-semibold text-lg text-zen-bosque-900 group-hover:text-zen-bosque-600 transition-colors leading-snug">
                      {prod.nombre}
                    </h3>
                    {prod.descripcionCorta && (
                      <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {prod.descripcionCorta}
                      </p>
                    )}
                  </CardContent>
                </div>

                {/* Pie con Precios y Botón de Compra */}
                <div className="px-6 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold font-serif text-zen-bosque-900">
                        {formatEuro(prod.precioVenta)}
                      </span>
                      {prod.precioAnterior && prod.precioAnterior > prod.precioVenta && (
                        <span className="text-xs text-stone-400 line-through">
                          {formatEuro(prod.precioAnterior)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-stone-400">IVA incluido</span>
                  </div>

                  {prod.stockActual > 0 ? (
                    <Button
                      size="sm"
                      variant="zen"
                      onClick={() => handleAgregar(prod)}
                      leftIcon={
                        agregadoReciente === prod.id ? (
                          <Check className="w-4 h-4 text-emerald-300" />
                        ) : (
                          <ShoppingBag className="w-4 h-4" />
                        )
                      }
                      className={agregadoReciente === prod.id ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                    >
                      {agregadoReciente === prod.id ? '¡Añadido!' : 'Añadir'}
                    </Button>
                  ) : (
                    <a
                      href={`https://wa.me/34600000000?text=Hola%20Pepi,%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(prod.nombre)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<MessageCircle className="w-3.5 h-3.5 text-emerald-600" />}
                        className="text-xs"
                      >
                        Encargar
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
