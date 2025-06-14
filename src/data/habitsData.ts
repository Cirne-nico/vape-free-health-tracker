export interface Habit {
  id: string;
  name: string;
  shortName: string;
  description: string;
  routine: string;
  scientificBasis: string;
  vapeAdjustment: string;
  reference: string;
  icon: string;
  category: 'physical' | 'mental' | 'social' | 'behavioral';
  isActive: boolean;
}

export const scientificHabits: Omit<Habit, 'isActive'>[] = [
  {
    id: 'daily_exercise',
    name: 'Ejercicio Diario (20-30 min)',
    shortName: 'Ejercicio Rápido',
    description: 'Actividad física diaria para combatir antojos',
    routine: 'Camina rápido, nada o monta en bici 20 min/día. Si surge antojo de vapear, haz 5 min de actividad intensa (sentadillas, saltos).',
    scientificBasis: 'Reduce antojos y estrés al liberar endorfinas',
    vapeAdjustment: 'Acelera recuperación de vías respiratorias irritadas por el vapor',
    reference: 'Taylor et al., 2007',
    icon: '🏃‍♂️',
    category: 'physical'
  },
  {
    id: 'programmed_hydration',
    name: 'Hidratación Programada',
    shortName: 'Agua vs Antojo',
    description: 'Hidratación estratégica contra antojos',
    routine: 'Bebe 1 vaso de agua al despertar y antes de cada comida. Toma un sorbo al sentir impulso de vapear.',
    scientificBasis: 'Elimina residuos de nicotina/glicerina y reduce "boca de algodón"',
    vapeAdjustment: 'Mitiga la necesidad sensorial de sabor o humedad en boca',
    reference: 'NIH/NIDA',
    icon: '💧',
    category: 'physical'
  },
  {
    id: 'breathing_4_6',
    name: 'Respiración 4-6 para Antojos Agudos',
    shortName: 'Respira 4-6',
    description: 'Técnica de respiración para urgencias',
    routine: 'Inhala 4s → Aguanta 2s → Exhala 6s (repite 5 veces) al sentir urgencia por vapear.',
    scientificBasis: 'Reduce cortisol y ansiedad en segundos',
    vapeAdjustment: 'Sustituye el ritual físico de inhalación profunda',
    reference: 'Zope & Zope, 2013',
    icon: '🌬️',
    category: 'mental'
  },
  {
    id: 'strict_sleep_schedule',
    name: 'Horario Estricto de Sueño',
    shortName: 'Sueño Estricto',
    description: 'Rutina de sueño para control de impulsos',
    routine: 'Acuéstate/levántate a misma hora (±30 min). Apaga pantallas 1 h antes.',
    scientificBasis: 'Mejora control de impulsos y reduce recaídas',
    vapeAdjustment: 'Rompe el hábito de vapear en la cama',
    reference: 'Jaehne et al., 2009',
    icon: '😴',
    category: 'behavioral'
  },
  {
    id: 'protein_reinforcement',
    name: 'Refuerzo Proteico en Comidas',
    shortName: 'Proteínas Saciantes',
    description: 'Estabilización glucémica contra ansiedad',
    routine: 'Incluye huevo, yogur griego o legumbres en desayuno/almuerzo. Come cada 3-4 h.',
    scientificBasis: 'Estabiliza glucosa y reduce ansiedad un 24%',
    vapeAdjustment: 'Contrarresta "picos de ansiedad" por nicotina líquida rápida',
    reference: 'Spring et al., 2008',
    icon: '🥚',
    category: 'physical'
  },
  {
    id: 'manual_substitute',
    name: 'Sustituto Manual para el Dispositivo',
    shortName: 'Mano Ocupada',
    description: 'Objeto manipulable como sustituto',
    routine: 'Lleva siempre un objeto manipulable (bolígrafo, moneda, fidget spinner). Úsalo al notar "mano vacía".',
    scientificBasis: 'Rompe reflejo mano-boca',
    vapeAdjustment: 'Prioritario por la portabilidad constante del vapeador',
    reference: 'American Lung Association',
    icon: '✋',
    category: 'behavioral'
  },
  {
    id: 'nature_walks',
    name: 'Paseos Diarios en Naturaleza',
    shortName: 'Naturaleza Diaria',
    description: 'Conexión con la naturaleza contra rumiación',
    routine: '15 min/día en parque/árboles (sin llevar vapeador). Observa plantas/pájaros.',
    scientificBasis: 'Reduce rumiación mental asociada a recaídas',
    vapeAdjustment: 'Disminuye vapeo automático por aburrimiento',
    reference: 'Bratman et al., 2015',
    icon: '🌳',
    category: 'mental'
  },
  {
    id: 'social_commitment',
    name: 'Compromiso Social Semanal',
    shortName: 'Apoyo Semanal',
    description: 'Red de apoyo para accountability',
    routine: 'Cita semanal con alguien que sepa que dejaste de vapear. Informa tus avances.',
    scientificBasis: 'Aumenta éxito en 50% vs intentos en solitario',
    vapeAdjustment: 'Combate el aislamiento típico del vapeo solitario',
    reference: 'Stead et al., 2017',
    icon: '👥',
    category: 'social'
  },
  {
    id: 'clock_technique',
    name: 'Técnica del Reloj para Antojos',
    shortName: 'Espera 5 Min',
    description: 'Técnica de demora para antojos',
    routine: 'Al sentir urgencia: 1) Mira el reloj 2) Espera 5 min sin actuar 3) Reevalúa.',
    scientificBasis: '90% de los antojos bajan en intensidad',
    vapeAdjustment: 'Neutraliza la inmediatez del "hit" de nicotina líquida',
    reference: 'Bowen & Marlatt, 2009',
    icon: '⏳',
    category: 'mental'
  }
];

export const createHabit = (baseHabit: Omit<Habit, 'isActive'>): Habit => ({
  ...baseHabit,
  isActive: false
});