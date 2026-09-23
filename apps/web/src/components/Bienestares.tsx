import React from 'react';
import { Moon, Sun, Home, Coins, Heart, Shield, Sparkles } from 'lucide-react';
import { BIENESTARES_OFICIALES } from '@repo/shared';

interface BienestaresProps {
  data?: {
    titulo?: string;
    subtitulo?: string;
    contenido?: {
      descripcion?: string;
    };
  };
}

export const Bienestares: React.FC<BienestaresProps> = ({ data }) => {
  const titulo = data?.titulo || 'Propósitos & Bienestares';
  const subtitulo = data?.subtitulo || '¿Qué necesita tu energía cultivar hoy?';
  const descripcion =
    data?.contenido?.descripcion ||
    'Filtra y explora nuestros minerales, sahumerios y esencias según tu intención del momento.';

  const getIcon = (icono?: string) => {
    switch (icono) {
      case 'moon':
        return <Moon className="w-6 h-6 text-[#6A8D73]" />;
      case 'sun':
        return <Sun className="w-6 h-6 text-[#D49B55]" />;
      case 'home':
        return <Home className="w-6 h-6 text-[#7E827A]" />;
      case 'coins':
        return <Coins className="w-6 h-6 text-[#B5935B]" />;
      case 'heart':
        return <Heart className="w-6 h-6 text-[#C88D94]" />;
      case 'shield':
        return <Shield className="w-6 h-6 text-[#3A3F44]" />;
      default:
        return <Sparkles className="w-6 h-6 text-zen-bosque-500" />;
    }
  };

  return (
    <section id="bienestares" className="py-16 bg-white border-y border-stone-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-zen-dorado-700 font-semibold">
            Vibración Holística
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zen-bosque-900 mt-2">
            {titulo}
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">{subtitulo}</p>
          <p className="mt-1 text-xs text-stone-500">{descripcion}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BIENESTARES_OFICIALES.map((b) => (
            <div
              key={b.id}
              className="p-6 rounded-2xl bg-zen-crema/70 border border-stone-200/80 hover:bg-zen-crema hover:shadow-zen transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {getIcon(b.icono)}
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg text-zen-bosque-900 group-hover:text-zen-bosque-600 transition-colors">
                    {b.nombre}
                  </h3>
                  {b.subtitulo && (
                    <span className="text-xs text-zen-dorado-700 font-medium block">
                      {b.subtitulo}
                    </span>
                  )}
                </div>
              </div>
              {b.descripcion && (
                <p className="mt-3 text-xs text-stone-600 leading-relaxed pl-1">
                  {b.descripcion}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
