export interface BloqueTexto {
  tipo: "parrafo" | "subtitulo" | "cita";
  texto: string;
}

export interface Relacionado {
  titulo: string;
  href: string;
}

export interface Articulo {
  slug: string;
  seccion: string;
  formato: string;
  titulo: string;
  bajada: string;
  autor: string;
  autorIniciales: string;
  autorBio: string;
  fechaISO: string;
  fechaLegible: string;
  cuerpo: BloqueTexto[];
  relacionados: Relacionado[];
}

export const articulos: Articulo[] = [
  {
    slug: "luces-del-parque-distorsion-costera",
    seccion: "ENTREVISTAS",
    formato: "NOTA ESCRITA + PODCAST",
    titulo:
      "“En Rosario los espacios se construyen tocando”: la autogestión de Luces del Parque y su primer disco",
    bajada:
      "El cuarteto de barrio Echesortu presenta ‘Distorsión Costera’. Conversamos con la banda sobre cómo producir música de guitarras limpias en tiempos de algoritmos, el circuito de salas barriales y la necesidad de abrir fechas gratuitas.",
    autor: "Juan Manuel Grisolia y Carmina Monjes",
    autorIniciales: "JG",
    autorBio:
      "Conductor de Amplifica2. Entrevistó a la banda en su sala de ensayo de Echesortu, días antes de la presentación en el Galpón 11.",
    fechaISO: "2026-09-22",
    fechaLegible: "22 de septiembre de 2026",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "La sala de ensayo de Luces del Parque queda a dos cuadras de la vía, en una casa de Echesortu con el living convertido en estudio. Ahí, entre pedaleras y una Gretsch desafinada a propósito, la banda terminó de darle forma a 'Distorsión Costera', su primer disco: ocho canciones de guitarras limpias, bajo en primer plano y letras que hablan de la ciudad desde las esquinas, no desde las plazas.",
      },
      {
        tipo: "subtitulo",
        texto: "Grabar sin sello, tocar sin manager",
      },
      {
        tipo: "parrafo",
        texto:
          "\"Grabamos todo en ocho fines de semana, acá mismo, con un interfaz que nos prestó un amigo\", cuenta Tomás Ibarra, cantante y guitarrista. El disco se mezcló en Buenos Aires a distancia, intercambiando archivos por WeTransfer, y se masterizó con el aporte de una vaquita entre allegados. No hubo sello, ni adelanto, ni plan de prensa: hubo wasap, mates y paciencia.",
      },
      {
        tipo: "parrafo",
        texto:
          "Para la banda, esa autogestión no es una limitación sino una posición: \"Preferimos tardar el doble y que el disco suene como lo pensamos, antes que apurarlo para entrar en un algoritmo que capaz ni nos registra\", dice Martina Ledesma, bajista y la otra voz compositora del grupo.",
      },
      {
        tipo: "cita",
        texto:
          "\"En Rosario los espacios se construyen tocando. Si esperás que te llame una sala, no tocás nunca: hay que generar la fecha, la gente, el sonido, todo.\" — Tomás Ibarra, Luces del Parque",
      },
      {
        tipo: "subtitulo",
        texto: "El circuito de salas barriales",
      },
      {
        tipo: "parrafo",
        texto:
          "La banda reivindica el circuito de centros culturales y galpones que crecieron en los últimos años lejos del circuito tradicional de boliches: Galpón 11, La Vieja Usina, Distrito Siete. \"Son salas que te dan confianza para tocar temas nuevos, nadie te putea si la mezcla no está perfecta\", resume el baterista Franco Díaz.",
      },
      {
        tipo: "parrafo",
        texto:
          "Esa misma lógica los llevó a insistir en que la presentación del disco, este viernes en el Galpón 11, tenga entrada gratuita. \"Queremos que esté lleno de gente que todavía no nos escuchó, no solo de los que ya nos siguen\", explica Ledesma. La apuesta: que la autogestión no termine en el living de ensayo, sino en una sala llena un viernes de primavera.",
      },
    ],
    relacionados: [
      {
        titulo: "Agenda musical de Rosario: toda la semana en vivo",
        href: "/secciones/agenda",
      },
      {
        titulo: "¿Existe todavía el 'sonido Rosario'? — Podcast episodio #04",
        href: "/#multimedia",
      },
    ],
  },
  {
    slug: "fito-paez-el-amor-despues-del-amor",
    seccion: "EFEMÉRIDES",
    formato: "DISCO FUNDAMENTAL",
    titulo:
      "El disco que convirtió las heridas de Fito Páez en himnos: 34 años de ‘El amor después del amor’",
    bajada:
      "El álbum más vendido de la historia del rock nacional y el lazo inquebrantable de Fito con las esquinas rosarinas.",
    autor: "Gregorio Born",
    autorIniciales: "GB",
    autorBio: "Panelista de Amplifica2 especializado en efemérides y archivo del rock nacional.",
    fechaISO: "2026-09-22",
    fechaLegible: "22 de septiembre de 2026",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "El 20 de septiembre de 1992 salía a la calle 'El amor después del amor', el quinto disco de Fito Páez. Nadie en la industria discográfica argentina estaba preparado para lo que iba a pasar: se convertiría en el álbum de rock en español más vendido de la historia, con cifras que todavía hoy nadie termina de contar con exactitud, entre 700 mil y un millón de copias según la fuente.",
      },
      {
        tipo: "subtitulo",
        texto: "Un disco escrito desde el dolor",
      },
      {
        tipo: "parrafo",
        texto:
          "El disco se escribió apenas un año después de la tragedia familiar que marcó la vida de Fito Páez: el asesinato de su abuela y su tía en un robo a su casa de Rosario, en 1991. Ese duelo atraviesa cada canción, aunque el resultado sea, paradójicamente, uno de los discos más luminosos y bailables del pop argentino.",
      },
      {
        tipo: "cita",
        texto:
          "\"Después de esa pérdida, componer era la única forma que tenía de seguir respirando.\" — Fito Páez, en distintas entrevistas sobre el origen del disco",
      },
      {
        tipo: "subtitulo",
        texto: "Rosario en cada esquina",
      },
      {
        tipo: "parrafo",
        texto:
          "Temas como 'Dos días en la vida' o la propia canción que titula el álbum están atravesados por paisajes y nombres de Rosario: el río, las plazas, los boliches de los 80. Para una ciudad que todavía reivindica a Fito como uno de los suyos, el disco funciona como mapa sentimental tanto como como hito discográfico.",
      },
      {
        tipo: "parrafo",
        texto:
          "A 34 años de su edición, 'El amor después del amor' sigue sonando en las radios locales y en las bandejas de los DJs que mezclan rock nacional en las previas de Pichincha. Para la redacción de Amplifica2, es una fecha obligada en el calendario de efemérides: el recordatorio de que el dolor, bien trabajado, también puede convertirse en un himno colectivo.",
      },
    ],
    relacionados: [
      {
        titulo: "Quiénes somos: la redacción de Amplifica2",
        href: "/quienes-somos",
      },
    ],
  },
  {
    slug: "cronica-festival-parque-espana",
    seccion: "COBERTURAS",
    formato: "CRÓNICA EN VIVO",
    titulo:
      "Bailar entre adoquines: crónica del festival autogestivo en las escalinatas del Parque España",
    bajada:
      "Más de 600 personas coparon las gradas frente al río en una tarde que unió cumbia, indie pop y fanzines.",
    autor: "Redacción Amplifica2",
    autorIniciales: "A2",
    autorBio: "Cobertura colectiva realizada por la redacción de Amplifica2 en el lugar del evento.",
    fechaISO: "2026-09-20",
    fechaLegible: "20 de septiembre de 2026",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Las escalinatas del Parque España empezaron a llenarse pasadas las cuatro de la tarde. Para las seis, no quedaba un escalón libre: alrededor de 600 personas, entre pareja mayores con mate, pibes con remera de bandas locales y familias con reposeras, coparon el anfiteatro natural que mira al río para el festival autogestivo organizado por un colectivo de sellos independientes de la ciudad.",
      },
      {
        tipo: "subtitulo",
        texto: "Cumbia, indie pop y una feria de fanzines",
      },
      {
        tipo: "parrafo",
        texto:
          "El cartel combinó a propósito géneros que rara vez compartan escenario en Rosario: abrió un trío de cumbia experimental, siguió una banda de indie pop con teclados ochentosos y cerró un DJ set que mezcló chamamé con electrónica. En el borde de las escalinatas, una feria de fanzines y discos de pequeños sellos locales funcionó como la otra mitad del evento.",
      },
      {
        tipo: "cita",
        texto:
          "\"La idea era que se cruce gente que nunca comparte pista. Lo lográs si el cartel es raro a propósito.\" — una de las organizadoras del festival",
      },
      {
        tipo: "parrafo",
        texto:
          "No hubo vallas ni control de acceso: la propuesta fue explícitamente a la gorra, con una lata circulando entre el público para sostener el cachet de las bandas y los costos de sonido. Según los organizadores, se recaudó lo suficiente para cubrir gastos y dejar un pequeño excedente para la próxima edición.",
      },
      {
        tipo: "parrafo",
        texto:
          "Con el sol cayendo sobre el río Paraná, el festival terminó con buena parte del público bailando descalzo sobre los adoquines. Para la escena autogestiva rosarina, fue una muestra más de que los grandes eventos no necesitan grandes presupuestos: necesitan ganas, un buen cartel y una lata que circule.",
      },
    ],
    relacionados: [
      {
        titulo: "Agenda musical de Rosario: toda la semana en vivo",
        href: "/secciones/agenda",
      },
    ],
  },
];
