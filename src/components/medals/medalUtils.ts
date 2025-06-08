
import { SpecialMedal } from './medalTypes';

// Función para calcular la tasa de éxito según estudios reales
export const getSuccessRate = (day: number): number => {
  if (day < 1) return 95;
  if (day < 3) return 78;
  if (day < 7) return 65;
  if (day < 14) return 52;
  if (day < 30) return 41;
  if (day < 90) return 28;
  return 15;
};

// Función para generar medallas especiales
export const getSpecialMedals = (days: number): SpecialMedal[] => {
  const medals: SpecialMedal[] = [];
  const currentSuccessRate = getSuccessRate(days);
  
  // Primera medalla de Victoria (Nike) - cuando la tasa de éxito >= 50%
  if (currentSuccessRate >= 50) {
    medals.push({
      id: 'victory-nike-50',
      type: 'victory',
      title: 'Victoria de Nike - Nivel I',
      icon: '/lovable-uploads/33187119-695f-43d4-b30c-aa40ff98424e.png',
      description: `Has alcanzado un hito donde la tasa de éxito es del ${currentSuccessRate}%. ¡La diosa Nike te sonríe!`,
      reward: 'Reconocimiento de superación estadística - Primer nivel',
      hasEconomicBenefits: false,
      hasHealthBenefits: false,
      specialMessage: 'Esta medalla representa tu fortaleza contra las estadísticas. Has demostrado una determinación excepcional.'
    });
  }
  
  // Segunda medalla de Victoria (Nike) - cuando la tasa de éxito >= 75%
  if (currentSuccessRate >= 75) {
    medals.push({
      id: 'victory-nike-75',
      type: 'victory',
      title: 'Victoria de Nike - Nivel II',
      icon: '/lovable-uploads/33187119-695f-43d4-b30c-aa40ff98424e.png',
      description: `¡Extraordinario! Con una tasa de éxito del ${currentSuccessRate}%, te encuentras en la élite de la perseverancia.`,
      reward: 'Reconocimiento de superación estadística - Nivel élite',
      hasEconomicBenefits: false,
      hasHealthBenefits: false,
      specialMessage: 'Has alcanzado un nivel de determinación que solo poseen los más resilientes. Nike te corona como ejemplo de victoria.'
    });
  }
  
  return medals;
};
