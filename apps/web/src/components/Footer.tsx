import React from 'react';
import { MapPin, Phone, Mail, Clock, Sparkles } from 'lucide-react';
import { DATOS_NEGOCIO_DEFAULT } from '@repo/shared';

interface FooterProps {
  data?: {
    titulo?: string;
    subtitulo?: string;
    contenido?: {
      direccion?: string;
      telefono?: string;
      email?: string;
      horario?: string;
      avisoLegal?: string;
    };
  };
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const direccion = data?.contenido?.direccion || DATOS_NEGOCIO_DEFAULT.direccion + ', 15930 Boiro (A Coruña)';
  const telefono = data?.contenido?.telefono || DATOS_NEGOCIO_DEFAULT.telefono;
  const email = data?.contenido?.email || DATOS_NEGOCIO_DEFAULT.email;
  const horario =
    data?.contenido?.horario ||
    'Lunes a Viernes: 10:00 - 13:30 y 17:00 - 20:30 | Sábados: 10:30 - 14:00';
  const avisoLegal =
    data?.contenido?.avisoLegal ||
    'Las terapias holísticas y energéticas son complementarias y en ningún caso sustituyen un diagnóstico o tratamiento médico facultativo.';

  return (
    <footer id="contacto" className="bg-zen-bosque-900 text-stone-300 pt-16 pb-12 border-t border-zen-bosque-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zen-bosque-800">
          {/* Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-zen-dorado-500 text-white flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                Blanco y Negro
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Templo holístico y tienda sagrada en Boiro. Quiromasaje, Reiki, gemas naturales y aromaterapia para equilibrar cuerpo, mente y alma.
            </p>
          </div>

          {/* Ubicación y Contacto */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Encuéntranos
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-stone-300">
              <MapPin className="w-4 h-4 text-zen-dorado-400 shrink-0 mt-0.5" />
              <span>{direccion}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-300">
              <Phone className="w-4 h-4 text-zen-dorado-400 shrink-0" />
              <a href={`tel:${telefono.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                {telefono}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-300">
              <Mail className="w-4 h-4 text-zen-dorado-400 shrink-0" />
              <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                {email}
              </a>
            </div>
          </div>

          {/* Horario de Atención */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Horario Tienda
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-stone-300">
              <Clock className="w-4 h-4 text-zen-dorado-400 shrink-0 mt-0.5" />
              <span>{horario}</span>
            </div>
            <p className="text-[11px] text-stone-400 italic">
              * Terapias en cabina con cita previa concertada.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Explorar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#tienda" className="hover:text-zen-dorado-300 transition-colors">
                  Catálogo de Minerales
                </a>
              </li>
              <li>
                <a href="#terapias" className="hover:text-zen-dorado-300 transition-colors">
                  Carta de Masajes & Reiki
                </a>
              </li>
              <li>
                <a href="#bienestares" className="hover:text-zen-dorado-300 transition-colors">
                  Guía de Bienestares
                </a>
              </li>
              <li>
                <a href="#sobre-mi" className="hover:text-zen-dorado-300 transition-colors">
                  Conoce a Pepi Clemente
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Pie Inferior y Aviso Legal Sanitario */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Blanco y Negro · Todos los derechos reservados · Boiro (Galicia)</p>
          <p className="text-[11px] max-w-xl text-center md:text-right text-stone-400">
            {avisoLegal}
          </p>
        </div>
      </div>
    </footer>
  );
};
