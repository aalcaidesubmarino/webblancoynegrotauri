export interface SeccionSemilla {
  id: string;
  titulo: string;
  subtitulo: string;
  tipoPlantilla: string;
  orden: number;
  activo: boolean;
  contenido: Record<string, any>;
}

export const SECCIONES_WEB_CANONICAS: SeccionSemilla[] = [
  {
    id: 'sec-hero',
    titulo: 'Bienvenido a Blanco y Negro',
    subtitulo: 'Terapias Holísticas, Bienestar Consciente y Tienda Sagrada en Boiro',
    tipoPlantilla: 'hero',
    orden: 1,
    activo: true,
    contenido: {
      tagline: 'Un templo de serenidad y equilibrio en el corazón de Boiro',
      botonTienda: 'Explorar Tienda Holística',
      botonTerapias: 'Ver Carta de Terapias',
      citaInspiracional: 'El cuerpo sana cuando la mente se calma y el alma recuerda su verdadera esencia.',
      enlaceTienda: '#tienda',
      enlaceTerapias: '#terapias',
    },
  },
  {
    id: 'sec-garantias',
    titulo: 'Nuestros Compromisos de Confianza',
    subtitulo: 'Cercanía, autenticidad y cuidado en cada detalle',
    tipoPlantilla: 'garantias',
    orden: 2,
    activo: true,
    contenido: {
      items: [
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
      ],
    },
  },
  {
    id: 'sec-tienda',
    titulo: 'Tienda Holística & Minerales',
    subtitulo: 'Herramientas sagradas y cosmética natural para tu día a día',
    tipoPlantilla: 'tienda',
    orden: 3,
    activo: true,
    contenido: {
      familiasDestacadas: ['minerales', 'aromaterapia', 'velas', 'inciensos', 'quemadores'],
      mensajeAgotado: 'Consúltanos por WhatsApp para encargos o piezas exclusivas.',
      badgeEnvioGratis: 'Envío gratis a partir de 50€',
    },
  },
  {
    id: 'sec-bienestar',
    titulo: 'Propósitos & Bienestares',
    subtitulo: 'Encuentra lo que tu energía necesita cultivar hoy',
    tipoPlantilla: 'bienestar',
    orden: 4,
    activo: true,
    contenido: {
      descripcion: 'Filtra y explora nuestros minerales, sahumerios y esencias según tu intención del momento.',
      categorias: [
        { id: 'calma-ansiedad', nombre: 'Calma & Serenidad', color: '#6A8D73' },
        { id: 'energia-vitalidad', nombre: 'Energía & Vitalidad', color: '#D49B55' },
        { id: 'hogar-sagrado', nombre: 'Hogar Sagrado & Limpieza', color: '#7E827A' },
        { id: 'abundancia-enfoque', nombre: 'Abundancia & Claridad', color: '#B5935B' },
        { id: 'amor-propio', nombre: 'Amor Propio & Armonía', color: '#C88D94' },
        { id: 'proteccion-energetica', nombre: 'Protección Áurica', color: '#3A3F44' },
      ],
    },
  },
  {
    id: 'sec-terapias',
    titulo: 'Carta de Terapias Holísticas',
    subtitulo: 'Sesiones personalizadas en cabina diseñadas para tu equilibrio integral',
    tipoPlantilla: 'terapias',
    orden: 5,
    activo: true,
    contenido: {
      servicios: [
        {
          id: 'quiromasaje',
          titulo: 'Quiromasaje Terapéutico & Descontracturante',
          duracion: '60 min',
          precio: '45.00€',
          descripcion: 'Alivio de sobrecargas y tensiones musculares con aceites botánicos.',
        },
        {
          id: 'reiki',
          titulo: 'Reiki Tradicional Usui & Alineación de Chakras',
          duracion: '50 min',
          precio: '40.00€',
          descripcion: 'Canalización de energía vital para serenar la mente y desbloquear el flujo áurico.',
        },
        {
          id: 'akashicos',
          titulo: 'Lectura de Registros Akáshicos',
          duracion: '75 min',
          precio: '60.00€',
          descripcion: 'Consulta al libro de la memoria del alma para comprender aprendizajes y patrones.',
        },
        {
          id: 'fangoterapia',
          titulo: 'Fangoterapia & Masaje Neurosedante',
          duracion: '90 min',
          precio: '65.00€',
          descripcion: 'Envoltura remineralizante con barros termales y pindas de hierbas relajantes.',
        },
      ],
    },
  },
  {
    id: 'sec-sobre_mi',
    titulo: 'Sobre Mí — Pepi Clemente',
    subtitulo: 'Terapeuta holística y guía de bienestar en Boiro',
    tipoPlantilla: 'sobre_mi',
    orden: 6,
    activo: true,
    contenido: {
      biografia: 'Bienvenido a Blanco y Negro. Desde hace más de una década acompaño a personas en su camino hacia el alivio de tensiones, la calma mental y el florecimiento interior a través de masajes terapéuticos, armonización energética y la fuerza curativa de la naturaleza.',
      puntosClave: [
        'Atención individualizada, cercana y sin prisas',
        'Espacio cálido, seguro y acogedor en el centro de Boiro',
        'Minerales y productos seleccionados bajo criterios éticos y sostenibles',
      ],
      firma: 'Pepi Clemente Gómez',
      cargo: 'Fundadora & Terapeuta Holística',
    },
  },
  {
    id: 'sec-faq',
    titulo: 'Preguntas Frecuentes',
    subtitulo: 'Respuestas claras a tus dudas sobre compras, citas y envíos',
    tipoPlantilla: 'faq',
    orden: 7,
    activo: true,
    contenido: {
      faqs: [
        {
          pregunta: '¿Cómo realizo un pedido en la tienda online?',
          respuesta: 'Selecciona tus productos favoritos, dirígete al carrito y elige recogida física gratis en Boiro o envío rápido a domicilio. Podrás abonarlo cómodamente por Bizum o al recogerlo en tienda.',
        },
        {
          pregunta: '¿Cuánto tiempo tardan los envíos?',
          respuesta: 'Los pedidos se embalan en un plazo máximo de 24 horas laborables y se envían por mensajería urgente, llegando a tu domicilio en 24-48 horas.',
        },
        {
          pregunta: '¿Cómo puedo reservar una sesión de terapia?',
          respuesta: 'Puedes pulsar el botón de reserva en la web o enviarnos un WhatsApp. Coordinaremos contigo el día y hora que mejor te convenga.',
        },
        {
          pregunta: '¿Puedo comprar un vale de regalo para otra persona?',
          respuesta: '¡Por supuesto! Disponemos de vales de regalo canjeables tanto por tratamientos y masajes como por artículos de nuestra tienda.',
        },
      ],
    },
  },
  {
    id: 'sec-footer',
    titulo: 'Blanco y Negro Boiro',
    subtitulo: 'Tu refugio de bienestar en la comarca de A Barbanza',
    tipoPlantilla: 'footer',
    orden: 8,
    activo: true,
    contenido: {
      direccion: 'Rúa Principal, 42 - Bajo, 15930 Boiro (A Coruña)',
      telefono: '+34 600 000 000',
      email: 'contacto@blancoynegro.es',
      horario: 'Lunes a Viernes: 10:00 - 13:30 y 17:00 - 20:30 | Sábados: 10:30 - 14:00',
      avisoLegal: 'Las terapias holísticas y energéticas ofrecidas son prácticas de bienestar complementarias y en ningún caso sustituyen el diagnóstico o tratamiento médico facultativo.',
    },
  },
];
