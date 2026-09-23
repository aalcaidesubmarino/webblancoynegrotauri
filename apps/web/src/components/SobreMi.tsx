import React from 'react';
import { Heart, Sparkles, ShieldCheck, Clock } from 'lucide-react';

interface SobreMiProps {
  data?: {
    titulo?: string;
    subtitulo?: string;
    contenido?: {
      biografia?: string;
      puntosClave?: string[];
      firma?: string;
      cargo?: string;
    };
  };
}

export const SobreMi: React.FC<SobreMiProps> = ({ data }) => {
  const titulo = data?.titulo || 'Sobre Mí — Pepi Clemente';
  const subtitulo =
    data?.subtitulo || 'Terapeuta holística y guía de bienestar consciente en Boiro';
  const biografia =
    data?.contenido?.biografia ||
    'Bienvenidos a Blanco y Negro. Desde hace más de una década acompaño a personas en su camino hacia el alivio de tensiones, la calma mental y el florecimiento interior a través de masajes terapéuticos, armonización energética y la fuerza curativa de la naturaleza.';
  const puntos = data?.contenido?.puntosClave || [
    'Atención individualizada, cercana y sin prisas',
    'Espacio cálido, seguro y acogedor en el centro de Boiro',
    'Minerales y productos seleccionados bajo criterios éticos y sostenibles',
  ];
  const firma = data?.contenido?.firma || 'Pepi Clemente Gómez';
  const cargo = data?.contenido?.cargo || 'Fundadora & Terapeuta Holística';

  return (
    <section id="sobre-mi" className="py-16 md:py-24 bg-white border-y border-stone-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Imagen / Marco Zen */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-zen-crema">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80"
                alt="Pepi Clemente en Blanco y Negro Boiro"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zen-bosque-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-wider text-zen-dorado-300 font-semibold block">
                  Boiro (A Coruña)
                </span>
                <p className="font-serif text-lg font-bold">
                  Blanco y Negro · Rúa Principal, 42
                </p>
              </div>
            </div>

            {/* Elemento flotante decorativo */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-zen-crema p-4 rounded-2xl shadow-zen border border-zen-dorado-300 max-w-xs">
              <Sparkles className="w-8 h-8 text-zen-dorado-500 shrink-0" />
              <p className="text-xs text-stone-700 italic">
                &ldquo;Más de 10 años acompañando el bienestar en A Barbanza&rdquo;
              </p>
            </div>
          </div>

          {/* Texto y Biografía */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest text-zen-dorado-700 font-semibold">
              Vocación & Corazón
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zen-bosque-900 mt-2">
              {titulo}
            </h2>
            <p className="text-base text-zen-bosque-700 font-medium mt-1">
              {subtitulo}
            </p>

            <div className="mt-6 text-stone-600 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{biografia}</p>
              <p>
                Cada sesión en mi cabina es un paréntesis sagrado del ruido diario. Aquí no hay prisas ni protocolos mecánicos: escucho lo que tu cuerpo y tu energía necesitan expresar para diseñar el tratamiento que realmente te devuelva la paz.
              </p>
            </div>

            {/* Puntos Clave */}
            <div className="mt-8 space-y-3">
              {puntos.map((p, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-stone-700">
                  <div className="w-5 h-5 rounded-full bg-zen-bosque-100 flex items-center justify-center shrink-0">
                    <Heart className="w-3 h-3 text-zen-bosque-600" />
                  </div>
                  <span>{p}</span>
                </div>
              ))}
            </div>

            {/* Firma */}
            <div className="mt-10 pt-6 border-t border-stone-100 flex items-center gap-4">
              <div>
                <p className="font-serif font-bold text-lg text-zen-bosque-900">
                  {firma}
                </p>
                <p className="text-xs text-stone-500">{cargo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
