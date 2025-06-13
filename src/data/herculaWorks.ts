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
    challenge: 'Como una hidra de humo que adopta mil formas: ansiedad, aburrimiento, placer, tristeza.',
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
    challenge: 'Una bestia dormida al pie del escritorio, que ruge cada vez que se enciende el móvil.',
    reward: 'Libertad de los automatismos condicionados',
    nikotisInfluence: 'Nikotis ruge: "Tu rutina está incompleta sin mí"',
    herculaResponse: 'Hércula declara: "Creo nuevos rituales que nutren en lugar de drenar"'
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
    id: 'gray_days_mirror',
    title: 'El Espejo de los Días Grises',
    description: 'Aceptar el bajón de serotonina sin retroceder',
    days: 14,
    icon: '🪞',
    challenge: 'Un espejo que distorsiona la luz del día: todo parece más aburrido, más lento.',
    reward: 'Comprensión de que la tristeza es temporal y adaptativa',
    nikotisInfluence: 'Nikotis refleja: "Mira qué gris es tu vida sin mí"',
    herculaResponse: 'Hércula observa: "Los colores regresan cuando el espejo se limpia"'
  },
  {
    id: 'anxiety_bridge',
    title: 'El Puente de la Ansiedad',
    description: 'Soportar una crisis sin usar el vapeo como anestesia',
    days: 30,
    icon: '🌉',
    challenge: 'Un puente tambaleante entre dos acantilados emocionales.',
    reward: 'Desarrollo de herramientas genuinas de autorregulación',
    nikotisInfluence: 'Nikotis amenaza: "Caerás al vacío sin mi apoyo"',
    herculaResponse: 'Hércula camina: "Cada paso me enseña que puedo sostener mi propio peso"'
  },
  {
    id: 'lost_lungs_treasure',
    title: 'El Tesoro de los Pulmones Perdidos',
    description: 'Recuperar la salud sin buscarla con obsesión',
    days: 90,
    icon: '💎',
    challenge: 'Una cámara sellada donde solo se entra cuando se deja de correr tras los beneficios.',
    reward: 'Recuperación completa de la función respiratoria',
    nikotisInfluence: 'Nikotis oculta: "Nunca recuperarás lo que perdiste"',
    herculaResponse: 'Hércula respira: "Mi tesoro se revela cuando dejo de buscarlo"'
  },
  {
    id: 'flower_that_smells_again',
    title: 'La Flor que Vuelve a Oler',
    description: 'Reconectar con placeres sencillos',
    days: 180,
    icon: '🌸',
    challenge: 'Un momento suave, sin heroísmo ni lucha. Solo gozo.',
    reward: 'Reconexión plena con los sentidos y placeres naturales',
    nikotisInfluence: 'Nikotis se desvanece: "Ya no me necesitas..."',
    herculaResponse: 'Hércula florece: "Ahora puedo oler la vida sin filtros"'
  },
  {
    id: 'autonomy_tower',
    title: 'La Torre de la Autonomía',
    description: 'Reconstruir la noción de autocuidado sin sustancias',
    days: 365,
    icon: '🗼',
    challenge: 'Piso a piso, Hércula asciende. Cada paso es una práctica nueva.',
    reward: 'Sistema completo de autocuidado genuino',
    nikotisInfluence: 'Nikotis desde abajo: "Nunca llegarás a la cima sin mí"',
    herculaResponse: 'Hércula construye: "Cada piso es una nueva forma de cuidarme"'
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