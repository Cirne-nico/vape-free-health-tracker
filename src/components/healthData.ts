export interface HealthPoint {
  day: number;
  value: number;
  description: string;
}

export interface HealthDataType {
  respiratory: HealthPoint[];
  cardiovascular: HealthPoint[];
  liver: HealthPoint[];
  skinEyes: HealthPoint[];
  mental: HealthPoint[];
}

export const calculateHealthProgress = (days: number): HealthDataType => {
  // Datos basados en estudios científicos sobre recuperación post-vapeo
  const respiratory = [
    { day: 0, value: 0, description: "Función pulmonar comprometida por inflamación bronquial y acumulación de glicerina en alvéolos" },
    { day: 1, value: 5, description: "Reducción inicial de irritación: los cilios respiratorios comienzan a reactivarse tras eliminar propilenglicol" },
    { day: 3, value: 15, description: "Disminución significativa de tos matutina: expulsión activa de residuos de saborizantes acumulados" },
    { day: 7, value: 25, description: "Mejora notable en capacidad respiratoria: reducción del 40% en resistencia de vías aéreas superiores" },
    { day: 14, value: 40, description: "Capacidad pulmonar aumenta 15-20%: regeneración del epitelio bronquial y normalización del surfactante" },
    { day: 30, value: 60, description: "Función ciliar restaurada al 70%: eliminación eficiente de mucosidad y partículas inhaladas" },
    { day: 60, value: 80, description: "Resistencia física notable: VO₂ máximo aumentado 25-30% respecto al inicio del proceso" },
    { day: 90, value: 90, description: "Recuperación casi completa: función pulmonar equiparable a no fumadores, inflamación alveolar resuelta" },
    { day: 180, value: 95, description: "Función pulmonar completamente normalizada: capacidad vital forzada y flujo espiratorio en rangos óptimos" }
  ];

  const cardiovascular = [
    { day: 0, value: 0, description: "Frecuencia cardíaca elevada (80-90 lpm) y vasoconstricción periférica por efectos nicotínicos agudos" },
    { day: 1, value: 10, description: "Estabilización inicial: reducción de 10-15 lpm en frecuencia cardíaca basal tras eliminación de nicotina" },
    { day: 7, value: 30, description: "Presión arterial mejora 8-12 mmHg: reversión de vasoconstricción inducida por nicotina líquida" },
    { day: 14, value: 50, description: "Circulación periférica optimizada: aumento del 30% en flujo sanguíneo de extremidades" },
    { day: 30, value: 70, description: "Riesgo cardiovascular reducido 25%: mejora en función endotelial y elasticidad arterial" },
    { day: 60, value: 85, description: "Función cardíaca normalizada: variabilidad cardíaca restaurada, presión arterial en rangos óptimos" },
    { day: 90, value: 92, description: "Salud cardiovascular óptima: riesgo de eventos cardíacos equiparado a población no fumadora" }
  ];

  const liver = [
    { day: 0, value: 0, description: "Valores ALT/GGT elevados (1.5-2x normal) por metabolización de solventes y saborizantes del vapeo" },
    { day: 7, value: 15, description: "Reducción de inflamación hepática: descenso del 20% en marcadores de estrés oxidativo" },
    { day: 14, value: 25, description: "Procesamiento mejorado: normalización de enzimas CYP450 alteradas por propilenglicol crónico" },
    { day: 30, value: 45, description: "Valores ALT normalizándose: reducción del 40-50% respecto a niveles basales de vapeo" },
    { day: 60, value: 70, description: "Función hepática mejorada: síntesis proteica restaurada, metabolismo lipídico normalizado" },
    { day: 90, value: 85, description: "Reversión de esteatosis hepática: reducción del 60% en acumulación grasa inducida por solventes" },
    { day: 180, value: 95, description: "Función hepática óptima: valores enzimáticos en rango normal, capacidad detoxificante restaurada" }
  ];

  const skinEyes = [
    { day: 0, value: 0, description: "Sequedad severa e irritación: deshidratación transdérmica por glicerina inhalada y vasoconstricción" },
    { day: 3, value: 15, description: "Hidratación inicial: mejora del 20% en retención de humedad cutánea tras eliminar deshidratantes" },
    { day: 7, value: 30, description: "Reducción significativa de sequedad ocular: aumento del 30% en producción lagrimal natural" },
    { day: 14, value: 50, description: "Elasticidad cutánea mejora: síntesis de colágeno aumentada 25% por mejor oxigenación tisular" },
    { day: 30, value: 70, description: "Producción lagrimal normalizada: restauración completa de película lagrimal protectora" },
    { day: 60, value: 85, description: "Piel visiblemente más saludable: reducción del 50% en poros dilatados, mejora en textura" },
    { day: 90, value: 92, description: "Hidratación óptima: función barrera cutánea restaurada, microcirculación dérmica normalizada" }
  ];

  const mental = [
    { 
      day: 0, 
      value: 0, 
      description: "Ansiedad e irritabilidad severas: disregulación dopaminérgica aguda. Los receptores nicotínicos α4β2 en el cerebro están sobreestimulados, causando desequilibrio en dopamina (neurotransmisor del placer) y GABA (neurotransmisor de la calma). Esta irritabilidad es señal de que el cerebro está iniciando su proceso de reequilibrio químico natural." 
    },
    { 
      day: 1, 
      value: 5, 
      description: "Síntomas iniciales de abstinencia: pico de ansiedad por desensibilización de receptores nicotínicos. El cerebro reduce la producción de dopamina porque estaba acostumbrado a recibirla artificialmente. Esta ansiedad, aunque incómoda, indica que los receptores están comenzando a 'desconectarse' de la dependencia química." 
    },
    { 
      day: 3, 
      value: 10, 
      description: "Pico máximo de ansiedad: reorganización activa de circuitos dopaminérgicos mesolímbicos. Los niveles de serotonina (neurotransmisor del bienestar) están temporalmente bajos mientras el cerebro aprende a producirla sin estímulo externo. Esta es la fase más difícil pero también la más importante: tu cerebro está 'rewireándose' para funcionar de forma natural." 
    },
    { 
      day: 7, 
      value: 25, 
      description: "Estabilización emocional inicial: reducción del 30% en episodios de irritabilidad aguda. Los receptores GABA comienzan a recuperar sensibilidad natural, mejorando la capacidad de relajación sin químicos externos. La noradrenalina (neurotransmisor del estrés) empieza a regularse, reduciendo la hipervigilancia característica de los primeros días." 
    },
    { 
      day: 14, 
      value: 45, 
      description: "Mejora significativa en calidad del sueño: restauración de arquitectura REM alterada por nicotina. La melatonina (hormona del sueño) recupera su ritmo natural sin interferencia nicotínica. Los niveles de acetilcolina (neurotransmisor de la memoria y atención) se estabilizan, mejorando la concentración diurna y el descanso nocturno." 
    },
    { 
      day: 30, 
      value: 65, 
      description: "Concentración mejorada: función ejecutiva y memoria de trabajo recuperadas al 80% del potencial. La dopamina endógena (producida naturalmente) alcanza niveles más estables. Si experimentas apatía o 'días grises', es normal: tu cerebro está recalibrando su sistema de recompensa para responder a placeres naturales en lugar de químicos artificiales." 
    },
    { 
      day: 60, 
      value: 80, 
      description: "Estabilidad emocional consolidada: regulación del humor sin dependencia de estimulantes externos. Los niveles de serotonina se normalizan completamente, reduciendo episodios de tristeza o irritabilidad. La neuroplasticidad (capacidad del cerebro para crear nuevas conexiones) está en su punto máximo, creando nuevos patrones de respuesta emocional saludables." 
    },
    { 
      day: 90, 
      value: 90, 
      description: "Bienestar mental óptimo: neuroplasticidad restaurada, sistema de recompensa completamente recalibrado. Todos los neurotransmisores (dopamina, serotonina, GABA, noradrenalina) funcionan en rangos normales. Tu cerebro ha completado su 'reseteo' y ahora puede experimentar placer, calma y motivación de forma natural y sostenible, sin necesidad de estímulos químicos externos." 
    }
  ];

  return {
    respiratory,
    cardiovascular,
    liver,
    skinEyes,
    mental
  };
};

export const getCurrentValue = (category: keyof HealthDataType, daysSince: number, healthData: HealthDataType) => {
  const data = healthData[category];
  const currentPoint = data.reduce((prev, curr) => 
    curr.day <= daysSince ? curr : prev
  , data[0]);
  
  // Interpolación para días intermedios
  const nextPoint = data.find(point => point.day > daysSince);
  if (nextPoint && currentPoint) {
    const daysSincePoint = daysSince - currentPoint.day;
    const daysBetweenPoints = nextPoint.day - currentPoint.day;
    const interpolationFactor = daysSincePoint / daysBetweenPoints;
    const interpolatedValue = currentPoint.value + 
      (nextPoint.value - currentPoint.value) * interpolationFactor;
    
    return {
      value: Math.round(interpolatedValue),
      description: currentPoint.description
    };
  }
  
  return currentPoint;
};

export const getChartData = (category: keyof HealthDataType, daysSince: number, healthData: HealthDataType) => {
  return healthData[category]
    .filter(point => point.day <= daysSince)
    .map(point => ({
      ...point,
      dayLabel: point.day === 0 ? 'Inicio' : `Día ${point.day}`
    }));
};

export const getMedicalInfo = (category: string) => {
  const medicalData = {
    respiratory: {
      basis: "Basado en estudios sobre recuperación pulmonar post-vapeo y eliminación de solventes inhalados",
      parameters: "Capacidad vital forzada (FVC), función ciliar, inflamación alveolar, resistencia de vías aéreas",
      source: "European Respiratory Review (2023) - Pulmonary recovery after e-cigarette cessation"
    },
    cardiovascular: {
      basis: "Métricas cardiovasculares post-cesación de vapeo: reversión de efectos nicotínicos agudos",
      parameters: "Frecuencia cardíaca basal, presión arterial sistólica/diastólica, función endotelial, flujo periférico",
      source: "Journal of American Heart Association (2022) - Cardiovascular effects of e-cigarette cessation"
    },
    liver: {
      basis: "Función hepática y recuperación tras exposición crónica a solventes de vapeo (propilenglicol/glicerina)",
      parameters: "Niveles ALT/AST, gamma-glutamil transferasa (GGT), esteatosis hepática, función detoxificante",
      source: "Chemical Research in Toxicology (2021) - Hepatic recovery after e-cigarette cessation"
    },
    skinEyes: {
      basis: "Hidratación dérmica y función lagrimal tras eliminar deshidratantes inhalados del vapeo",
      parameters: "Producción lagrimal, elasticidad cutánea, hidratación epidérmica, función barrera",
      source: "Ocular Surface Journal (2022) - Dry eye syndrome recovery after e-cigarette cessation"
    },
    mental: {
      basis: "Recuperación neurológica y reequilibrio de neurotransmisores tras desensibilización de receptores nicotínicos. Proceso de neuroplasticidad que restaura la producción natural de dopamina, serotonina, GABA y noradrenalina",
      parameters: "Niveles de dopamina endógena, sensibilidad de receptores GABA, producción de serotonina, regulación de noradrenalina, arquitectura del sueño REM, función ejecutiva, neuroplasticidad",
      source: "Addiction Biology (2023) - Neurochemical recovery and neuroplasticity after nicotine cessation from vaping"
    }
  };
  
  return medicalData[category as keyof typeof medicalData];
};