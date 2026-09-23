import React from 'react';
import { Truck, Store, Sparkles, MessageCircle } from 'lucide-react';

interface GarantiaItem {
  icono: string;
  titulo: string;
  descripcion: string;
}

interface GarantiasProps {
  data?: {
    titulo?: string;
    subtitulo?: string;
    contenido?: {
      items?: GarantiaItem[];
    };
  };
}

export const Garantias: React.FC<GarantiasProps> = ({ data }) => {
  const items = data?.contenido?.items || [
    {
      icono: 'truck',
      titulo: 'Envíos en 24-48h',
      descripcion: 'Embalaje protegido, ecológico y aromatizado con esencias naturales.',
    },
    {
      icono: 'store',
      titulo: 'Recogida en Boiro',
      descripcion: 'Haz tu pedido online y recógelo gratis en nuestra tienda de Rúa Principal.',
    },
    {
      icono: 'sparkles',
      titulo: '100% Minerales Auténticos',
      descripcion: 'Gemas naturales seleccionadas una a una, limpiadas y energizadas.',
    },
    {
      icono: 'message-circle',
      titulo: 'Asesoría por WhatsApp',
      descripcion: 'Atención cercana y personalizada directamente con Pepi.',
    },
  ];

  const getIcon = (icono: string) => {
    switch (icono) {
      case 'truck':
        return <Truck className="w-6 h-6 text-zen-bosque-600" />;
      case 'store':
        return <Store className="w-6 h-6 text-zen-dorado-600" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-zen-bosque-600" />;
      case 'message-circle':
        return <MessageCircle className="w-6 h-6 text-emerald-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-zen-bosque-600" />;
    }
  };

  return (
    <section className="py-12 bg-white border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-2xl bg-zen-crema/60 border border-stone-200/50 hover:bg-zen-crema transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                {getIcon(item.icono)}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zen-bosque-900 leading-tight">
                  {item.titulo}
                </h4>
                <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                  {item.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
