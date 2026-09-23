'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

interface FAQProps {
  data?: {
    titulo?: string;
    subtitulo?: string;
    contenido?: {
      faqs?: FaqItem[];
    };
  };
}

export const FAQ: React.FC<FAQProps> = ({ data }) => {
  const [abierta, setAbierta] = useState<number | null>(0);

  const titulo = data?.titulo || 'Preguntas Frecuentes';
  const subtitulo =
    data?.subtitulo || 'Respuestas claras a tus dudas sobre compras, citas y envíos';

  const faqs: FaqItem[] = data?.contenido?.faqs || [
    {
      pregunta: '¿Cómo realizo un pedido en la tienda online?',
      respuesta:
        'Selecciona tus productos favoritos pulsando "Añadir". Abre el carrito en la esquina superior y completa el pedido en solo 2 pasos: elige entre recogida gratis en Boiro o envío rápido, e indícanos si prefieres pagar por Bizum o al recoger en tienda.',
    },
    {
      pregunta: '¿Cuánto tiempo tardan los envíos?',
      respuesta:
        'Preparamos cada paquete con mimo en un plazo máximo de 24 horas laborables. Se envían por mensajería urgente a cualquier punto de la península en 24-48 horas con número de seguimiento.',
    },
    {
      pregunta: '¿Cómo reservo una sesión de terapia o quiromasaje?',
      respuesta:
        'Puedes solicitar cita a través del botón de WhatsApp en la sección de terapias o llamándonos por teléfono. Coordinaremos contigo el día y la hora que mejor se adapte a tu ritmo de vida.',
    },
    {
      pregunta: '¿Puedo comprar un vale de regalo para otra persona?',
      respuesta:
        '¡Sí! En nuestra tienda física y online puedes solicitar vales regalo personalizados tanto para masajes y rituales de cabina como para artículos de la tienda. Tienen validez de 1 año y se canjean fácilmente.',
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-zen-crema scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zen-dorado-100 text-zen-dorado-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-zen-dorado-700" />
            <span>Ayuda & Dudas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zen-bosque-900">
            {titulo}
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            {subtitulo}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const estaAbierta = abierta === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200/80 bg-white overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setAbierta(estaAbierta ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors focus:outline-none"
                  aria-expanded={estaAbierta}
                >
                  <span className="font-serif font-semibold text-base sm:text-lg text-zen-bosque-900">
                    {faq.pregunta}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                      estaAbierta ? 'rotate-180 text-zen-bosque-600' : ''
                    }`}
                  />
                </button>
                {estaAbierta && (
                  <div className="px-6 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100 animate-in fade-in duration-200">
                    {faq.respuesta}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
