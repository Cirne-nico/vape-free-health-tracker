
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
    id: 'first_week',
    title: 'Una Semana Completa',
    description: 'Completaste 7 días consecutivos',
    days: 7,
    icon: '🏆',
    reward: 'Respiración notablemente mejorada'
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
    id: 'three_months',
    title: 'Trimestre Completo',
    description: '¡Alcanzaste la meta de 90 días!',
    days: 90,
    icon: '👑',
    reward: 'Recuperación casi completa del sistema respiratorio'
  },
  {
    id: 'half_year',
    title: 'Medio Año',
    description: 'Seis meses de vida libre de vapeo',
    days: 180,
    icon: '🎯',
    reward: 'Salud cardiovascular normalizada'
  },
  {
    id: 'one_year',
    title: 'Un Año Completo',
    description: '¡Un año entero de libertad!',
    days: 365,
    icon: '🏅',
    reward: 'Riesgo de enfermedades equiparado a no fumadores'
  },
  {
    id: 'two_years',
    title: 'Dos Años de Victoria',
    description: 'Dos años completos sin vapear - ¡Eres un campeón!',
    days: 730,
    icon: '🏆',
    reward: 'Maestría completa sobre la adicción'
  }
];

export type Achievement = typeof achievements[0];
