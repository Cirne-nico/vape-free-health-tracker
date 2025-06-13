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
    title: 'El Humo de los Mil Rostros',
    description: 'Superar la ilusión del alivio inmediato',
    days: 1,
    icon: '🌫️',
    challenge: 'Como una hidra de humo que adopta mil formas: ansiedad, aburrimiento, placer, tristeza. Cada rostro vencido revela el siguiente.',
    reward: 'Reconocimiento de los patrones de autoengaño',
    nikotisInfluence: 'Nikotis susurra: "Solo necesitas una calada para sentirte mejor"',
    herculaResponse: 'Hércula responde: "Cada forma del humo es una mentira que se desvanece al ser nombrada"'
  },
  {
    id: 'routine_lion',
    title: 'El León de la Rutina',
    description: 'Romper el hábito diario automatizado',
    days: 3,
    icon: '🦁',
    challenge: 'Una bestia dormida al pie del escritorio, que ruge cada vez que se enciende el móvil o se acaba el café.',
    reward: 'Libertad de los automatismos condicionados',
    nikotisInfluence: 'Nikotis ruge: "Tu rutina está incompleta sin mí"',
    herculaResponse: 'Hércula declara: "Creo nuevos rituales que nutren en lugar de drenar"'
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
    herculaResponse: 'Hércula afirma: "Mis manos vacías están listas para crear, no para consumir"'
  },
  {
    id: 'first_monday_swamp',
    title: 'El Pantano del Primer Lunes',
    description: 'Pasar el primer día laboral sin vapear',
    days: 7,
    icon: '🌊',
    challenge: 'Lodazal emocional y nervioso donde los pies se hunden y la voluntad se resbala.',
    reward: 'Demostración de que el trabajo es posible sin nicotina',
    nikotisInfluence: 'Nikotis grita: "No podrás concentrarte ni rendir sin mí"',
    herculaResponse: 'Hércula persiste: "Mi mente es más clara sin la niebla química"'
  },
  {
    id: 'insomnia_serpent',
    title: 'La Serpiente del Insomnio',
    description: 'Dormir sin la falsa calma del vapeo nocturno',
    days: 10,
    icon: '🐍',
    challenge: 'Una serpiente silente que se enrolla en el pecho, susurrando que una calada devolverá el sueño.',
    reward: 'Recuperación del sueño natural y reparador',
    nikotisInfluence: 'Nikotis sisea: "Sin mí, nunca volverás a dormir en paz"',
    herculaResponse: 'Hércula respira: "Mi cuerpo recuerda cómo descansar sin químicos"'
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
    herculaResponse: 'Hércula observa: "Los colores regresan cuando el espejo se limpia"'
  },
  {
    id: 'celebrations_island',
    title: 'La Isla de las Celebraciones',
    description: 'No recaer durante una fiesta, cumpleaños o celebración',
    days: 21,
    icon: '🎉',
    challenge: 'Un lugar lleno de música y brindis, donde Nikotis aparece disfrazada de nostalgia y alegría.',
    reward: 'Capacidad de celebrar sin necesidad de sustancias',
    nikotisInfluence: 'Nikotis canta: "Las fiestas no son lo mismo sin mí"',
    herculaResponse: 'Hércula celebra: "Mi alegría es auténtica, no química"'
  },
  {
    id: 'anxiety_bridge',
    title: 'El Puente de la Ansiedad',
    description: 'Soportar una crisis sin usar el vapeo como anestesia',
    days: 30,
    icon: '🌉',
    challenge: 'Un puente tambaleante entre dos acantilados emocionales. Solo se cruza si se respira hondo.',
    reward: 'Desarrollo de herramientas genuinas de autorregulación',
    nikotisInfluence: 'Nikotis amenaza: "Caerás al vacío sin mi apoyo"',
    herculaResponse: 'Hércula camina: "Cada paso me enseña que puedo sostener mi propio peso"'
  },
  {
    id: 'judgment_crows',
    title: 'Los Cuervos del Juicio Interno',
    description: 'Vencer la autocrítica que susurra: "Vas a fallar"',
    days: 40,
    icon: '🐦‍⬛',
    challenge: 'Bandadas negras que graznan dudas sobre el hombro. El reto: no combatirlas, sino dejar que pasen.',
    reward: 'Liberación de la autocrítica destructiva',
    nikotisInfluence: 'Nikotis grazna: "Eres débil, siempre has sido débil"',
    herculaResponse: 'Hércula escucha: "Los cuervos pasan, pero yo permanezco"'
  },
  {
    id: 'comparison_mountain',
    title: 'La Montaña de la Comparación',
    description: 'Evitar el juicio hacia quienes sí consumen',
    days: 50,
    icon: '⛰️',
    challenge: 'Una cima neblinosa donde la voz de Nikotis murmura: "Otros lo manejan, tú también podrías".',
    reward: 'Aceptación de que cada camino es único',
    nikotisInfluence: 'Nikotis compara: "Mira cómo otros disfrutan lo que tú te niegas"',
    herculaResponse: 'Hércula asciende: "Mi cumbre es diferente, pero es mía"'
  },
  {
    id: 'small_excuses_lake',
    title: 'El Lago de las Pequeñas Excusas',
    description: 'No caer en la trampa de "solo una vez más"',
    days: 60,
    icon: '🏞️',
    challenge: 'Cada gota del lago es una excusa racionalizada: "Hoy tuve un mal día", "lo controlo", "solo por esta vez".',
    reward: 'Claridad mental para reconocer las trampas cognitivas',
    nikotisInfluence: 'Nikotis gotea: "Solo una vez no hará daño"',
    herculaResponse: 'Hércula se aleja: "Cada gota del lago es un océano de recaída"'
  },
  {
    id: 'slow_time_guardian',
    title: 'El Guardián del Tiempo Lento',
    description: 'Soportar la lentitud del cambio',
    days: 75,
    icon: '⏳',
    challenge: 'Un gigante que arrastra los minutos y desafía a Hércula a mantener el rumbo incluso cuando nada parece mejorar.',
    reward: 'Paciencia y confianza en los procesos naturales',
    nikotisInfluence: 'Nikotis ralentiza: "Nada cambia, nada mejora sin mí"',
    herculaResponse: 'Hércula persevera: "Los cambios profundos requieren tiempo profundo"'
  },
  {
    id: 'lost_lungs_treasure',
    title: 'El Tesoro de los Pulmones Perdidos',
    description: 'Recuperar la salud sin buscarla con obsesión',
    days: 90,
    icon: '💎',
    challenge: 'Una cámara sellada donde solo se entra cuando se deja de correr tras los beneficios y se camina por el proceso.',
    reward: 'Recuperación completa de la función respiratoria',
    nikotisInfluence: 'Nikotis oculta: "Nunca recuperarás lo que perdiste"',
    herculaResponse: 'Hércula respira: "Mi tesoro se revela cuando dejo de buscarlo"'
  },
  {
    id: 'old_altar_voices',
    title: 'Las Voces del Viejo Altar',
    description: 'Cerrar el ciclo simbólico con la figura del vapeo',
    days: 120,
    icon: '🏛️',
    challenge: 'Un altar donde Nikotis era dios protector. Hércula lo contempla por última vez antes de derribarlo.',
    reward: 'Cierre simbólico y emocional del ciclo adictivo',
    nikotisInfluence: 'Nikotis implora: "Fui tu refugio, tu consuelo, tu compañía"',
    herculaResponse: 'Hércula despide: "Fuiste mi prisión disfrazada de refugio"'
  },
  {
    id: 'flower_that_smells_again',
    title: 'La Flor que Vuelve a Oler',
    description: 'Reconectar con placeres sencillos: el cuerpo, la piel, la respiración',
    days: 150,
    icon: '🌸',
    challenge: 'Un momento suave, sin heroísmo ni lucha. Solo gozo: la señal de que ha empezado una nueva mitología.',
    reward: 'Reconexión plena con los sentidos y placeres naturales',
    nikotisInfluence: 'Nikotis se desvanece: "Ya no me necesitas..."',
    herculaResponse: 'Hércula florece: "Ahora puedo oler la vida sin filtros"'
  },
  {
    id: 'sweet_memory_eclipse',
    title: 'El Eclipse de la Memoria Dulce',
    description: 'Aceptar que hay recuerdos ligados al vapeo sin querer revivirlos',
    days: 180,
    icon: '🌑',
    challenge: 'El cielo se oscurece cuando evocamos ciertos momentos. Hércula aprende a recordarlos sin recrearlos.',
    reward: 'Integración saludable de la historia personal',
    nikotisInfluence: 'Nikotis nostálgica: "Recuerda los buenos momentos que compartimos"',
    herculaResponse: 'Hércula integra: "Los recuerdos son míos, pero el presente también"'
  },
  {
    id: 'temptations_market',
    title: 'El Mercado de las Tentaciones',
    description: 'Resistir las ofertas, las tiendas, los estímulos externos',
    days: 210,
    icon: '🏪',
    challenge: 'Un mercado ruidoso donde los colores y sabores prometen felicidad instantánea. Pero son solo humo y gasto.',
    reward: 'Inmunidad a los estímulos comerciales de la industria',
    nikotisInfluence: 'Nikotis vende: "Nuevos sabores, nuevas experiencias te esperan"',
    herculaResponse: 'Hércula pasa de largo: "No compro lo que ya no necesito"'
  },
  {
    id: 'social_silence_bell',
    title: 'La Campana del Silencio Social',
    description: 'No sentirse fuera de lugar en un grupo donde se vapea',
    days: 240,
    icon: '🔔',
    challenge: 'Una campana de cristal aísla a Hércula del grupo. Su tarea: no romperla, sino hacerla transparente.',
    reward: 'Confianza social sin necesidad de conformidad',
    nikotisInfluence: 'Nikotis aísla: "Estás sola, diferente, excluida"',
    herculaResponse: 'Hércula transparenta: "Mi diferencia es mi fortaleza"'
  },
  {
    id: 'past_relapses_wall',
    title: 'El Muro de las Recaídas Pasadas',
    description: 'No usar errores antiguos como profecía de fracaso',
    days: 270,
    icon: '🧱',
    challenge: 'Un muro tallado con las fechas de cada caída. Hércula lo atraviesa sin mirar atrás.',
    reward: 'Liberación del peso de los errores pasados',
    nikotisInfluence: 'Nikotis recuerda: "Ya fallaste antes, fallarás de nuevo"',
    herculaResponse: 'Hércula atraviesa: "Cada caída me enseñó a levantarme mejor"'
  },
  {
    id: 'impatience_rain',
    title: 'La Lluvia de la Impaciencia',
    description: 'Aceptar los altibajos sin buscar alivio inmediato',
    days: 300,
    icon: '🌧️',
    challenge: 'Lluvia persistente, sin tormenta, sin sol. Se camina mojado, pero se camina.',
    reward: 'Tolerancia a la incomodidad y paciencia con los procesos',
    nikotisInfluence: 'Nikotis empapa: "Esta lluvia nunca parará sin mí"',
    herculaResponse: 'Hércula camina: "La lluvia también pasa, como todo"'
  },
  {
    id: 'autonomy_tower',
    title: 'La Torre de la Autonomía',
    description: 'Reconstruir la noción de autocuidado sin sustancias',
    days: 330,
    icon: '🗼',
    challenge: 'Piso a piso, Hércula asciende. Cada paso es una práctica nueva: música, paseo, abrazo, escritura.',
    reward: 'Sistema completo de autocuidado genuino',
    nikotisInfluence: 'Nikotis desde abajo: "Nunca llegarás a la cima sin mí"',
    herculaResponse: 'Hércula construye: "Cada piso es una nueva forma de cuidarme"'
  },
  {
    id: 'self_deception_labyrinth',
    title: 'El Laberinto del Autoengaño',
    description: 'Detectar los pensamientos que buscan justificar una recaída',
    days: 365,
    icon: '🌀',
    challenge: 'Pasillos que giran sobre sí mismos: "No es tan malo", "la vida es corta". Salir implica nombrar la trampa.',
    reward: 'Claridad mental total y honestidad consigo misma',
    nikotisInfluence: 'Nikotis confunde: "Solo una vez, para celebrar el año"',
    herculaResponse: 'Hércula encuentra la salida: "La verdad es el único camino que no gira"'
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