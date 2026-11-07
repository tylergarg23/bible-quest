"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Crown,
  Flame,
  Gem,
  Lock,
  Medal,
  ScrollText,
  Sparkles,
  Star,
  Trophy,
  X,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { getCurrentPlayer, registerPlayer } from "@/services/player.service";
import {
  getChapterQuestions,
  type QuizQuestion,
} from "@/services/question.service";

/* FECHA DINAMICA POR CAPITULO */
const REFERENCE_DATE = "2026-11-05";
const REFERENCE_CHAPTER = 11;
const TOTAL_CHAPTERS = 28;

function getCurrentChapter(): number {
  const now = new Date();

  // Fecha actual en horario de Perú
  const peruDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const currentDate = Date.parse(`${peruDate}T00:00:00Z`);
  const referenceDate = Date.parse(`${REFERENCE_DATE}T00:00:00Z`);

  const daysPassed = Math.floor(
    (currentDate - referenceDate) / (1000 * 60 * 60 * 24),
  );

  return Math.max(1, Math.min(TOTAL_CHAPTERS, REFERENCE_CHAPTER + daysPassed));
}

const chapterTitles = [
  "La promesa del Padre",
  "Pentecostés",
  "El cojo de la puerta",
  "Pedro y Juan ante el concilio",
  "Ananías y Safira",
  "La elección de los siete",
  "Esteban ante el concilio",
  "La persecución y Felipe",
  "La conversión de Saulo",
  "Pedro y Cornelio",
  "Pedro explica su visión",
  "La liberación de Pedro",
  "El primer viaje misionero",
  "Pablo y Bernabé en Iconio",
  "El concilio de Jerusalén",
  "Pablo y Silas",
  "Pablo en Atenas",
  "Pablo en Corinto",
  "Pablo en Éfeso",
  "El viaje a Jerusalén",
  "Pablo es arrestado",
  "La defensa de Pablo",
  "Pablo ante el concilio",
  "Pablo ante Félix",
  "Pablo ante Festo",
  "Pablo ante Agripa",
  "El naufragio",
  "Pablo llega a Roma",
];

const CURRENT_CHAPTER = getCurrentChapter();

const chapters = chapterTitles.map((title, index) => {
  const number = index + 1;

  return {
    number,
    title,
    status: number <= CURRENT_CHAPTER ? "available" : "locked",
  };
});

const questions = [
  {
    chapter: 1,
    question:
      "¿Qué les prometió Jesús a sus discípulos antes de ascender al cielo?",
    options: [
      "Una corona de oro",
      "El poder del Espíritu Santo",
      "Un nuevo templo",
      "Cuarenta días de ayuno",
    ],
    correct: 1,
    reference: "Hechos 1:8",
    explanation:
      "Recibirían poder cuando el Espíritu Santo viniera sobre ellos, para ser testigos hasta los confines de la tierra.",
  },
  {
    chapter: 1,
    question:
      "¿Cuántos apóstoles se reunieron para elegir al sustituto de Judas?",
    options: ["Once", "Doce", "Ciento veinte", "Cincuenta"],
    correct: 2,
    reference: "Hechos 1:15",
    explanation:
      "Pedro se puso en pie en medio de unos ciento veinte hermanos reunidos.",
  },
  {
    chapter: 1,
    question: "¿Quién fue elegido para ocupar el lugar de Judas?",
    options: ["Bernabé", "Matías", "Esteban", "Silas"],
    correct: 1,
    reference: "Hechos 1:26",
    explanation:
      "Echaron suertes y la elección cayó sobre Matías, quien fue contado con los once apóstoles.",
  },
  {
    chapter: 2,
    question: "¿Qué ocurrió cuando llegó el día de Pentecostés?",
    options: [
      "Cayó maná del cielo",
      "Un fuerte viento llenó la casa",
      "El templo se derrumbó",
      "Apareció una estrella",
    ],
    correct: 1,
    reference: "Hechos 2:2",
    explanation:
      "Vino del cielo un estruendo como de un viento recio que llenó toda la casa donde estaban.",
  },
  {
    chapter: 2,
    question: "¿Qué parecía posarse sobre cada discípulo?",
    options: [
      "Palomas blancas",
      "Lenguas como de fuego",
      "Rayos de luz",
      "Hojas de olivo",
    ],
    correct: 1,
    reference: "Hechos 2:3",
    explanation:
      "Se les aparecieron lenguas repartidas, como de fuego, que se asentaron sobre cada uno de ellos.",
  },
  {
    chapter: 2,
    question: "¿Cuántas personas se añadieron aquel día?",
    options: ["300", "1.000", "3.000", "5.000"],
    correct: 2,
    reference: "Hechos 2:41",
    explanation:
      "Los que recibieron la palabra fueron bautizados, y se añadieron aquel día como tres mil personas.",
  },
  {
    chapter: 3,
    question: "¿A qué hora subían Pedro y Juan al templo?",
    options: [
      "A la hora sexta",
      "A la hora novena",
      "Al amanecer",
      "A medianoche",
    ],
    correct: 1,
    reference: "Hechos 3:1",
    explanation:
      "Subían juntos al templo a la hora novena, la hora de la oración.",
  },
  {
    chapter: 3,
    question: "¿Qué le dijo Pedro al hombre cojo?",
    options: [
      "Corre y sé libre",
      "Oro y plata no tengo",
      "Busca al sacerdote",
      "Levántate mañana",
    ],
    correct: 1,
    reference: "Hechos 3:6",
    explanation:
      "Pedro le dijo: “No tengo plata ni oro, pero lo que tengo te doy: en el nombre de Jesucristo, levántate y anda”.",
  },
  {
    chapter: 3,
    question: "¿Desde cuándo era cojo el hombre sanado?",
    options: [
      "Desde hacía un año",
      "Desde su nacimiento",
      "Desde la guerra",
      "Desde que llegó a Jerusalén",
    ],
    correct: 1,
    reference: "Hechos 3:2",
    explanation:
      "Era un hombre cojo de nacimiento, llevado diariamente a la puerta del templo.",
  },
  {
    chapter: 1,
    question: "¿Qué dijo Jesús que haría mientras los discípulos lo miraban?",
    options: [
      "Volvería en gloria",
      "Se sentaría en el templo",
      "Escribiría una ley",
      "Enviaría un ángel",
    ],
    correct: 0,
    reference: "Hechos 1:11",
    explanation:
      "Los ángeles anunciaron que Jesús volvería de la misma manera que lo habían visto ir al cielo.",
  },
  {
    chapter: 1,
    question: "¿Desde dónde regresaron los discípulos a Jerusalén?",
    options: [
      "Desde Betania",
      "Desde el monte de los Olivos",
      "Desde Galilea",
      "Desde Samaria",
    ],
    correct: 1,
    reference: "Hechos 1:12",
    explanation:
      "Regresaron a Jerusalén desde el monte que se llama del Olivar, cerca de la ciudad.",
  },
  {
    chapter: 2,
    question: "¿Qué idioma hablaban los discípulos por el Espíritu?",
    options: [
      "Solo hebreo",
      "Las maravillas de Dios en otras lenguas",
      "El idioma de los ángeles",
      "Solo griego",
    ],
    correct: 1,
    reference: "Hechos 2:11",
    explanation:
      "Personas de muchas regiones los oían hablar en sus propias lenguas las maravillas de Dios.",
  },
  {
    chapter: 2,
    question: "¿Qué hacían los creyentes con alegría y sencillez de corazón?",
    options: [
      "Ayunaban en secreto",
      "Partían el pan en las casas",
      "Construían una muralla",
      "Viajaban a Roma",
    ],
    correct: 1,
    reference: "Hechos 2:46",
    explanation:
      "Perseveraban unánimes y partían el pan en las casas, alabando a Dios.",
  },
  {
    chapter: 3,
    question: "¿Qué hizo el hombre sanado después de entrar al templo?",
    options: [
      "Se escondió",
      "Saltó y caminó alabando a Dios",
      "Pidió más dinero",
      "Se quedó dormido",
    ],
    correct: 1,
    reference: "Hechos 3:8",
    explanation: "Entró con Pedro y Juan, andando, saltando y alabando a Dios.",
  },
  {
    chapter: 3,
    question: "¿Qué nombre invocó Pedro para la sanidad?",
    options: ["Moisés", "David", "Jesucristo de Nazaret", "Elías"],
    correct: 2,
    reference: "Hechos 3:6",
    explanation: "La sanidad ocurrió en el nombre de Jesucristo de Nazaret.",
  },
  {
    chapter: 12,
    question: "¿Cómo se llamaba la muchacha que reconoció la voz de Pedro?",
    options: ["Rode", "Lidia", "Priscila", "Tabita"],
    correct: 0,
    reference: "Hechos 12:13-14",
    explanation: "Rode reconoció la voz de Pedro en la puerta.",
  },
  {
    chapter: 12,
    question: "¿Qué sucedió a Herodes cuando no dio gloria a Dios?",
    options: [
      "Fue herido por un ángel y murió",
      "Fue enviado a Tarso",
      "Se convirtió en apóstol",
      "Escapó en barco",
    ],
    correct: 0,
    reference: "Hechos 12:21-23",
    explanation: "Un ángel del Señor lo hirió porque no dio la gloria a Dios.",
  },

  // HECHOS 13
  {
    chapter: 13,
    question: "¿A quiénes apartó el Espíritu Santo para la obra misionera?",
    options: [
      "Bernabé y Saulo",
      "Pedro y Juan",
      "Santiago y Andrés",
      "Felipe y Esteban",
    ],
    correct: 0,
    reference: "Hechos 13:2",
    explanation:
      "El Espíritu Santo pidió apartar a Bernabé y Saulo para su obra.",
  },
  {
    chapter: 13,
    question: "¿En qué isla anunciaron la palabra al comienzo del viaje?",
    options: ["Chipre", "Creta", "Malta", "Patmos"],
    correct: 0,
    reference: "Hechos 13:4-5",
    explanation: "Bernabé y Saulo llegaron a Chipre y predicaron en Salamina.",
  },
  {
    chapter: 13,
    question: "¿Qué otro nombre tenía el mago Barjesús?",
    options: ["Elimas", "Apolo", "Silas", "Justo"],
    correct: 0,
    reference: "Hechos 13:6-8",
    explanation: "El mago Barjesús también era llamado Elimas.",
  },
  {
    chapter: 13,
    question: "¿Qué le sucedió temporalmente a Elimas?",
    options: ["Quedó ciego", "Perdió la voz", "Cayó al mar", "Fue encarcelado"],
    correct: 0,
    reference: "Hechos 13:11",
    explanation:
      "Elimas quedó ciego por un tiempo después de oponerse al mensaje.",
  },
  {
    chapter: 13,
    question: "¿Qué anunciaron Pablo y Bernabé a través de Jesús?",
    options: [
      "Perdón de pecados",
      "Riquezas materiales",
      "Un nuevo imperio",
      "El fin de los viajes",
    ],
    correct: 0,
    reference: "Hechos 13:38",
    explanation:
      "Pablo anunció que por Jesús se proclama el perdón de pecados.",
  },

  // HECHOS 14
  {
    chapter: 14,
    question: "¿En qué ciudad creyeron muchos judíos y griegos?",
    options: ["Iconio", "Roma", "Jericó", "Nazaret"],
    correct: 0,
    reference: "Hechos 14:1",
    explanation: "En Iconio, Pablo y Bernabé hablaron y muchos creyeron.",
  },
  {
    chapter: 14,
    question: "¿Qué le sucedía al hombre sanado en Listra desde su nacimiento?",
    options: ["Era cojo", "Era ciego", "Era sordo", "No podía hablar"],
    correct: 0,
    reference: "Hechos 14:8",
    explanation: "El hombre era inválido de los pies desde su nacimiento.",
  },
  {
    chapter: 14,
    question: "¿Cómo llamó la multitud a Bernabé?",
    options: ["Zeus", "Hermes", "Apolo", "Ares"],
    correct: 0,
    reference: "Hechos 14:12",
    explanation: "La multitud llamó Zeus a Bernabé y Hermes a Pablo.",
  },
  {
    chapter: 14,
    question: "¿Qué le ocurrió a Pablo en Listra después de la oposición?",
    options: [
      "Fue apedreado y arrastrado fuera de la ciudad",
      "Fue coronado rey",
      "Lo nombraron sacerdote",
      "Lo enviaron a Egipto",
    ],
    correct: 0,
    reference: "Hechos 14:19",
    explanation:
      "Pablo fue apedreado y lo arrastraron fuera de la ciudad creyéndolo muerto.",
  },
  {
    chapter: 14,
    question: "¿Qué establecieron en cada iglesia durante el regreso?",
    options: ["Ancianos", "Reyes", "Soldados", "Recaudadores"],
    correct: 0,
    reference: "Hechos 14:23",
    explanation: "Designaron ancianos en cada iglesia, orando y ayunando.",
  },

  // HECHOS 15
  {
    chapter: 15,
    question: "¿Qué cuestión provocó discusión en Antioquía?",
    options: [
      "Si los gentiles debían circuncidarse para ser salvos",
      "Dónde construir el templo",
      "Quién debía gobernar Roma",
      "Cuándo viajar a Egipto",
    ],
    correct: 0,
    reference: "Hechos 15:1-2",
    explanation:
      "Algunos enseñaban que la circuncisión era necesaria para la salvación.",
  },
  {
    chapter: 15,
    question: "¿En qué ciudad se reunió el concilio de apóstoles y ancianos?",
    options: ["Jerusalén", "Damasco", "Éfeso", "Corinto"],
    correct: 0,
    reference: "Hechos 15:4-6",
    explanation: "Los apóstoles y ancianos se reunieron en Jerusalén.",
  },
  {
    chapter: 15,
    question:
      "¿Quién explicó que Dios no hizo diferencia al dar el Espíritu Santo a los gentiles?",
    options: ["Pedro", "Herodes", "Félix", "Gamaliel"],
    correct: 0,
    reference: "Hechos 15:7-9",
    explanation:
      "Pedro recordó que Dios purificó por la fe los corazones de los gentiles.",
  },
  {
    chapter: 15,
    question:
      "¿Quién propuso no inquietar a los gentiles que se convertían a Dios?",
    options: ["Santiago", "Judas Iscariote", "Esteban", "Cornelio"],
    correct: 0,
    reference: "Hechos 15:13-19",
    explanation: "Santiago propuso no imponerles cargas innecesarias.",
  },
  {
    chapter: 15,
    question: "¿Con quién partió Pablo después de separarse de Bernabé?",
    options: ["Silas", "Pedro", "Felipe", "Marcos"],
    correct: 0,
    reference: "Hechos 15:39-40",
    explanation:
      "Pablo escogió a Silas y salió encomendado a la gracia del Señor.",
  },

  // HECHOS 16
  {
    chapter: 16,
    question: "¿Qué joven discípulo se unió a Pablo en Listra?",
    options: ["Timoteo", "Tito", "Apolo", "Marcos"],
    correct: 0,
    reference: "Hechos 16:1-3",
    explanation: "Pablo quiso llevar consigo a Timoteo.",
  },
  {
    chapter: 16,
    question: "¿Qué región pidió ayuda en una visión nocturna a Pablo?",
    options: ["Macedonia", "Egipto", "Arabia", "Galacia"],
    correct: 0,
    reference: "Hechos 16:9",
    explanation: "Pablo vio a un varón macedonio que le rogaba ir a ayudarlos.",
  },
  {
    chapter: 16,
    question: "¿Cómo se llamaba la vendedora de púrpura que escuchó a Pablo?",
    options: ["Lidia", "Priscila", "Febe", "Rode"],
    correct: 0,
    reference: "Hechos 16:14",
    explanation: "Lidia, de Tiatira, escuchó y el Señor abrió su corazón.",
  },
  {
    chapter: 16,
    question: "¿Qué hacían Pablo y Silas a medianoche en la cárcel?",
    options: [
      "Oraban y cantaban himnos a Dios",
      "Dormían",
      "Escribían leyes",
      "Planeaban una fuga",
    ],
    correct: 0,
    reference: "Hechos 16:25",
    explanation:
      "Pablo y Silas oraban y cantaban himnos mientras los presos escuchaban.",
  },
  {
    chapter: 16,
    question: "¿Qué preguntó el carcelero de Filipos?",
    options: [
      "¿Qué debo hacer para ser salvo?",
      "¿Dónde está Roma?",
      "¿Quién es el gobernador?",
      "¿Cuánto dinero necesitan?",
    ],
    correct: 0,
    reference: "Hechos 16:30",
    explanation: "El carcelero preguntó cómo podía ser salvo.",
  },

  // HECHOS 17
  {
    chapter: 17,
    question:
      "¿En qué ciudad Pablo razonó en la sinagoga durante tres sábados?",
    options: ["Tesalónica", "Jope", "Cesarea", "Jericó"],
    correct: 0,
    reference: "Hechos 17:1-2",
    explanation: "Pablo discutió con ellos sobre las Escrituras en Tesalónica.",
  },
  {
    chapter: 17,
    question: "¿Qué hacían los de Berea cada día?",
    options: [
      "Examinaban las Escrituras",
      "Construían un altar",
      "Viajaban a Roma",
      "Ayunaban en secreto",
    ],
    correct: 0,
    reference: "Hechos 17:11",
    explanation:
      "Los bereanos examinaban diariamente las Escrituras para comprobar lo oído.",
  },
  {
    chapter: 17,
    question: "¿En qué ciudad vio Pablo muchos ídolos?",
    options: ["Atenas", "Filipos", "Listra", "Tarso"],
    correct: 0,
    reference: "Hechos 17:16",
    explanation:
      "Pablo se indignó al ver la ciudad de Atenas entregada a la idolatría.",
  },
  {
    chapter: 17,
    question: "¿Qué inscripción encontró Pablo en un altar?",
    options: [
      "Al Dios no conocido",
      "Al emperador César",
      "A Moisés",
      "A Zeus vencedor",
    ],
    correct: 0,
    reference: "Hechos 17:23",
    explanation:
      "Pablo usó el altar al Dios no conocido para anunciar al Creador.",
  },
  {
    chapter: 17,
    question: "¿Qué tema provocó burlas entre algunos oyentes en Atenas?",
    options: [
      "La resurrección de los muertos",
      "La creación del mar",
      "La historia de Egipto",
      "La ley romana",
    ],
    correct: 0,
    reference: "Hechos 17:32",
    explanation:
      "Al escuchar sobre la resurrección, algunos se burlaron y otros quisieron oír más.",
  },

  // HECHOS 18
  {
    chapter: 18,
    question: "¿En qué ciudad conoció Pablo a Aquila y Priscila?",
    options: ["Corinto", "Antioquía", "Jope", "Damasco"],
    correct: 0,
    reference: "Hechos 18:1-2",
    explanation: "Pablo encontró en Corinto a Aquila y su esposa Priscila.",
  },
  {
    chapter: 18,
    question: "¿Qué oficio compartían Pablo, Aquila y Priscila?",
    options: [
      "Hacían tiendas",
      "Pescaban",
      "Eran médicos",
      "Trabajaban metales",
    ],
    correct: 0,
    reference: "Hechos 18:3",
    explanation: "Trabajaban juntos porque tenían el oficio de hacer tiendas.",
  },
  {
    chapter: 18,
    question: "¿Qué dijo el Señor a Pablo en una visión nocturna?",
    options: [
      "No temas, sino habla y no calles",
      "Regresa inmediatamente a Tarso",
      "Deja de predicar",
      "Construye un barco",
    ],
    correct: 0,
    reference: "Hechos 18:9",
    explanation: "El Señor animó a Pablo a seguir anunciando la palabra.",
  },
  {
    chapter: 18,
    question:
      "¿Cómo se llamaba el procónsul de Acaya ante quien llevaron a Pablo?",
    options: ["Galión", "Félix", "Festo", "Sergio Paulo"],
    correct: 0,
    reference: "Hechos 18:12",
    explanation: "Los judíos llevaron a Pablo ante el tribunal de Galión.",
  },
  {
    chapter: 18,
    question:
      "¿Quién era el judío elocuente y poderoso en las Escrituras que llegó a Éfeso?",
    options: ["Apolos", "Silas", "Timoteo", "Cornelio"],
    correct: 0,
    reference: "Hechos 18:24",
    explanation:
      "Apolos era natural de Alejandría, elocuente y conocedor de las Escrituras.",
  },

  // HECHOS 19
  {
    chapter: 19,
    question:
      "¿En qué ciudad encontró Pablo a unos discípulos que solo conocían el bautismo de Juan?",
    options: ["Éfeso", "Jerusalén", "Filipos", "Jope"],
    correct: 0,
    reference: "Hechos 19:1-3",
    explanation:
      "En Éfeso Pablo conversó con discípulos acerca del Espíritu Santo.",
  },
  {
    chapter: 19,
    question:
      "¿Cuántos hombres eran aproximadamente los discípulos mencionados al inicio?",
    options: ["Doce", "Siete", "Cincuenta", "Ciento veinte"],
    correct: 0,
    reference: "Hechos 19:7",
    explanation: "Eran en total unos doce hombres.",
  },
  {
    chapter: 19,
    question:
      "¿Durante cuánto tiempo enseñó Pablo diariamente en la escuela de Tiranno?",
    options: ["Dos años", "Dos semanas", "Siete días", "Diez años"],
    correct: 0,
    reference: "Hechos 19:9-10",
    explanation: "Pablo enseñó durante dos años en la escuela de Tiranno.",
  },
  {
    chapter: 19,
    question: "¿Qué hicieron muchos que habían practicado la magia?",
    options: [
      "Quemaron sus libros",
      "Los vendieron en Roma",
      "Los escondieron",
      "Los regalaron a Pablo",
    ],
    correct: 0,
    reference: "Hechos 19:19",
    explanation:
      "Muchos reunieron sus libros de magia y los quemaron públicamente.",
  },
  {
    chapter: 19,
    question:
      "¿Qué artesano provocó un alboroto por el negocio de los templos de Artemisa?",
    options: ["Demetrio", "Aquila", "Apolo", "Crispo"],
    correct: 0,
    reference: "Hechos 19:24-27",
    explanation:
      "Demetrio, platero, reunió a los artesanos por temor a perder su negocio.",
  },

  // HECHOS 20
  {
    chapter: 20,
    question:
      "¿Qué joven cayó desde una ventana del tercer piso mientras Pablo hablaba?",
    options: ["Eutico", "Timoteo", "Tíquico", "Trófimo"],
    correct: 0,
    reference: "Hechos 20:9",
    explanation: "Eutico se durmió y cayó desde el tercer piso.",
  },
  {
    chapter: 20,
    question: "¿Qué hizo Pablo después de bajar a donde estaba Eutico?",
    options: [
      "Se echó sobre él y lo abrazó",
      "Lo dejó allí",
      "Llamó a los soldados",
      "Partió de inmediato",
    ],
    correct: 0,
    reference: "Hechos 20:10",
    explanation: "Pablo lo abrazó y dijo que su vida estaba en él.",
  },
  {
    chapter: 20,
    question:
      "¿Desde qué ciudad llamó Pablo a los ancianos de la iglesia de Éfeso?",
    options: ["Mileto", "Troas", "Roma", "Corinto"],
    correct: 0,
    reference: "Hechos 20:17",
    explanation: "Pablo envió desde Mileto a llamar a los ancianos de Éfeso.",
  },
  {
    chapter: 20,
    question: "¿Qué dijo Pablo que no estimaba preciosa para sí mismo?",
    options: ["Su vida", "Su casa", "Su barco", "Su ciudadanía"],
    correct: 0,
    reference: "Hechos 20:24",
    explanation:
      "Pablo consideraba prioritario acabar su carrera y el ministerio recibido.",
  },
  {
    chapter: 20,
    question: "¿Qué enseñanza de Jesús recordó Pablo sobre dar y recibir?",
    options: [
      "Más bienaventurado es dar que recibir",
      "El que busca encuentra",
      "Pedid y se os dará",
      "La verdad os hará libres",
    ],
    correct: 0,
    reference: "Hechos 20:35",
    explanation: "Pablo recordó que hay mayor dicha en dar que en recibir.",
  },

  // HECHOS 21
  {
    chapter: 21,
    question:
      "¿En qué ciudad encontraron a Felipe el evangelista y se hospedaron con él?",
    options: ["Cesarea", "Roma", "Corinto", "Filipos"],
    correct: 0,
    reference: "Hechos 21:8",
    explanation:
      "Pablo y sus compañeros se alojaron en casa de Felipe en Cesarea.",
  },
  {
    chapter: 21,
    question: "¿Cuántas hijas vírgenes profetizaban tenía Felipe?",
    options: ["Cuatro", "Dos", "Siete", "Doce"],
    correct: 0,
    reference: "Hechos 21:9",
    explanation: "Felipe tenía cuatro hijas que profetizaban.",
  },
  {
    chapter: 21,
    question: "¿Qué hizo Agabo con el cinto de Pablo?",
    options: [
      "Se ató pies y manos",
      "Lo entregó al templo",
      "Lo quemó",
      "Lo escondió",
    ],
    correct: 0,
    reference: "Hechos 21:10-11",
    explanation:
      "Agabo se ató con el cinto para anunciar el arresto de su dueño.",
  },
  {
    chapter: 21,
    question: "¿Qué respondió Pablo a quienes le pedían no ir a Jerusalén?",
    options: [
      "Que estaba dispuesto incluso a morir por el nombre de Jesús",
      "Que regresaría a casa",
      "Que no volvería a predicar",
      "Que se ocultaría en Cesarea",
    ],
    correct: 0,
    reference: "Hechos 21:13",
    explanation:
      "Pablo estaba dispuesto a ser encarcelado e incluso morir por Jesús.",
  },
  {
    chapter: 21,
    question: "¿Dónde fue apresado Pablo tras un tumulto?",
    options: [
      "En Jerusalén, cerca del templo",
      "En Roma",
      "En la sinagoga de Corinto",
      "En el puerto de Troas",
    ],
    correct: 0,
    reference: "Hechos 21:27-33",
    explanation:
      "La multitud lo prendió en el templo y el tribuno romano intervino.",
  },

  // HECHOS 22
  {
    chapter: 22,
    question: "¿En qué ciudad dijo Pablo que había nacido?",
    options: ["Tarso de Cilicia", "Belén", "Cesarea", "Atenas"],
    correct: 0,
    reference: "Hechos 22:3",
    explanation: "Pablo afirmó haber nacido en Tarso de Cilicia.",
  },
  {
    chapter: 22,
    question: "¿A los pies de quién fue instruido Pablo según su defensa?",
    options: ["Gamaliel", "Pedro", "Ananías", "Bernabé"],
    correct: 0,
    reference: "Hechos 22:3",
    explanation: "Pablo había sido educado a los pies de Gamaliel.",
  },
  {
    chapter: 22,
    question: "¿A dónde se dirigía Pablo cuando vio la luz del cielo?",
    options: ["Damasco", "Roma", "Corinto", "Éfeso"],
    correct: 0,
    reference: "Hechos 22:6",
    explanation: "Pablo relató su encuentro con Jesús camino a Damasco.",
  },
  {
    chapter: 22,
    question: "¿Quién dijo a Pablo: Hermano Saulo, recibe la vista?",
    options: ["Ananías", "Silas", "Timoteo", "Felipe"],
    correct: 0,
    reference: "Hechos 22:12-13",
    explanation: "Ananías visitó a Saulo y este recuperó la vista.",
  },
  {
    chapter: 22,
    question: "¿Qué ciudadanía declaró Pablo tener de nacimiento?",
    options: ["Romana", "Griega", "Egipcia", "Siria"],
    correct: 0,
    reference: "Hechos 22:25-28",
    explanation: "Pablo afirmó que era ciudadano romano de nacimiento.",
  },

  // HECHOS 23
  {
    chapter: 23,
    question: "¿Quién ordenó golpear a Pablo en la boca?",
    options: ["El sumo sacerdote Ananías", "Félix", "Festo", "Agripa"],
    correct: 0,
    reference: "Hechos 23:2",
    explanation: "El sumo sacerdote Ananías ordenó que golpearan a Pablo.",
  },
  {
    chapter: 23,
    question: "¿Qué esperanza mencionó Pablo ante el concilio?",
    options: [
      "La resurrección de los muertos",
      "La conquista de Roma",
      "La restauración del templo",
      "El regreso a Tarso",
    ],
    correct: 0,
    reference: "Hechos 23:6",
    explanation:
      "Pablo declaró que era juzgado por la esperanza de la resurrección.",
  },
  {
    chapter: 23,
    question: "¿Qué le dijo el Señor a Pablo la noche siguiente?",
    options: [
      "Ten ánimo; también testificarás en Roma",
      "Regresa a Jerusalén",
      "No vuelvas a predicar",
      "Viaja a Egipto",
    ],
    correct: 0,
    reference: "Hechos 23:11",
    explanation:
      "El Señor animó a Pablo y le anunció que daría testimonio en Roma.",
  },
  {
    chapter: 23,
    question:
      "¿Cuántos hombres aproximadamente juraron no comer hasta matar a Pablo?",
    options: ["Más de cuarenta", "Diez", "Doce", "Veinte"],
    correct: 0,
    reference: "Hechos 23:12-13",
    explanation: "Más de cuarenta hombres conspiraron para matar a Pablo.",
  },
  {
    chapter: 23,
    question: "¿Quién descubrió el complot contra Pablo?",
    options: [
      "El hijo de la hermana de Pablo",
      "Bernabé",
      "Timoteo",
      "Un centurión de Roma",
    ],
    correct: 0,
    reference: "Hechos 23:16",
    explanation: "El sobrino de Pablo oyó la emboscada y avisó.",
  },

  // HECHOS 24
  {
    chapter: 24,
    question: "¿Cómo se llamaba el abogado que acusó a Pablo ante Félix?",
    options: ["Tértulo", "Gamaliel", "Apolos", "Demetrio"],
    correct: 0,
    reference: "Hechos 24:1-2",
    explanation: "Tértulo presentó la acusación contra Pablo.",
  },
  {
    chapter: 24,
    question: "¿Ante qué gobernador defendió Pablo su causa?",
    options: ["Félix", "Festo", "Pilato", "Galión"],
    correct: 0,
    reference: "Hechos 24:10",
    explanation: "Pablo presentó su defensa ante el gobernador Félix.",
  },
  {
    chapter: 24,
    question:
      "¿Qué confesó Pablo que adoraba según el Camino que llamaban secta?",
    options: ["Al Dios de sus padres", "A Artemisa", "Al emperador", "A Zeus"],
    correct: 0,
    reference: "Hechos 24:14",
    explanation:
      "Pablo afirmó que servía al Dios de sus padres y creía en la Ley y los Profetas.",
  },
  {
    chapter: 24,
    question: "¿Sobre qué habló Pablo que hizo temblar a Félix?",
    options: [
      "Justicia, dominio propio y juicio venidero",
      "El comercio de Asia",
      "La guerra de Judea",
      "La construcción del templo",
    ],
    correct: 0,
    reference: "Hechos 24:25",
    explanation: "Pablo habló de justicia, dominio propio y juicio venidero.",
  },
  {
    chapter: 24,
    question:
      "¿Cuánto tiempo pasó antes de que Félix fuera sucedido por Porcio Festo?",
    options: ["Dos años", "Dos días", "Siete meses", "Diez años"],
    correct: 0,
    reference: "Hechos 24:27",
    explanation: "Después de dos años, Félix fue sucedido por Porcio Festo.",
  },

  // HECHOS 25
  {
    chapter: 25,
    question: "¿Quién sucedió a Félix como gobernador?",
    options: ["Porcio Festo", "Galión", "Pilato", "Sergio Paulo"],
    correct: 0,
    reference: "Hechos 25:1",
    explanation: "Festo asumió el gobierno después de Félix.",
  },
  {
    chapter: 25,
    question: "¿Qué pidieron los principales sacerdotes respecto de Pablo?",
    options: [
      "Que lo llevaran a Jerusalén",
      "Que lo enviaran a Egipto",
      "Que lo dejaran libre",
      "Que lo nombraran ciudadano",
    ],
    correct: 0,
    reference: "Hechos 25:2-3",
    explanation:
      "Solicitaron su traslado a Jerusalén mientras planeaban matarlo en el camino.",
  },
  {
    chapter: 25,
    question: "¿Ante quién apeló Pablo?",
    options: ["César", "Herodes", "Gamaliel", "Pedro"],
    correct: 0,
    reference: "Hechos 25:11",
    explanation: "Pablo ejerció su derecho de apelar a César.",
  },
  {
    chapter: 25,
    question: "¿Quién visitó a Festo junto con Berenice?",
    options: [
      "El rey Agripa",
      "El rey David",
      "El sumo sacerdote Caifás",
      "El centurión Cornelio",
    ],
    correct: 0,
    reference: "Hechos 25:13",
    explanation:
      "El rey Agripa y Berenice llegaron a Cesarea para saludar a Festo.",
  },
  {
    chapter: 25,
    question: "¿Qué dificultad tenía Festo al enviar a Pablo?",
    options: [
      "No tenía cargos claros que escribir contra él",
      "No había barcos disponibles",
      "No sabía su nombre",
      "No conocía al emperador",
    ],
    correct: 0,
    reference: "Hechos 25:26-27",
    explanation:
      "Festo buscaba formular cargos concretos para remitir al preso.",
  },

  // HECHOS 26
  {
    chapter: 26,
    question: "¿Ante qué rey presentó Pablo su defensa?",
    options: ["Agripa", "Herodes el Grande", "David", "Saúl"],
    correct: 0,
    reference: "Hechos 26:1",
    explanation: "Agripa autorizó a Pablo a hablar en su defensa.",
  },
  {
    chapter: 26,
    question: "¿Qué grupo religioso dijo Pablo haber seguido desde joven?",
    options: ["Los fariseos", "Los saduceos", "Los esenios", "Los samaritanos"],
    correct: 0,
    reference: "Hechos 26:5",
    explanation:
      "Pablo dijo haber vivido conforme a la secta más estricta: los fariseos.",
  },
  {
    chapter: 26,
    question: "¿Qué le dijo Jesús a Pablo sobre su misión?",
    options: [
      "Abrir los ojos para que se conviertan de las tinieblas a la luz",
      "Construir un templo nuevo",
      "Gobernar Jerusalén",
      "Dejar de hablar con gentiles",
    ],
    correct: 0,
    reference: "Hechos 26:17-18",
    explanation:
      "Jesús lo enviaba a abrir los ojos y anunciar el perdón y la fe.",
  },
  {
    chapter: 26,
    question: "¿Qué declaró Pablo que no había sido a la visión celestial?",
    options: [
      "Desobediente",
      "Indiferente",
      "Temeroso",
      "Contrario a la ley romana",
    ],
    correct: 0,
    reference: "Hechos 26:19",
    explanation: "Pablo afirmó que no fue rebelde a la visión celestial.",
  },
  {
    chapter: 26,
    question: "¿Qué concluyeron Agripa y Festo sobre Pablo?",
    options: [
      "No había hecho nada digno de muerte o prisión",
      "Debía morir inmediatamente",
      "Debía regresar a Tarso",
      "Debía ser nombrado gobernador",
    ],
    correct: 0,
    reference: "Hechos 26:31-32",
    explanation:
      "Concluyeron que no merecía muerte ni prisión, aunque había apelado a César.",
  },

  // HECHOS 27
  {
    chapter: 27,
    question: "¿Cómo se llamaba el centurión encargado de Pablo en el viaje?",
    options: ["Julio", "Cornelio", "Longino", "Claudio"],
    correct: 0,
    reference: "Hechos 27:1",
    explanation: "Pablo fue entregado a un centurión llamado Julio.",
  },
  {
    chapter: 27,
    question: "¿Qué advirtió Pablo sobre continuar navegando?",
    options: [
      "Que el viaje tendría perjuicio y mucha pérdida",
      "Que llegarían antes de tiempo",
      "Que encontrarían tesoros",
      "Que no habría tormenta",
    ],
    correct: 0,
    reference: "Hechos 27:9-10",
    explanation:
      "Pablo advirtió del peligro para la carga, la nave y las vidas.",
  },
  {
    chapter: 27,
    question: "¿Cómo se llamaba el viento tempestuoso que los golpeó?",
    options: ["Euroclidón", "Siroco", "Monzón", "Bóreas"],
    correct: 0,
    reference: "Hechos 27:14",
    explanation: "Un viento huracanado llamado Euroclidón azotó la nave.",
  },
  {
    chapter: 27,
    question: "¿Qué prometió el ángel de Dios a Pablo?",
    options: [
      "Que comparecería ante César y Dios le concedía la vida de quienes navegaban con él",
      "Que la nave no sufriría daños",
      "Que regresarían a Jerusalén",
      "Que llegarían a Egipto",
    ],
    correct: 0,
    reference: "Hechos 27:23-24",
    explanation:
      "El ángel aseguró a Pablo que comparecería ante César y que los demás sobrevivirían.",
  },
  {
    chapter: 27,
    question: "¿Cuántas personas había en la nave?",
    options: ["276", "120", "40", "500"],
    correct: 0,
    reference: "Hechos 27:37",
    explanation: "En la nave iban doscientas setenta y seis personas.",
  },

  // HECHOS 28
  {
    chapter: 28,
    question: "¿Cómo se llamaba la isla a la que llegaron tras el naufragio?",
    options: ["Malta", "Chipre", "Creta", "Patmos"],
    correct: 0,
    reference: "Hechos 28:1",
    explanation: "Al ponerse a salvo supieron que la isla se llamaba Malta.",
  },
  {
    chapter: 28,
    question:
      "¿Qué animal se prendió de la mano de Pablo al echar leña al fuego?",
    options: ["Una víbora", "Un escorpión", "Una araña", "Un lagarto"],
    correct: 0,
    reference: "Hechos 28:3",
    explanation: "Una víbora salió por el calor y se prendió de su mano.",
  },
  {
    chapter: 28,
    question: "¿Qué le ocurrió a Pablo después de sacudirse la víbora?",
    options: ["No sufrió daño", "Cayó muerto", "Perdió la voz", "Tuvo fiebre"],
    correct: 0,
    reference: "Hechos 28:5-6",
    explanation: "Pablo no sufrió daño y los habitantes quedaron sorprendidos.",
  },
  {
    chapter: 28,
    question:
      "¿Cómo se llamaba el principal de la isla que hospedó a los viajeros?",
    options: ["Publio", "Julio", "Félix", "Festo"],
    correct: 0,
    reference: "Hechos 28:7",
    explanation: "Publio recibió y hospedó a los viajeros durante tres días.",
  },
  {
    chapter: 28,
    question: "¿Qué hizo Pablo durante dos años en Roma?",
    options: [
      "Predicó el reino de Dios y enseñó acerca de Jesucristo",
      "Dejó de recibir visitantes",
      "Trabajó como soldado",
      "Regresó a Jerusalén",
    ],
    correct: 0,
    reference: "Hechos 28:30-31",
    explanation:
      "Pablo recibió a quienes acudían y predicó con libertad y sin impedimento.",
  },
];

const animalAvatars = [
  { id: "lion-m", face: "🦁", name: "León", gender: "Masculino" },
  { id: "fox-f", face: "🦊", name: "Zorra", gender: "Femenino" },
  { id: "bear-m", face: "🐻", name: "Oso", gender: "Masculino" },
  { id: "cat-f", face: "🐱", name: "Gatita", gender: "Femenino" },
  { id: "dog-m", face: "🐶", name: "Perrito", gender: "Masculino" },
  { id: "rabbit-f", face: "🐰", name: "Conejita", gender: "Femenino" },
  { id: "panda-m", face: "🐼", name: "Panda", gender: "Masculino" },
  { id: "deer-f", face: "🦌", name: "Ciervita", gender: "Femenino" },
];

const ranking = [
  { name: "María G.", xp: 4200, avatar: "MG" },
  { name: "Samuel R.", xp: 3800, avatar: "SR" },
  { name: "Ana P.", xp: 3500, avatar: "AP" },
  { name: "David L.", xp: 2900, avatar: "DL" },
  { name: "Sara M.", xp: 2400, avatar: "SM" },
];

type ChapterRecord = {
  attempts: number;
  rewarded: number[];
};

type ChapterHistory = Record<number, ChapterRecord>;

type SavedProgress = {
  playerId?: string;
  name?: string;
  avatar?: string;
  xp?: number;
  completed?: number[];
  history?: ChapterHistory;
  historyMigrationStatus?: "legacy" | "ready";
};

function normalizeHistory(data: SavedProgress): {
  history: ChapterHistory;
  migrationStatus: "legacy" | "ready";
} {
  const normalized: ChapterHistory = {};
  const completed = Array.isArray(data.completed) ? data.completed : [];

  const savedHistory = data.history ?? {};

  for (const [chapterKey, record] of Object.entries(savedHistory)) {
    const chapter = Number(chapterKey);

    if (!Number.isInteger(chapter) || chapter < 1 || chapter > 28) {
      continue;
    }

    const attempts = Number.isInteger(record?.attempts)
      ? Math.max(0, Math.min(2, record.attempts))
      : 0;

    const questionCount = questions.filter(
      (question) => question.chapter === chapter,
    ).length;

    const rewarded = Array.isArray(record?.rewarded)
      ? [
          ...new Set(
            record.rewarded.filter(
              (index) =>
                Number.isInteger(index) && index >= 0 && index < questionCount,
            ),
          ),
        ]
      : [];

    normalized[chapter] = { attempts, rewarded };
  }

  let legacyDetected = data.historyMigrationStatus === "legacy";

  for (const chapter of completed) {
    if (!Number.isInteger(chapter) || chapter < 1 || chapter > 28) {
      continue;
    }

    if (!normalized[chapter]) {
      // Registro antiguo: sabemos que el capítulo fue completado,
      // pero no cuántos intentos hizo ni qué preguntas acertó.
      // Lo bloqueamos provisionalmente para evitar XP duplicados.
      normalized[chapter] = {
        attempts: 2,
        rewarded: [],
      };

      legacyDetected = true;
    }
  }

  return {
    history: normalized,
    migrationStatus: legacyDetected ? "legacy" : "ready",
  };
}

type Screen = "welcome" | "home" | "chapters" | "quiz" | "result" | "ranking";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [loadingSession, setLoadingSession] = useState(true);
  const [historyMigrationStatus, setHistoryMigrationStatus] = useState<
    "legacy" | "ready"
  >("ready");
  const [name, setName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [avatar, setAvatar] = useState(animalAvatars[0].id);
  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [activeChapter, setActiveChapter] = useState(2);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [history, setHistory] = useState<ChapterHistory>({});
  const [earnedXp, setEarnedXp] = useState(0);
  const [rewardedThisAttempt, setRewardedThisAttempt] = useState<number[]>([]);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [remoteQuestions, setRemoteQuestions] = useState<QuizQuestion[]>([]);

  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questionsError, setQuestionsError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function restorePlayer() {
      try {
        // 1. Verificar la sesión de Supabase
        const player = await getCurrentPlayer();

        if (cancelled) return;

        if (!player) {
          setScreen("welcome");
          return;
        }

        // 2. Recuperar el progreso local

        const playerStorageKey = `bible-quest-player:${player.id}`;

        let saved = window.localStorage.getItem(playerStorageKey);

        // Compatibilidad con el formato anterior
        if (!saved) {
          const legacy = window.localStorage.getItem("bible-quest-player");

          if (legacy) {
            try {
              const parsed = JSON.parse(legacy) as SavedProgress;

              // Solo podemos asociar automáticamente datos antiguos
              // cuando ya contienen el UUID correcto.
              if (parsed.playerId === player.id) {
                saved = legacy;
                window.localStorage.setItem(playerStorageKey, legacy);
              }
            } catch {
              console.warn("No se pudo interpretar el progreso anterior");
            }
          }
        }

        let localData: SavedProgress = {};

        if (saved) {
          try {
            const parsed: unknown = JSON.parse(saved);

            if (
              parsed !== null &&
              typeof parsed === "object" &&
              !Array.isArray(parsed)
            ) {
              localData = parsed as SavedProgress;
            }
          } catch {
            console.warn("No se pudo interpretar el progreso local");
          }
        }

        // 3. Normalizar el historial
        const normalized = normalizeHistory(localData);

        if (cancelled) return;

        // 4. Restaurar identidad desde Supabase
        setPlayerName(player.name);
        setName(player.name);
        setAvatar(player.avatar);
        setPlayerId(player.id);

        // 5. Restaurar progreso local
        setXp(
          typeof localData.xp === "number" && Number.isFinite(localData.xp)
            ? Math.max(0, localData.xp)
            : 0,
        );

        setCompleted(
          Array.isArray(localData.completed) ? localData.completed : [],
        );

        setHistory(normalized.history);
        setHistoryMigrationStatus(normalized.migrationStatus);

        // 6. Mostrar el dashboard
        setScreen("home");
      } catch (error) {
        console.error("Error al recuperar sesión:", error);

        if (!cancelled) {
          setScreen("welcome");
        }
      } finally {
        // 7. Finalizar la carga, exista o no una sesión
        if (!cancelled) {
          setLoadingSession(false);
        }
      }
    }

    void restorePlayer();

    return () => {
      cancelled = true;
    };
  }, []);

  const chapterQuestions = useMemo(
    () => questions.filter((item) => item.chapter === activeChapter),
    [activeChapter],
  );
  const currentQuestion =
    chapterQuestions[questionIndex % chapterQuestions.length];
  const displayedQuestions = chapterQuestions.length
    ? chapterQuestions
    : questions.slice(0, 3);

  function saveProgress(
    nextName: string,
    nextXp = xp,
    nextCompleted = completed,
    nextAvatar = avatar,
    nextHistory = history,
    nextMigrationStatus = historyMigrationStatus,
    nextPlayerId = playerId,
  ) {
    if (!nextPlayerId) {
      console.warn("No se puede guardar progreso sin UUID");
      return;
    }

    window.localStorage.setItem(
      `bible-quest-player:${nextPlayerId}`,
      JSON.stringify({
        playerId: nextPlayerId,
        name: nextName,
        avatar: nextAvatar,
        xp: nextXp,
        completed: nextCompleted,
        history: nextHistory,
        historyMigrationStatus: nextMigrationStatus,
      }),
    );
  }

  async function startAdventure() {
    const cleanName = name.trim();

    if (cleanName.length < 2 || registering) return;

    setRegistering(true);
    setRegisterError("");

    try {
      const player = await registerPlayer(cleanName, avatar);

      setPlayerId(player.id);
      setPlayerName(player.name);
      setAvatar(player.avatar);

      saveProgress(
        player.name,
        xp,
        completed,
        player.avatar,
        history,
        historyMigrationStatus,
        player.id,
      );

      setScreen("home");
    } catch (error) {
      console.error("Error al registrar jugador:", error);

      setRegisterError(
        error instanceof Error
          ? error.message
          : "No se pudo registrar el jugador.",
      );
    } finally {
      setRegistering(false);
    }
  }

  function beginQuiz(chapter = 2) {
    const attempts = history[chapter]?.attempts ?? 0;

    if (attempts >= 2) return;

    if (!questions.some((q) => q.chapter === chapter)) return;

    setActiveChapter(chapter);
    setQuestionIndex(0);
    setScore(0);
    setEarnedXp(0);
    setRewardedThisAttempt([]);
    setSelected(null);
    setAnswered(false);
    setScreen("quiz");
  }

  function chooseAnswer(index: number) {
    if (answered) return;

    setSelected(index);
    setAnswered(true);

    if (index === currentQuestion.correct) {
      setScore((value) => value + 1);

      const rewarded = history[activeChapter]?.rewarded ?? [];

      if (!rewarded.includes(questionIndex)) {
        const attempts = history[activeChapter]?.attempts ?? 0;

        const reward = attempts === 0 ? 100 : 50;

        setEarnedXp((value) => value + reward);

        setRewardedThisAttempt((value) => [...value, questionIndex]);
      }
    }
  }

  function nextQuestion() {
    if (!answered) return;

    if (questionIndex < displayedQuestions.length - 1) {
      setQuestionIndex((value) => value + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const nextXp = xp + earnedXp;

      const previous = history[activeChapter] ?? {
        attempts: 0,
        rewarded: [],
      };

      const nextHistory: ChapterHistory = {
        ...history,
        [activeChapter]: {
          attempts: previous.attempts + 1,
          rewarded: [
            ...new Set([...previous.rewarded, ...rewardedThisAttempt]),
          ],
        },
      };

      const nextCompleted = completed.includes(activeChapter)
        ? completed
        : [...completed, activeChapter];

      setXp(nextXp);
      setCompleted(nextCompleted);
      setHistory(nextHistory);

      saveProgress(playerName, nextXp, nextCompleted, avatar, nextHistory);

      setScreen("result");
    }
  }

  const progress = Math.round((completed.length / 28) * 100);
  const selectedAvatar =
    animalAvatars.find((item) => item.id === avatar) || animalAvatars[0];

  function selectAvatar(nextAvatar: string) {
    setAvatar(nextAvatar);
    saveProgress(playerName, xp, completed, nextAvatar);
    setEditingAvatar(false);
  }

  // Cargar preguntas remotas para un capítulo específico
  async function loadChapterQuestions(chapterNumber: number) {
    setLoadingQuestions(true);
    setQuestionsError("");
    setRemoteQuestions([]);

    try {
      const questions = await getChapterQuestions(chapterNumber);

      if (questions.length === 0) {
        throw new Error(
          "Este capítulo todavía no tiene preguntas disponibles.",
        );
      }

      setRemoteQuestions(questions);
      return questions;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error al cargar las preguntas.";

      setQuestionsError(message);
      return null;
    } finally {
      setLoadingQuestions(false);
    }
  }

  if (loadingSession) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#172a43] px-6 text-white">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#c59b59] shadow-lg shadow-black/20">
          <ScrollText className="h-11 w-11 text-[#172a43]" />
        </div>

        <h1 className="font-serif text-3xl font-bold tracking-wide">
          BIBLE QUEST
        </h1>

        <p className="mt-3 text-sm text-white/60">
          Preparando tu aventura bíblica...
        </p>

        <div
          role="status"
          aria-label="Cargando sesión del jugador"
          className="mt-8 h-9 w-9 animate-spin rounded-full border-4 border-[#c59b59]/25 border-t-[#c59b59]"
        />
      </main>
    );
  }

  if (screen === "welcome") {
    return (
      <main className="min-h-screen overflow-hidden bg-[#f5f0e6] text-[#172a43]">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row">
          <section className="relative flex flex-1 flex-col justify-between overflow-hidden bg-[#172a43] px-6 py-8 text-white sm:px-12 lg:min-h-screen lg:px-20">
            <div className="absolute -right-20 -top-24 size-80 rounded-full border border-[#c59b59]/25" />
            <div className="absolute -bottom-28 -left-20 size-72 rounded-full border border-[#c59b59]/20" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-xl bg-[#c59b59] text-[#172a43]">
                <ScrollText className="size-6" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">
                BIBLE QUEST
              </span>
            </div>
            <div className="relative z-10 py-14 lg:py-0">
              <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-[#c59b59]">
                <Sparkles className="size-4" /> Tu aventura comienza aquí
              </p>
              <h1 className="max-w-xl font-serif text-5xl font-bold leading-[0.96] sm:text-7xl">
                La Palabra
                <br />
                <span className="text-[#c59b59]">cobra vida.</span>
              </h1>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-white/70">
                Lee un capítulo. Responde el desafío. Crece en tu fe.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3 text-sm text-white/50">
              <BookOpen className="size-4 text-[#c59b59]" /> Un capítulo a la
              vez.
            </div>
          </section>
          <section className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12 lg:px-20">
            <div className="w-full max-w-md">
              <div className="mb-10">
                <p className="mb-3 text-sm font-semibold text-[#b48745]">
                  Bienvenido, explorador
                </p>
                <h2 className="font-serif text-4xl font-bold leading-tight">
                  ¿Cómo te llamamos?
                </h2>
                <p className="mt-3 text-[#657083]">
                  Tu progreso se guardará para tu próxima visita.
                </p>
              </div>
              <label
                className="mb-2 block text-sm font-semibold"
                htmlFor="player-name"
              >
                Tu nombre
              </label>
              <input
                id="player-name"
                value={name}
                maxLength={40}
                disabled={registering}
                onChange={(event) => setName(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.nativeEvent.isComposing &&
                    event.keyCode !== 229
                  )
                    startAdventure();
                }}
                placeholder="Escribe tu nombre"
                className="mb-5 w-full rounded-xl border border-[#d8d0c1] bg-white px-4 py-4 text-base outline-none transition focus:border-[#c59b59] focus:ring-4 focus:ring-[#c59b59]/15"
              />
              <fieldset className="mb-6">
                <legend className="mb-3 text-sm font-semibold">
                  Elige tu avatar
                </legend>
                <div className="grid grid-cols-4 gap-2">
                  {animalAvatars.map((animal) => {
                    const isSelected = avatar === animal.id;
                    return (
                      <button
                        key={animal.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setAvatar(animal.id)}
                        className={`flex aspect-square items-center justify-center rounded-2xl border p-2 text-center transition ${isSelected ? "border-[#c59b59] bg-[#fff8e9] ring-2 ring-[#c59b59]/25" : "border-[#e1d9cb] bg-white hover:border-[#c59b59]/60"}`}
                      >
                        <span className="block text-4xl" aria-hidden="true">
                          {animal.face}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <Button
                onClick={startAdventure}
                disabled={registering || name.trim().length < 2}
                className="h-14 w-full rounded-xl bg-[#c59b59] text-base font-bold text-[#172a43] shadow-lg shadow-[#c59b59]/20 hover:bg-[#d1aa6c] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {registering ? (
                  "Registrando jugador..."
                ) : (
                  <>
                    Comenzar aventura <ArrowRight data-icon="inline-end" />
                  </>
                )}
              </Button>

              {registerError && (
                <p
                  role="alert"
                  className="mt-3 text-center text-sm font-medium text-red-600"
                >
                  {registerError}
                </p>
              )}
              <p className="mt-5 text-center text-xs text-[#89919d]">
                Sin cuenta. Sin complicaciones. Solo tú y la Palabra.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const goHome = () => setScreen("home");
  const nav = (target: Screen) => setScreen(target);

  if (editingAvatar) {
    return (
      <main className="min-h-screen bg-[#f5f0e6] px-5 py-8 text-[#172a43] sm:px-8">
        <div className="mx-auto max-w-2xl">
          <button
            onClick={() => setEditingAvatar(false)}
            className="mb-8 flex items-center gap-2 text-sm font-bold text-[#657083] hover:text-[#172a43]"
          >
            <ArrowLeft className="size-4" /> Volver a mi aventura
          </button>
          <div className="rounded-3xl border border-[#e0d7c8] bg-white p-6 shadow-sm sm:p-10">
            <div className="flex items-center gap-4">
              <div className="grid size-16 place-items-center rounded-2xl bg-[#f7edda] text-4xl">
                {selectedAvatar.face}
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#b48745]">
                  Perfil del explorador
                </p>
                <h1 className="mt-1 font-serif text-3xl font-bold">
                  Cambia tu avatar
                </h1>
                <p className="mt-1 text-sm text-[#657083]">
                  Elige otro rostro animal cuando quieras.
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {animalAvatars.map((animal) => {
                const isSelected = avatar === animal.id;
                return (
                  <button
                    key={animal.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectAvatar(animal.id)}
                    className={`relative flex aspect-square items-center justify-center rounded-2xl border p-3 text-center transition ${isSelected ? "border-[#c59b59] bg-[#fff8e9] ring-2 ring-[#c59b59]/25" : "border-[#e1d9cb] bg-white hover:border-[#c59b59]/60"}`}
                  >
                    <span className="text-5xl" aria-hidden="true">
                      {animal.face}
                    </span>

                    {isSelected && (
                      <Check className="absolute right-2 top-2 size-4 text-[#b48745]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (screen === "quiz") {
    const q = currentQuestion;
    return (
      <main className="min-h-screen bg-[#f5f0e6] text-[#172a43]">
        <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
          <button
            onClick={goHome}
            className="flex items-center gap-2 text-sm font-bold text-[#657083] hover:text-[#172a43]"
          >
            <ArrowLeft className="size-4" /> Salir
          </button>
          <div className="flex items-center gap-2 font-serif font-bold">
            <div className="grid size-8 place-items-center rounded-lg bg-[#172a43] text-[#c59b59]">
              <ScrollText className="size-4" />
            </div>{" "}
            Bible Quest
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-bold shadow-sm">
            <Zap className="size-4 fill-[#c59b59] text-[#c59b59]" /> {xp} XP
          </div>
        </header>
        <div className="mx-auto max-w-2xl px-5 pb-10 pt-8 sm:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#b48745]">
                Hechos · Capítulo {activeChapter}
              </p>
              <h1 className="mt-2 font-serif text-3xl font-bold">
                Desafío bíblico
              </h1>
            </div>
            <span className="font-serif text-2xl font-bold text-[#c59b59]">
              {questionIndex + 1}
              <span className="text-base text-[#9ca3af]">
                {" "}
                / {displayedQuestions.length}
              </span>
            </span>
          </div>
          <div className="mb-9 h-2 overflow-hidden rounded-full bg-[#e2dbce]">
            <div
              className="h-full rounded-full bg-[#c59b59] transition-all"
              style={{
                width: `${((questionIndex + 1) / displayedQuestions.length) * 100}%`,
              }}
            />
          </div>
          <div className="rounded-3xl border border-[#e0d7c8] bg-white p-6 shadow-[0_20px_50px_rgba(23,42,67,0.08)] sm:p-10">
            <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-[#f7edda] text-[#b48745]">
              <BookOpen className="size-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold leading-snug sm:text-3xl">
              {q.question}
            </h2>
            <div className="mt-8 flex flex-col gap-3">
              {q.options.map((option, index) => {
                const isCorrect = index === q.correct;
                const isSelected = index === selected;
                return (
                  <button
                    key={option}
                    onClick={() => chooseAnswer(index)}
                    className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left font-semibold transition ${answered && isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-800" : answered && isSelected ? "border-red-400 bg-red-50 text-red-800" : "border-[#ece6db] bg-[#fdfcf9] hover:border-[#c59b59] hover:bg-[#fffaf0]"}`}
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-xl text-sm font-bold ${answered && isCorrect ? "bg-emerald-500 text-white" : answered && isSelected ? "bg-red-400 text-white" : "bg-[#ebe5d8] text-[#657083]"}`}
                    >
                      {answered && isCorrect ? (
                        <Check className="size-4" />
                      ) : answered && isSelected ? (
                        <X className="size-4" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>
            {answered && (
              <div
                className={`mt-6 rounded-2xl p-4 ${selected === q.correct ? "bg-emerald-50" : "bg-red-50"}`}
              >
                <p
                  className={`font-bold ${selected === q.correct ? "text-emerald-700" : "text-red-700"}`}
                >
                  {selected === q.correct
                    ? (history[activeChapter]?.rewarded ?? []).includes(
                        questionIndex,
                      )
                      ? "¡Respuesta correcta! Ya obtuviste los XP de esta pregunta"
                      : (history[activeChapter]?.attempts ?? 0) === 0
                        ? "¡Respuesta correcta! +100 XP"
                        : "¡Respuesta correcta! +50 XP"
                    : "Sigue explorando"}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#657083]">
                  {q.explanation}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#b48745]">
                  {q.reference}
                </p>
              </div>
            )}
          </div>
          <Button
            disabled={!answered}
            onClick={nextQuestion}
            className="mt-6 h-14 w-full rounded-2xl bg-[#172a43] text-base font-bold text-white hover:bg-[#243c5c] disabled:opacity-40"
          >
            {questionIndex === displayedQuestions.length - 1
              ? "Ver resultados"
              : "Siguiente pregunta"}{" "}
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </main>
    );
  }

  if (screen === "result") {
    const earned = earnedXp;
    return (
      <main className="min-h-screen bg-[#f5f0e6] px-5 py-8 text-[#172a43] sm:px-8">
        <div className="mx-auto max-w-xl">
          <button
            onClick={goHome}
            className="mb-10 flex items-center gap-2 text-sm font-bold text-[#657083]"
          >
            <ArrowLeft className="size-4" /> Volver al inicio
          </button>
          <div className="relative overflow-hidden rounded-3xl bg-[#172a43] px-6 py-12 text-center text-white shadow-xl sm:px-12">
            <div className="absolute left-1/2 top-0 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c59b59]/20" />
            <div className="relative">
              <div className="mx-auto mb-6 grid size-20 place-items-center rounded-full bg-[#c59b59] text-[#172a43] shadow-lg shadow-[#c59b59]/20">
                <Trophy className="size-10" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#c59b59]">
                Capítulo completado
              </p>
              <h1 className="mt-3 font-serif text-4xl font-bold">
                ¡Excelente trabajo!
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-white/65">
                Cada capítulo que lees te acerca más a la historia.
              </p>
              <div className="my-9 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-3xl font-bold text-[#c59b59]">{score}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/55">
                    Correctas
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-3xl font-bold text-[#c59b59]">+{earned}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/55">
                    XP ganados
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
                <p className="flex items-center gap-2 text-sm font-bold text-[#c59b59]">
                  <Sparkles className="size-4" /> Reflexión
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  “Recibiréis poder cuando haya venido sobre vosotros el
                  Espíritu Santo; y me seréis testigos...”
                </p>
                <p className="mt-2 text-xs text-white/45">Hechos 1:8</p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={goHome}
              className="h-13 flex-1 rounded-xl bg-[#c59b59] font-bold text-[#172a43] hover:bg-[#d1aa6c]"
            >
              Volver al inicio
            </Button>
            <Button
              onClick={() => nav("ranking")}
              variant="outline"
              className="h-13 flex-1 rounded-xl border-[#d8d0c1] bg-white font-bold"
            >
              Ver ranking
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (screen === "chapters") {
    return (
      <main className="min-h-screen bg-[#f5f0e6] text-[#172a43]">
        <AppHeader
          name={playerName}
          avatar={avatar}
          xp={xp}
          onHome={goHome}
          onRanking={() => nav("ranking")}
          onEditAvatar={() => setEditingAvatar(true)}
        />
        <div className="mx-auto max-w-5xl px-5 pb-12 pt-8 sm:px-8">
          <button
            onClick={goHome}
            className="mb-7 flex items-center gap-2 text-sm font-bold text-[#657083]"
          >
            <ArrowLeft className="size-4" /> Inicio
          </button>
          <p className="text-sm font-bold uppercase tracking-wider text-[#b48745]">
            Tu mapa de aventura
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold">
            Hechos de los Apóstoles
          </h1>
          <p className="mt-2 text-[#657083]">
            28 capítulos · {completed.length} completados
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {chapters.map((chapter) => (
              <button
                key={chapter.number}
                disabled={
                  chapter.status === "locked" ||
                  (history[chapter.number]?.attempts ?? 0) >= 2
                }
                onClick={() => beginQuiz(chapter.number)}
                className={`group relative flex aspect-square flex-col items-center justify-center rounded-2xl border-2 p-3 text-center transition disabled:cursor-not-allowed disabled:opacity-50 ${chapter.status === "done" ? "border-[#c59b59] bg-[#fffaf0]" : chapter.status === "available" ? "border-[#d8d0c1] bg-white hover:-translate-y-1 hover:border-[#c59b59] hover:shadow-lg" : "border-transparent bg-[#e9e2d5] text-[#9da3aa]"}`}
              >
                {chapter.status === "locked" ? (
                  <Lock className="mb-2 size-5" />
                ) : chapter.status === "done" ? (
                  <Check className="mb-2 size-5 text-[#b48745]" />
                ) : (
                  <BookOpen className="mb-2 size-5 text-[#172a43]" />
                )}
                <span className="font-serif text-2xl font-bold">
                  {chapter.number}
                </span>
                <span className="mt-1 line-clamp-1 text-[10px] font-semibold">
                  {chapter.status === "locked"
                    ? "Bloqueado"
                    : (history[chapter.number]?.attempts ?? 0) >= 2
                      ? "Finalizado"
                      : chapter.title}
                </span>
                {chapter.status === "done" && (
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-[#c59b59]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (screen === "ranking") {
    const playerPosition = 6;
    return (
      <main className="min-h-screen bg-[#f5f0e6] text-[#172a43]">
        <AppHeader
          name={playerName}
          avatar={avatar}
          xp={xp}
          onHome={goHome}
          onRanking={() => nav("ranking")}
          onEditAvatar={() => setEditingAvatar(true)}
        />
        <div className="mx-auto max-w-3xl px-5 pb-12 pt-8 sm:px-8">
          <button
            onClick={goHome}
            className="mb-7 flex items-center gap-2 text-sm font-bold text-[#657083]"
          >
            <ArrowLeft className="size-4" /> Inicio
          </button>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#b48745]">
                Comunidad
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold">Ranking</h1>
            </div>
            <Trophy className="size-10 text-[#c59b59]" />
          </div>
          <div className="mt-8 rounded-3xl border border-[#e0d7c8] bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold">
                Mejores exploradores
              </h2>
              <span className="rounded-full bg-[#f7edda] px-3 py-1 text-xs font-bold text-[#b48745]">
                Semanal
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {ranking.map((player, index) => (
                <div
                  key={player.name}
                  className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-[#fdfaf4]"
                >
                  <span
                    className={`grid size-9 place-items-center rounded-full font-bold ${index === 0 ? "bg-[#f2d58f] text-[#8c661f]" : index === 1 ? "bg-[#e3e7ea] text-[#657083]" : index === 2 ? "bg-[#e8c4a0] text-[#86512e]" : "bg-[#f4f1eb] text-[#657083]"}`}
                  >
                    {index < 3 ? <Medal className="size-4" /> : index + 1}
                  </span>
                  <span className="grid size-10 place-items-center rounded-full bg-[#172a43] text-xs font-bold text-[#c59b59]">
                    {animalAvatars[index % animalAvatars.length].face}
                  </span>
                  <span className="flex-1 font-bold">{player.name}</span>
                  <span className="font-serif font-bold">
                    {player.xp.toLocaleString()}{" "}
                    <span className="font-sans text-xs font-normal text-[#9da3aa]">
                      XP
                    </span>
                  </span>
                </div>
              ))}
              <div className="my-1 border-t border-dashed border-[#e0d7c8]" />
              <div className="flex items-center gap-3 rounded-2xl bg-[#f7edda] p-3">
                <span className="grid size-9 place-items-center font-bold text-[#b48745]">
                  {playerPosition}
                </span>
                <span className="grid size-10 place-items-center rounded-full bg-[#c59b59] text-xs font-bold text-[#172a43]">
                  {playerName.slice(0, 2).toUpperCase()}
                </span>
                <span className="flex-1 font-bold">
                  {playerName}{" "}
                  <span className="ml-1 text-xs font-normal text-[#b48745]">
                    Tú
                  </span>
                </span>
                <span className="font-serif font-bold">
                  {xp.toLocaleString()}{" "}
                  <span className="font-sans text-xs font-normal text-[#9da3aa]">
                    XP
                  </span>
                </span>
              </div>
            </div>
            <p className="mt-5 text-center text-xs text-[#9da3aa]">
              Ranking demostrativo · Conecta tu cuenta para competir con tu
              comunidad.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f0e6] text-[#172a43]">
      <AppHeader
        name={playerName}
        avatar={avatar}
        xp={xp}
        onHome={goHome}
        onRanking={() => nav("ranking")}
        onEditAvatar={() => setEditingAvatar(true)}
      />
      <div className="mx-auto max-w-5xl px-5 pb-12 pt-8 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#b48745]">
              Buen día, {playerName}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">
              Tu aventura continúa.
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-[#e0d7c8] bg-white px-4 py-3">
            <Flame className="size-5 fill-[#d97e49] text-[#d97e49]" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#89919d]">
                Racha
              </p>
              <p className="font-bold">3 días</p>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="relative overflow-hidden rounded-3xl bg-[#172a43] p-6 text-white shadow-lg sm:p-8">
            <div className="absolute -right-12 -top-12 size-48 rounded-full border border-[#c59b59]/20" />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c59b59]">
                    Capítulo del día
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-bold">
                    Hechos 2
                  </h2>
                  <p className="mt-1 text-white/60">Pentecostés</p>
                </div>
                <div className="grid size-14 place-items-center rounded-2xl bg-[#c59b59] text-[#172a43]">
                  <BookOpen className="size-7" />
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between text-sm">
                <span className="text-white/60">Tu progreso de lectura</span>
                <span className="font-bold text-[#c59b59]">
                  {completed.length} de 28
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-[#c59b59]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <Button
                onClick={() => beginQuiz(2)}
                className="mt-7 h-13 w-full rounded-xl bg-[#c59b59] font-bold text-[#172a43] hover:bg-[#d1aa6c]"
                disabled={(history[2]?.attempts ?? 0) >= 2}
              >
                {(history[2]?.attempts ?? 0) >= 2
                  ? "Sin intentos disponibles"
                  : (history[2]?.attempts ?? 0) === 1
                    ? "Iniciar último reintento"
                    : "Iniciar desafío"}{" "}
                <ChevronRight data-icon="inline-end" />
              </Button>
            </div>
          </section>
          <section className="grid grid-cols-2 gap-4">
            <StatCard
              icon={<Zap />}
              label="XP acumulados"
              value={xp.toLocaleString()}
            />
            <StatCard
              icon={<Trophy />}
              label="Capítulos"
              value={`${completed.length} / 28`}
            />
            <div className="col-span-2 flex items-center justify-between rounded-3xl border border-[#e0d7c8] bg-white p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#89919d]">
                  Tu nivel
                </p>
                <p className="mt-1 font-serif text-2xl font-bold">Buscador</p>
              </div>
              <Gem className="size-9 text-[#c59b59]" />
            </div>
          </section>
        </div>
        <div className="mt-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#b48745]">
              Explora la historia
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold">
              Tus capítulos
            </h2>
          </div>
          <button
            onClick={() => nav("chapters")}
            className="flex items-center gap-1 text-sm font-bold text-[#b48745]"
          >
            Ver mapa <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {chapters.slice(0, 6).map((chapter) => (
            <button
              key={chapter.number}
              disabled={
                chapter.status === "locked" ||
                (history[chapter.number]?.attempts ?? 0) >= 2
              }
              onClick={() =>
                chapter.status !== "locked" && beginQuiz(chapter.number)
              }
              className={`rounded-2xl border p-4 text-center transition disabled:cursor-not-allowed disabled:opacity-50 ${chapter.status === "done" ? "border-[#c59b59] bg-[#fffaf0]" : chapter.status === "available" ? "border-[#e0d7c8] bg-white" : "border-transparent bg-[#e9e2d5] text-[#9da3aa]"}`}
            >
              <p className="font-serif text-2xl font-bold">{chapter.number}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wide">
                {chapter.status === "locked"
                  ? "Pronto"
                  : (history[chapter.number]?.attempts ?? 0) >= 2
                    ? "Finalizado"
                    : (history[chapter.number]?.attempts ?? 0) === 1
                      ? "Último intento"
                      : completed.includes(chapter.number)
                        ? "Completado"
                        : "Disponible"}
              </p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

function AppHeader({
  name,
  avatar,
  xp,
  onHome,
  onRanking,
  onEditAvatar,
}: {
  name: string;
  avatar: string;
  xp: number;
  onHome: () => void;
  onRanking: () => void;
  onEditAvatar: () => void;
}) {
  const selectedAvatar =
    animalAvatars.find((item) => item.id === avatar) || animalAvatars[0];
  return (
    <header className="border-b border-[#e6dfd3] bg-[#f5f0e6]/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={onHome}
          className="flex items-center gap-2 font-serif font-bold"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-[#172a43] text-[#c59b59]">
            <ScrollText className="size-5" />
          </span>
          <span className="hidden sm:inline">Bible Quest</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onRanking}
            className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-[#657083] hover:bg-white sm:flex"
          >
            <Trophy className="size-4" /> Ranking
          </button>
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-bold shadow-sm">
            <Zap className="size-4 fill-[#c59b59] text-[#c59b59]" /> {xp} XP
          </div>
          <button
            onClick={onEditAvatar}
            className="grid size-9 place-items-center rounded-full bg-[#c59b59] text-lg transition hover:scale-105 hover:shadow-md"
            title="Editar avatar"
            aria-label={`Editar avatar: ${selectedAvatar.name}`}
          >
            {selectedAvatar.face}
          </button>
        </div>
      </div>
    </header>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-[#e0d7c8] bg-white p-5">
      <div className="mb-6 flex size-10 items-center justify-center rounded-xl bg-[#f7edda] text-[#b48745]">
        {icon}
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-[#89919d]">
        {label}
      </p>
      <p className="mt-1 font-serif text-2xl font-bold">{value}</p>
    </div>
  );
}
