import { getProductosWeb, getSeccionesWeb } from '../lib/get-data';
import { Hero } from '../components/Hero';
import { Garantias } from '../components/Garantias';
import { Tienda } from '../components/Tienda';
import { Bienestares } from '../components/Bienestares';
import { Terapias } from '../components/Terapias';
import { SobreMi } from '../components/SobreMi';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';

export const revalidate = 60; // ISR cada 60 segundos por defecto

export default async function HomePage() {
  const [productos, secciones] = await Promise.all([
    getProductosWeb(),
    getSeccionesWeb(),
  ]);

  return (
    <>
      {/* 1. Hero */}
      <Hero data={secciones['sec-hero']} />

      {/* 2. Barra de Garantías */}
      <Garantias data={secciones['sec-garantias']} />

      {/* 3. Tienda Holística con Datos de Neon */}
      <Tienda
        productos={productos}
        seccionData={secciones['sec-tienda']}
      />

      {/* 4. Propósitos & Bienestares */}
      <Bienestares data={secciones['sec-bienestar']} />

      {/* 5. Carta de Terapias y Experiencia Estrella */}
      <Terapias data={secciones['sec-terapias']} />

      {/* 6. Sobre Mí - Pepi Clemente */}
      <SobreMi data={secciones['sec-sobre_mi']} />

      {/* 7. Preguntas Frecuentes (FAQ) */}
      <FAQ data={secciones['sec-faq']} />

      {/* 8. Footer Informativo y Legal */}
      <Footer data={secciones['sec-footer']} />
    </>
  );
}
