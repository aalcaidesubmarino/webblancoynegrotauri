import React from 'react';
import { Sparkles, Clock, MessageCircle, Star, Check } from 'lucide-react';
import { Button, Card, CardContent } from '@repo/ui';

interface TerapiaItem {
  id: string;
  titulo: string;
  duracion: string;
  precio: string;
  descripcion: string;
}

interface TerapiasProps {
  data?: {
    titulo?: string;
    subtitulo?: string;
    contenido?: {
      servicios?: TerapiaItem[];
    };
  };
}

export const Terapias: React.FC<TerapiasProps> = ({ data }) => {
  const titulo = data?.titulo || 'Carta de Terapias Holísticas';
  const subtitulo =
    data?.subtitulo || 'Sesiones individuales en cabina diseñadas para tu equilibrio integral';

  const servicios: TerapiaItem[] = data?.contenido?.servicios || [
    {
      id: 'quiromasaje',
      titulo: 'Quiromasaje Terapéutico & Descontracturante',
      duracion: '60 min',
      precio: '45.00€',
      descripcion:
        'Alivio de sobrecargas y tensiones musculares profundas mediante técnicas manuales y aceites botánicos.',
    },
    {
      id: 'reiki',
      titulo: 'Reiki Tradicional Usui & Alineación de Chakras',
      duracion: '50 min',
      precio: '40.00€',
      descripcion:
        'Canalización de energía vital universal para apaciguar la mente, calmar la ansiedad y restaurar el flujo áurico.',
    },
    {
      id: 'akashicos',
      titulo: 'Lectura de Registros Akáshicos',
      duracion: '75 min',
      precio: '60.00€',
      descripcion:
        'Consulta al libro del alma para comprender patrones repetitivos, bloqueos y encontrar tu camino evolutivo.',
    },
    {
      id: 'fangoterapia',
      titulo: 'Fangoterapia & Masaje Neurosedante',
      duracion: '90 min',
      precio: '65.00€',
      descripcion:
        'Envoltura desintoxicante con barros termales remineralizantes y masaje rítmico con pindas aromáticas.',
    },
  ];

  return (
    <section id="terapias" className="py-16 md:py-24 bg-zen-crema scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zen-bosque-100 text-zen-bosque-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-zen-dorado-500" />
            <span>Cabina Terapéutica en Boiro</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-zen-bosque-900">
            {titulo}
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg">
            {subtitulo}
          </p>
        </div>

        {/* Banner: Experiencia Estrella (Ritual Renacer Zen) */}
        <div className="mb-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-zen-bosque-800 to-zen-bosque-700 text-white p-8 sm:p-12 shadow-2xl border border-zen-dorado-400/30">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-zen-dorado-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zen-dorado-500/20 border border-zen-dorado-400 text-zen-dorado-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Star className="w-3.5 h-3.5 fill-zen-dorado-300 text-zen-dorado-300" />
                <span>Experiencia Estrella</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zen-crema">
                Ritual Renacer Zen (90 minutos)
              </h3>
              <p className="mt-3 text-sm sm:text-base text-stone-200 leading-relaxed">
                Nuestra sesión de inmersión más completa. Combina baño podal tibio con sales del Himalaya, masaje corporal profundo con aceite tibio de hipérico, alineación con cuencos tibetanos y aromaterapia sagrada.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-zen-dorado-300 shrink-0" />
                  <span>Baño de pies aromático relajante</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-zen-dorado-300 shrink-0" />
                  <span>Quiromasaje corporal con aceite botánico</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-zen-dorado-300 shrink-0" />
                  <span>Armonización sonora con cuenco tibetano</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-zen-dorado-300 shrink-0" />
                  <span>Infusión reconfortante final</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <div>
                <span className="text-xs uppercase text-zen-dorado-300 font-medium block">
                  Tarifa de Sesión
                </span>
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white">
                  75,00 €
                </span>
              </div>
              <a
                href="https://wa.me/34600000000?text=Hola%20Pepi,%20quiero%20reservar%20cita%20para%20la%20Experiencia%20Estrella%20(Ritual%20Renacer%20Zen)"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  size="md"
                  variant="dorado"
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                  className="w-full text-sm font-semibold"
                >
                  Reservar Ritual
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Grid de Terapias Individuales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {servicios.map((t) => (
            <Card
              key={t.id}
              hoverEffect
              className="flex flex-col justify-between border-stone-200/80 bg-white p-6"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif font-bold text-xl text-zen-bosque-900 leading-snug">
                    {t.titulo}
                  </h3>
                  <span className="text-xl font-bold font-serif text-zen-bosque-700 shrink-0">
                    {t.precio}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1 mb-3">
                  <Clock className="w-3.5 h-3.5 text-zen-dorado-500" />
                  <span>Duración aproximada: {t.duracion}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {t.descripcion}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-zen-dorado-700 font-medium">
                  Cita previa en cabina · Boiro
                </span>
                <a
                  href={`https://wa.me/34600000000?text=Hola%20Pepi,%20me%20gustar%C3%ADa%20reservar%20cita%20para%20${encodeURIComponent(t.titulo)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<MessageCircle className="w-3.5 h-3.5 text-emerald-600" />}
                  >
                    Pedir Cita
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
