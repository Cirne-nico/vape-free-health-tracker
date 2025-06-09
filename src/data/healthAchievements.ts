
export const healthAchievements = [
  {
    id: 'oxygen_normalization',
    title: 'Normalización del Oxígeno',
    description: 'Los niveles de oxígeno en sangre se han normalizado',
    days: 1,
    healthCategory: 'respiratory',
    icon: '/lovable-uploads/40729490-8efc-4406-96d1-6fa50fd1c815.png', // lungs-bronze
    organIcon: '🫁',
    inscription: 'O₂',
    reward: 'Saturación de oxígeno: 98-100%',
    medicalBasis: 'Niveles de monóxido de carbono reducidos, oxigenación mejorada'
  },
  {
    id: 'taste_smell_recovery',
    title: 'Recuperación Sensorial',
    description: 'Los sentidos del gusto y olfato se han restaurado',
    days: 2,
    healthCategory: 'skinEyes',
    icon: '/lovable-uploads/33187119-695f-43d4-b30c-aa40ff98424e.png', // sense-recovery
    organIcon: '👅',
    inscription: 'GUSTO',
    reward: 'Receptores sensoriales: 90% recuperados',
    medicalBasis: 'Regeneración de papilas gustativas y receptores olfativos'
  },
  {
    id: 'nicotine_elimination',
    title: 'Eliminación de Nicotina',
    description: 'La nicotina ha sido completamente eliminada del organismo',
    days: 3,
    healthCategory: 'cardiovascular',
    icon: '/lovable-uploads/d2d56d43-0631-466d-9f75-6605bc86a799.png', // nicotine-silver
    organIcon: '💓',
    inscription: 'SANGRE',
    reward: 'Niveles de nicotina en sangre: 0%',
    medicalBasis: 'Eliminación completa de nicotina y cotinina del torrente sanguíneo'
  },
  {
    id: 'circulation_improvement',
    title: 'Mejora Circulatoria',
    description: 'La circulación sanguínea ha mejorado significativamente',
    days: 14,
    healthCategory: 'cardiovascular',
    icon: '/lovable-uploads/40729490-8efc-4406-96d1-6fa50fd1c815.png', // heart-bronze (reutilizando)
    organIcon: '❤️',
    inscription: 'FLUJO',
    reward: 'Flujo sanguíneo periférico normalizado',
    medicalBasis: 'Reducción de vasoconstricción, mejora en la perfusión tisular'
  },
  {
    id: 'lung_function_improvement',
    title: 'Función Pulmonar Mejorada',
    description: 'La capacidad pulmonar ha aumentado considerablemente',
    days: 30,
    healthCategory: 'respiratory',
    icon: '/lovable-uploads/d2d56d43-0631-466d-9f75-6605bc86a799.png', // lungs-silver (reutilizando)
    organIcon: '🫁',
    inscription: 'PULMÓN',
    reward: 'Capacidad pulmonar: +20% mejorada',
    medicalBasis: 'Reducción de la inflamación bronquial, mejora del intercambio gaseoso'
  },
  {
    id: 'blood_pressure_normalization',
    title: 'Presión Arterial Normal',
    description: 'La presión arterial se ha estabilizado en valores normales',
    days: 60,
    healthCategory: 'cardiovascular',
    icon: '/lovable-uploads/d2d56d43-0631-466d-9f75-6605bc86a799.png', // heart-silver (reutilizando)
    organIcon: '❤️',
    inscription: 'TENSIÓN',
    reward: 'Presión arterial: 120/80 mmHg',
    medicalBasis: 'Reducción del estrés cardiovascular, vasodilatación normalizada'
  },
  {
    id: 'liver_detox',
    title: 'Desintoxicación Hepática',
    description: 'El hígado ha completado la desintoxicación de toxinas',
    days: 90,
    healthCategory: 'liver',
    icon: '/lovable-uploads/11c876dc-a4da-4ee8-8fc3-a8f39cef49c7.png', // liver-gold
    organIcon: '🫘',
    inscription: 'HÍGADO',
    reward: 'Enzimas hepáticas normalizadas',
    medicalBasis: 'Valores ALT, AST y GGT en rango normal'
  },
  {
    id: 'immune_system_boost',
    title: 'Sistema Inmune Fortalecido',
    description: 'El sistema inmunológico ha recuperado su función óptima',
    days: 120,
    healthCategory: 'mental',
    icon: '/lovable-uploads/11c876dc-a4da-4ee8-8fc3-a8f39cef49c7.png', // immune-gold (la medalla dorada de Higiea que subiste)
    organIcon: '🧬',
    inscription: 'INMUNE',
    reward: 'Función inmune: +40% mejorada',
    medicalBasis: 'Normalización de leucocitos y función de células T'
  },
  {
    id: 'skin_regeneration',
    title: 'Regeneración Cutánea',
    description: 'La piel ha recuperado su elasticidad y luminosidad',
    days: 180,
    healthCategory: 'skinEyes',
    icon: '/lovable-uploads/33187119-695f-43d4-b30c-aa40ff98424e.png', // skin-regeneration (reutilizando la otra medalla piel/ojos)
    organIcon: '🧴',
    inscription: 'PIEL',
    reward: 'Colágeno y elastina restaurados',
    medicalBasis: 'Mejora en la microcirculación cutánea y producción de colágeno'
  },
  {
    id: 'cardiac_recovery',
    title: 'Recuperación Cardíaca Completa',
    description: 'El corazón funciona como el de una persona que nunca fumó',
    days: 365,
    healthCategory: 'cardiovascular',
    icon: '/lovable-uploads/11c876dc-a4da-4ee8-8fc3-a8f39cef49c7.png', // heart-gold (reutilizando)
    organIcon: '❤️',
    inscription: 'CORAZÓN',
    reward: 'Riesgo cardiovascular equiparado a no fumadores',
    medicalBasis: 'Función cardíaca completamente normalizada'
  }
];

export type HealthAchievement = typeof healthAchievements[0];
