import React from 'react';
import { ArrowRight, Sparkles, MapPin, Heart } from 'lucide-react';
import { Button } from '@repo/ui';

interface HeroProps {
  data?: {
    titulo?: string;
    subtitulo?: string;
    contenido?: {
      tagline?: string;
      botonTienda?: string;
      botonTerapias?: string;
      citaInspiracional?: string;
    };
  };
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const titulo = data?.titulo || 'Bienvenido a Blanco y Negro';
  const subtitulo =
    data?.subtitulo || 'Terapias Holísticas, Bienestar Consciente y Tienda Sagrada en Boiro';
  const tagline =
    data?.contenido?.tagline || 'Un templo de serenidad y equilibrio en el corazón de Boiro';
  const botonTienda = data?.contenido?.botonTienda || 'Explorar Tienda Holística';
  const botonTerapias = data?.contenido?.botonTerapias || 'Ver Carta de Terapias';
  const cita =
    data?.contenido?.citaInspiracional ||
    'El cuerpo sana cuando la mente se calma y el alma recuerda su verdadera esencia.';

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-zen-crema via-zen-crema-dark/40 to-zen-crema">
      {/* Fondo orgánico sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-zen-bosque-100/40 via-zen-dorado-200/30 to-zen-bosque-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Ubicación y Distintivo Boiro */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zen-dorado-100/80 border border-zen-dorado-300 text-zen-bosque-800 text-xs font-medium mb-6 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-zen-dorado-700" />
          <span>Templo de Bienestar en Boiro · Rúa Principal, 42</span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-zen-bosque-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          {titulo}
        </h1>

        {/* Subtítulo & Lema */}
        <p className="mt-5 text-lg sm:text-xl md:text-2xl text-stone-700 font-normal max-w-2xl mx-auto leading-relaxed">
          {subtitulo}
        </p>
        <p className="mt-2 text-sm sm:text-base text-zen-bosque-700 font-medium">
          {tagline}
        </p>

        {/* Botones de Acción Dual */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#tienda">
            <Button
              size="lg"
              variant="zen"
              rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              className="w-full sm:w-auto px-8"
            >
              {botonTienda}
            </Button>
          </a>
          <a href="#terapias">
            <Button
              size="lg"
              variant="outline"
              leftIcon={<Sparkles className="w-4 h-4 mr-1 text-zen-dorado-500" />}
              className="w-full sm:w-auto px-8 bg-white/70"
            >
              {botonTerapias}
            </Button>
          </a>
        </div>

        {/* Cita Inspiracional */}
        <div className="mt-14 max-w-xl mx-auto border-t border-zen-dorado-300/50 pt-6">
          <p className="italic font-serif text-sm sm:text-base text-stone-600">
            &ldquo;{cita}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-zen-dorado-700">
            <Heart className="w-3 h-3 fill-zen-dorado-500 text-zen-dorado-500" />
            <span>Pepi Clemente · Boiro</span>
          </div>
        </div>
      </div>
    </section>
  );
};
