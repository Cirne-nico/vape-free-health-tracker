export interface HerculaWork {
  id: string;
  title: string;
  description: string;
  days: number;
  icon: string;
  challenge: string;
  reward: string;
  nikotisInfluence: string;
  herculaResponse: string;
}

export const herculaWorks: HerculaWork[] = [
  {
    id: 'smoke_thousand_faces',
    title: 'El Humo de las Mil Caras',
    description: 'Superar la ilusión del alivio inmediato',
    days: 1,
    icon: '🌫️',
    challenge: 'Como una hidra de humo que toma mil formas: ansiedad, aburrimiento, placer, tristeza. Cada cara derrotada revela la siguiente.',
    reward: 'Reconocimiento de patrones de autoengaño',
    nikotisInfluence: 'Nikotis susurra: "Solo necesitas una calada para sentirte mejor"',
    herculaResponse: 'Hércula observa: "Las formas del humo cambian, pero el viento las dispersa igual"'
  },
  {
    id: 'routine_lion',
    title: 'El León de la Rutina',
    description: 'Romper el hábito diario automatizado',
    days: 3,
    icon: '🦁',
    challenge: 'Una bestia que duerme al pie del escritorio, rugiendo cada vez que se enciende el móvil o se termina el café.',
    reward: 'Libertad de automatismos condicionados',
    nikotisInfluence: 'Nikotis ruge: "Tu rutina está incompleta sin mí"',
    herculaResponse: 'Hércula camina: "Los caminos se abren cuando dejamos de seguir las huellas de ayer"'
  },
  {
    id: 'empty_hands_cave',
    title: 'La Cueva de las Manos Vacías',
    description: 'Resistir la necesidad física de tener algo entre los dedos',
    days: 5,
    icon: '🕳️',
    challenge: 'Hércula atraviesa un túnel de eco y ansiedad donde sus manos tiemblan y buscan sin encontrar.',
    reward: 'Reconexión con la sensibilidad táctil natural',
    nikotisInfluence: 'Nikotis murmura: "Tus manos están vacías, como tu vida sin mí"',
    herculaResponse: 'Hércula siente: "Las manos vacías pueden sentir el mundo entero"'
  },
  {
    id: 'first_monday_swamp',
    title: 'El Pantano del Primer Lunes',
    description: 'Superar el primer día laboral sin vapear',
    days: 7,
    icon: '🌊',
    challenge: 'Ciénaga emocional y nerviosa donde los pies se hunden y la voluntad resbala.',
    reward: 'Demostración de que el trabajo es posible sin nicotina',
    nikotisInfluence: 'Nikotis grita: "No podrás concentrarte ni rendir sin mí"',
    herculaResponse: 'Hércula avanza: "Cada paso en el lodo enseña dónde está el suelo firme"'
  },
  {
    id: 'insomnia_serpent',
    title: 'La Serpiente del Insomnio',
    description: 'Dormir sin la falsa calma del vapeo nocturno',
    days: 10,
    icon: '🐍',
    challenge: 'Una serpiente silenciosa que se enrosca en el pecho, susurrando que una calada devolverá el sueño.',
    reward: 'Recuperación del sueño natural y reparador',
    nikotisInfluence: 'Nikotis sisea: "Sin mí, nunca volverás a dormir tranquilo"',
    herculaResponse: 'Hércula se acuesta: "El sueño llega cuando el cuerpo recuerda sus propios ritmos"'
  },
  {
    id: 'gray_days_mirror',
    title: 'El Espejo de los Días Grises',
    description: 'Aceptar el bajón de serotonina sin retroceder',
    days: 14,
    icon: '🪞',
    challenge: 'Un espejo que distorsiona la luz del día: todo parece más aburrido, más lento, más inútil. Pero hay que atravesarlo.',
    reward: 'Comprensión de que la tristeza es temporal y adaptativa',
    nikotisInfluence: 'Nikotis refleja: "Mira qué gris es tu vida sin mí"',
    herculaResponse: 'Hércula mira: "Los espejos empañados también se aclaran con el tiempo"'
  },
  {
    id: 'celebrations_island',
    title: 'La Isla de las Celebraciones',
    description: 'No recaer durante una fiesta, cumpleaños o celebración',
    days: 21,
    icon: '🎉',
    challenge: 'Un lugar lleno de música y brindis, donde Nikotis aparece disfrazado de nostalgia y alegría.',
    reward: 'Capacidad de celebrar sin necesidad de sustancias',
    nikotisInfluence: 'Nikotis canta: "Las fiestas no son lo mismo sin mí"',
    herculaResponse: 'Hércula baila: "La música suena igual, solo cambia quien escucha"'
  },
  {
    id: 'anxiety_bridge',
    title: 'El Puente de la Ansiedad',
    description: 'Soportar una crisis sin usar el vapeo como anestesia',
    days: 30,
    icon: '🌉',
    challenge: 'Un puente tambaleante entre dos acantilados emocionales. Solo se puede cruzar respirando profundo.',
    reward: 'Desarrollo de herramientas genuinas de autorregulación',
    nikotisInfluence: 'Nikotis amenaza: "Caerás al vacío sin mi apoyo"',
    herculaResponse: 'Hércula cruza: "Los puentes se sostienen paso a paso, no todos a la vez"'
  },
  {
    id: 'judgment_crows',
    title: 'Los Cuervos del Juicio Interno',
    description: 'Superar la autocrítica que susurra: "Vas a fracasar"',
    days: 40,
    icon: '🐦‍⬛',
    challenge: 'Bandadas negras que graznan dudas sobre el hombro. El reto: no combatirlas, sino dejarlas pasar.',
    reward: 'Liberación de la autocrítica destructiva',
    nikotisInfluence: 'Nikotis grazna: "Eres débil, siempre lo has sido"',
    herculaResponse: 'Hércula escucha: "Los cuervos vuelan, pero el cielo permanece"'
  },
  {
    id: 'comparison_mountain',
    title: 'La Montaña de la Comparación',
    description: 'Evitar juzgar a quienes sí consumen',
    days: 50,
    icon: '⛰️',
    challenge: 'Un pico brumoso donde la voz de Nikotis murmura: "Otros lo manejan, tú también podrías."',
    reward: 'Aceptación de que cada camino es único',
    nikotisInfluence: 'Nikotis compara: "Mira cómo otros disfrutan lo que tú te niegas"',
    herculaResponse: 'Hércula asciende: "Cada montaña tiene su propia cumbre"'
  },
  {
    id: 'small_excuses_lake',
    title: 'El Lago de las Pequeñas Excusas',
    description: 'No caer en la trampa del "solo una vez más"',
    days: 60,
    icon: '🏞️',
    challenge: 'Cada gota del lago es una excusa racionalizada: "Hoy tuve un mal día", "lo controlo", "solo por esta vez".',
    reward: 'Claridad mental para reconocer trampas cognitivas',
    nikotisInfluence: 'Nikotis gotea: "Solo una vez no hará daño"',
    herculaResponse: 'Hércula bordea: "Las gotas forman lagos, los lagos forman océanos"'
  },
  {
    id: 'slow_time_guardian',
    title: 'El Guardián del Tiempo Lento',
    description: 'Soportar la lentitud del cambio',
    days: 75,
    icon: '⏳',
    challenge: 'Un gigante que arrastra los minutos y desafía a Hércula a mantener el rumbo incluso cuando nada parece mejorar.',
    reward: 'Paciencia y confianza en los procesos naturales',
    nikotisInfluence: 'Nikotis ralentiza: "Esta lluvia nunca parará sin mí"',
    herculaResponse: 'Hércula espera: "Los robles crecen lento, pero duran siglos"'
  },
  {
    id: 'lost_lungs_treasure',
    title: 'El Tesoro de los Pulmones Perdidos',
    description: 'Recuperar la salud sin buscarla obsesivamente',
    days: 90,
    icon: '💎',
    challenge: 'Una cámara sellada que solo se puede abrir cuando uno deja de correr tras los beneficios y camina a través del proceso.',
    reward: 'Recuperación completa de la función respiratoria',
    nikotisInfluence: 'Nikotis esconde: "Nunca recuperarás lo que perdiste"',
    herculaResponse: 'Hércula respira: "Los tesoros aparecen cuando dejamos de buscarlos"'
  },
  {
    id: 'old_altar_voices',
    title: 'Las Voces del Antiguo Altar',
    description: 'Cerrar el ciclo simbólico con la figura del vapeo',
    days: 120,
    icon: '🏛️',
    challenge: 'Un altar donde Nikotis era un dios protector. Hércula lo contempla una última vez antes de derribarlo.',
    reward: 'Cierre simbólico y emocional del ciclo adictivo',
    nikotisInfluence: 'Nikotis implora: "Yo era tu refugio, tu consuelo, tu compañía"',
    herculaResponse: 'Hércula contempla: "Los altares cambian, pero quien reza permanece"'
  },
  {
    id: 'flower_that_smells_again',
    title: 'La Flor que Vuelve a Oler',
    description: 'Reconectar con placeres simples: el cuerpo, la piel, la respiración',
    days: 150,
    icon: '🌸',
    challenge: 'Un momento suave, sin heroísmo ni lucha. Solo disfrute: la señal de que una nueva mitología ha comenzado.',
    reward: 'Reconexión plena con los sentidos y placeres naturales',
    nikotisInfluence: 'Nikotis se desvanece: "Ya no me necesitas..."',
    herculaResponse: 'Hércula huele: "Las flores siempre estuvieron ahí, esperando"'
  },
  {
    id: 'sweet_memory_eclipse',
    title: 'El Eclipse del Dulce Recuerdo',
    description: 'Aceptar que hay recuerdos vinculados al vapeo sin querer revivirlos',
    days: 180,
    icon: '🌑',
    challenge: 'El cielo se oscurece cuando evocamos ciertos momentos. Hércula aprende a recordarlos sin recrearlos.',
    reward: 'Integración saludable de la historia personal',
    nikotisInfluence: 'Nikotis nostálgico: "Recuerda los buenos momentos que compartimos"',
    herculaResponse: 'Hércula recuerda: "Los eclipses pasan, pero la luna permanece"'
  },
  {
    id: 'temptations_market',
    title: 'El Mercado de las Tentaciones',
    description: 'Resistir las ofertas, las tiendas, los estímulos externos',
    days: 210,
    icon: '🏪',
    challenge: 'Un mercado ruidoso donde colores y sabores prometen felicidad instantánea. Pero son solo humo y gasto.',
    reward: 'Inmunidad ante los estímulos comerciales de la industria',
    nikotisInfluence: 'Nikotis vende: "Nuevos sabores, nuevas experiencias te esperan"',
    herculaResponse: 'Hércula camina: "Los mercados gritan, pero el bolsillo decide"'
  },
  {
    id: 'social_silence_bell',
    title: 'La Campana del Silencio Social',
    description: 'No sentirse fuera de lugar en un grupo donde la gente vapea',
    days: 240,
    icon: '🔔',
    challenge: 'Una campana de cristal aísla a Hércula del grupo. Su tarea: no romperla, sino hacerla transparente.',
    reward: 'Confianza social sin necesidad de conformidad',
    nikotisInfluence: 'Nikotis aísla: "Estás sola, diferente, excluida"',
    herculaResponse: 'Hércula convive: "El cristal separa, pero también deja ver"'
  },
  {
    id: 'past_relapses_wall',
    title: 'El Muro de las Recaídas Pasadas',
    description: 'No usar errores antiguos como profecía de fracaso',
    days: 270,
    icon: '🧱',
    challenge: 'Un muro tallado con las fechas de cada caída. Hércula lo atraviesa sin mirar atrás.',
    reward: 'Liberación del peso de los errores pasados',
    nikotisInfluence: 'Nikotis recuerda: "Has fallado antes, fallarás de nuevo"',
    herculaResponse: 'Hércula pasa: "Los muros se construyeron para ser cruzados"'
  },
  {
    id: 'impatience_rain',
    title: 'La Lluvia de la Impaciencia',
    description: 'Aceptar los altibajos sin buscar alivio inmediato',
    days: 300,
    icon: '🌧️',
    challenge: 'Lluvia persistente, ni tormenta, ni sol. Caminas mojado, pero caminas.',
    reward: 'Tolerancia a la incomodidad y paciencia con los procesos',
    nikotisInfluence: 'Nikotis empapa: "Esta lluvia nunca parará sin mí"',
    herculaResponse: 'Hércula se moja: "La lluvia moja a todos por igual"'
  },
  {
    id: 'autonomy_tower',
    title: 'La Torre de la Autonomía',
    description: 'Reconstruir la noción de autocuidado sin sustancias',
    days: 330,
    icon: '🗼',
    challenge: 'Piso a piso, Hércula asciende. Cada escalón es una nueva práctica: música, paseo, abrazo, escritura.',
    reward: 'Sistema completo de autocuidado genuino',
    nikotisInfluence: 'Nikotis desde abajo: "Nunca llegarás a la cima sin mí"',
    herculaResponse: 'Hércula construye: "Las torres se levantan piedra a piedra"'
  },
  {
    id: 'self_deception_labyrinth',
    title: 'El Laberinto del Autoengaño',
    description: 'Detectar pensamientos que buscan justificar una recaída',
    days: 365,
    icon: '🌀',
    challenge: 'Pasillos que giran sobre sí mismos: "No es tan malo", "la vida es corta". Salir implica nombrar la trampa.',
    reward: 'Claridad mental total y honestidad con uno mismo',
    nikotisInfluence: 'Nikotis confunde: "Solo una vez, para celebrar el año"',
    herculaResponse: 'Hércula encuentra: "Los laberintos tienen salidas, solo hay que caminar"'
  }
];

export const getWorkByDays = (days: number): HerculaWork | null => {
  return herculaWorks.find(work => days >= work.days) || null;
};

export const getNextWork = (days: number): HerculaWork | null => {
  return herculaWorks.find(work => days < work.days) || null;
};

export const getCompletedWorks = (days: number): HerculaWork[] => {
  return herculaWorks.filter(work => days >= work.days);
};