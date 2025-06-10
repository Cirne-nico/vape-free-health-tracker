export const achievements = [
  {
    id: 'first_48h',
    title: 'Primeras 48 Horas',
    description: 'Superaste el período crítico inicial',
    days: 2,
    icon: '⚡',
    reward: 'Sentidos del gusto y olfato mejorando'
  },
  {
    id: 'fourth_day',
    title: 'Cuarto Día',
    description: 'Cuatro días de determinación',
    days: 4,
    icon: '💪',
    reward: 'Niveles de energía estabilizándose'
  },
  {
    id: 'first_week',
    title: 'Una Semana Completa',
    description: 'Completaste 7 días consecutivos',
    days: 7,
    icon: '🏆',
    reward: 'Respiración notablemente mejorada'
  },
  {
    id: 'two_weeks',
    title: 'Dos Semanas',
    description: 'Catorce días de libertad',
    days: 14,
    icon: '🌟',
    reward: 'Circulación sanguínea mejorando'
  },
  {
    id: 'one_month',
    title: 'Un Mes de Libertad',
    description: 'Alcanzaste el primer mes completo',
    days: 30,
    icon: '🎉',
    reward: 'Función pulmonar significativamente mejorada'
  },
  {
    id: 'two_months',
    title: 'Dos Meses',
    description: 'Sesenta días de perseverancia',
    days: 60,
    icon: '🔥',
    reward: 'Sistema inmunológico fortalecido'
  },
  {
    id: 'four_months',
    title: 'Cuatro Meses',
    description: 'Ciento veinte días de victoria',
    days: 120,
    icon: '⭐',
    reward: 'Capacidad pulmonar considerablemente mejorada'
  },
  {
    id: 'six_months',
    title: 'Medio Año',
    description: 'Seis meses de vida libre de vapeo',
    days: 180,
    icon: '🎯',
    reward: 'Salud cardiovascular normalizada'
  },
  {
    id: 'ten_months',
    title: 'Diez Meses',
    description: 'Trescientos días de libertad total',
    days: 300,
    icon: '🏅',
    reward: 'Dominio completo sobre los impulsos adictivos'
  },
  {
    id: 'two_years',
    title: 'Dos Años de Victoria',
    description: 'Dos años completos sin vapear - ¡Eres un campeón!',
    days: 730,
    icon: '👑',
    reward: 'Maestría completa sobre la adicción'
  }
];

export type Achievement = typeof achievements[0];