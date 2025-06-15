import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import contenidosData from '@/data/contenidos.json';

interface DayContentCardProps {
  startDate: Date | null;
}

const DayContentCard = ({ startDate }: DayContentCardProps) => {
  const { t, i18n } = useTranslation();
  
  const getCurrentDayContent = () => {
    if (!startDate) return null;
    
    const hoursSince = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60));
    
    // Buscar el contenido más reciente según las horas transcurridas
    const availableContent = contenidosData.filter(content => content.hora <= hoursSince);
    
    if (availableContent.length === 0) {
      return {
        sintesis: i18n.language === 'en' 
          ? "You've begun your journey! The first minutes are crucial."
          : "¡Has comenzado tu viaje! Los primeros minutos son cruciales.",
        consejo: i18n.language === 'en'
          ? "Breathe deeply and stay hydrated. Every minute counts."
          : "Respira profundo y mantente hidratado. Cada minuto cuenta.",
        recordatorio: i18n.language === 'en'
          ? "Your body is starting the recovery process."
          : "Tu cuerpo está iniciando el proceso de recuperación.",
        contrareplica: i18n.language === 'en'
          ? "It's not a loss. It's the beginning of my freedom."
          : "No es una pérdida. Es el comienzo de mi libertad.",
        hora: 0
      };
    }
    
    // Obtener el contenido más reciente
    return availableContent[availableContent.length - 1];
  };

  // Función para calcular el período de validez del mensaje
  const getValidityPeriod = (currentHour: number) => {
    // Encontrar el índice del contenido actual
    const currentIndex = contenidosData.findIndex(content => content.hora === currentHour);
    
    if (currentIndex === -1) {
      return i18n.language === 'en' ? "First minutes" : "Primeros minutos";
    }
    
    // Obtener la hora del siguiente contenido (si existe)
    const nextContent = contenidosData[currentIndex + 1];
    const currentDay = Math.floor(currentHour / 24);
    
    if (!nextContent) {
      // Si es el último contenido, mostrar "desde día X en adelante"
      if (currentDay === 0) {
        return i18n.language === 'en' ? "First hours" : "Primeras horas";
      }
      return i18n.language === 'en' ? `From day ${currentDay} onwards` : `Desde día ${currentDay} en adelante`;
    }
    
    const nextDay = Math.floor(nextContent.hora / 24);
    
    // Si el mensaje es válido solo para el día actual
    if (currentDay === nextDay) {
      if (currentDay === 0) {
        return i18n.language === 'en' ? `Hours ${currentHour}-${nextContent.hora - 1}` : `Horas ${currentHour}-${nextContent.hora - 1}`;
      }
      return i18n.language === 'en' ? `Day ${currentDay}` : `Día ${currentDay}`;
    }
    
    // Si el mensaje es válido para varios días
    if (currentDay === 0 && nextDay > 0) {
      return i18n.language === 'en' ? `First ${currentHour} hours` : `Primeras ${currentHour} horas`;
    }
    
    if (nextDay - currentDay === 1) {
      return i18n.language === 'en' ? `Day ${currentDay}` : `Día ${currentDay}`;
    }
    
    return i18n.language === 'en' ? `Days ${currentDay}-${nextDay - 1}` : `Días ${currentDay}-${nextDay - 1}`;
  };

  // Función para limpiar referencias redundantes a días en el texto
  const cleanDayReferences = (text: string) => {
    // Eliminar patrones como "Día X:", "Hora X:", etc. al inicio del texto
    return text
      .replace(/^(Día \d+:|Hora \d+:|Minuto \d+:)\s*/i, '')
      .replace(/^(Primeras? \d+ horas?:|Primera semana|Primer día|Un año completo|Medio año completo|Fin mes \d+|Fin fase [^.]+)\.\s*/i, '')
      .trim();
  };

  // Traducir contenido si el idioma es inglés
  const translateContent = (text: string) => {
    if (i18n.language !== 'en') return text;
    
    // Mapeo de traducciones comunes
    const translations: Record<string, string> = {
      // Síntesis
      "Minuto 20: Tu frecuencia cardíaca y la presión arterial comienzan a normalizarse.": 
        "Minute 20: Your heart rate and blood pressure begin to normalize.",
      "Hora 24: Primer día completo. Tus pulmones te lo agradecen.": 
        "Hour 24: First full day. Your lungs thank you.",
      "Día 7: Primera semana completada. Síntomas físicos en meseta, fatiga mental persistente.": 
        "Day 7: First week completed. Physical symptoms plateauing, mental fatigue persists.",
      "Día 14: Fin fase aguda. Síntomas físicos disminuyen 70%. Vulnerabilidad emocional emergente.": 
        "Day 14: End of acute phase. Physical symptoms decrease by 70%. Emerging emotional vulnerability.",
      "Día 28: Fin mes 1. Síntomas físicos 90% resueltos. Desafío: evitar autocomplacencia.": 
        "Day 28: End of month 1. Physical symptoms 90% resolved. Challenge: avoid self-complacency.",
      "Día 60: Fin fase emocional. Riesgo recaída disminuye 70%. Atención a complacencia.": 
        "Day 60: End of emotional phase. Relapse risk decreases by 70%. Watch for complacency.",
      "Día 90: Hito final. 90% de probabilidad de abstinencia permanente si llegaste hasta aquí.": 
        "Day 90: Final milestone. 90% probability of permanent abstinence if you've made it this far.",
      "Día 180: Medio año completo. Hito crítico de recuperación cardiovascular total.": 
        "Day 180: Half year complete. Critical milestone of total cardiovascular recovery.",
      "Día 365: UN AÑO COMPLETO. Transformación integral completada.": 
        "Day 365: ONE FULL YEAR. Comprehensive transformation completed.",
      
      // Consejos
      "Respira profundamente durante 2 minutos. Inhala 4 segundos, mantén 4, exhala 6.": 
        "Breathe deeply for 2 minutes. Inhale for 4 seconds, hold for 4, exhale for 6.",
      "Observa tres cambios físicos sutiles: respiración, hidratación, energía.": 
        "Observe three subtle physical changes: breathing, hydration, energy.",
      "Autoevaluación: registra mejoría en respiración, gusto e hidratación cutánea.": 
        "Self-assessment: record improvement in breathing, taste, and skin hydration.",
      "Revisa registro día 1. Anota 3 mejoras físicas objetivas.": 
        "Review day 1 record. Note 3 objective physical improvements.",
      "Revisa todos tus registros emocionales. Crea collage de mejorías.": 
        "Review all your emotional records. Create a collage of improvements.",
      "Revisión completa de registros. Carta a tu yo del día 1 describiendo el ahora.": 
        "Complete review of records. Letter to your day 1 self describing the now.",
      "Análisis retrospectivo: documenta tu viaje para futura referencia.": 
        "Retrospective analysis: document your journey for future reference.",
      "Experiencia que antes no podías disfrutar por falta de aire.": 
        "Experience that you couldn't enjoy before due to shortness of breath.",
      "Documentación científica de tu proceso: análisis de datos biométricos y psicológicos.": 
        "Scientific documentation of your process: analysis of biometric and psychological data.",
      
      // Recordatorios
      "Ya sin nicotina, el sistema cardiovascular inicia su reajuste.": 
        "Now without nicotine, the cardiovascular system begins its readjustment.",
      "Este primer día es un antes y un después. Ya no eres la misma persona.": 
        "This first day is a before and after. You are no longer the same person.",
      "Tu cuerpo ha eliminado 80% de solventes acumulados.": 
        "Your body has eliminated 80% of accumulated solvents.",
      "Superaste la fase bioquímica más difícil.": 
        "You've overcome the most difficult biochemical phase.",
      "Superaste la fase fisiológica crítica. Ahora inicia el verdadero trabajo.": 
        "You've overcome the critical physiological phase. Now the real work begins.",
      "Superaste el período de mayor vulnerabilidad psicológica.": 
        "You've overcome the period of greatest psychological vulnerability.",
      "Has rewireado tu cerebro y reclamado tu autonomía.": 
        "You've rewired your brain and reclaimed your autonomy.",
      "Tu corazón y arterias funcionan sin el estrés de la nicotina.": 
        "Your heart and arteries function without the stress of nicotine.",
      "Has completado una de las transformaciones más difíciles posibles.": 
        "You've completed one of the most difficult transformations possible.",
      
      // Contrarréplicas
      "No es ansiedad. Es el cuerpo recuperando su ritmo autónomo.": 
        "It's not anxiety. It's the body recovering its autonomous rhythm.",
      "No es un pequeño logro. Es un paso de gigante.": 
        "It's not a small achievement. It's a giant step.",
      "No estoy igual. Estoy en proceso activo de desintoxicación.": 
        "I'm not the same. I'm in an active detoxification process.",
      "No fue suerte. Fue mi cuerpo demostrando capacidad reparadora.": 
        "It wasn't luck. It was my body demonstrating its reparative capacity.",
      "No estoy 'curade'. Estoy en transición a mantenimiento emocional.": 
        "I'm not 'cured'. I'm transitioning to emotional maintenance.",
      "No estoy 'curade'. Estoy en mantenimiento activo permanente.": 
        "I'm not 'cured'. I'm in permanent active maintenance.",
      "Si esto es estar curade, vaya m*.": 
        "If this is being cured, it sucks.",
      "No estoy curade, estoy reequilibrando mi sistema emocional. Jode, pero ten paciencia: se pasa y mejora.": 
        "I'm not cured, I'm rebalancing my emotional system. It sucks, but be patient: it passes and improves.",
      "No es mejora. Es funcionamiento óptimo recuperado.": 
        "It's not improvement. It's recovered optimal functioning.",
      "No soy ex-vaper. Soy alguien que una vez vapeo y eligió dejar de hacerlo.": 
        "I'm not an ex-vaper. I'm someone who once vaped and chose to stop doing it."
    };
    
    // Buscar traducción exacta
    if (translations[text]) {
      return translations[text];
    }
    
    // Si no hay traducción exacta, devolver el texto original
    return text;
  };

  // FUNCIÓN COMPLETAMENTE REESCRITA - Pensamientos intrusivos más realistas y contrarréplicas sin sesgo neoliberal
  const getIntrusiveThoughtForResponse = (contrareplica: string) => {
    // Mapeo COMPLETAMENTE REESCRITO con contrarréplicas sobrias, realistas y sin pretensiones
    const responseToThoughtMap: { [key: string]: string } = {
      // === PRIMERAS HORAS/DÍAS - REALISMO CRUDO ===
      "No es una pérdida. Es el comienzo de mi libertad.": i18n.language === 'en' ? "I've lost something important by quitting vaping" : "He perdido algo importante al dejar de vapear",
      "No es ansiedad. Es el cuerpo recuperando su ritmo autónomo.": i18n.language === 'en' ? "This anxiety means something is wrong" : "Esta ansiedad significa que algo va mal",
      "No estoy nerviose. Estoy transitando el reinicio bioquímico.": i18n.language === 'en' ? "These nerves are a sign that I need to vape" : "Estos nervios son una señal de que necesito vapear",
      "Cada vez que he cedido 'solo una calada', he vuelto a vapear en días. Este pensamiento no funciona.": i18n.language === 'en' ? "Just one puff won't hurt" : "Solo una calada no hará daño",
      "No estoy enferme. Estoy drenando residuos químicos acumulados.": i18n.language === 'en' ? "I'm getting sick without vaping" : "Me estoy poniendo enferme sin el vapeo",
      "No estoy agotade. Mi cuerpo está trabajando en su limpieza interna.": i18n.language === 'en' ? "I'm too tired, I need energy from vaping" : "Estoy demasiado cansade, necesito energía del vapeo",
      "No es hambre real. Es mi sistema buscando estabilidad.": i18n.language === 'en' ? "I'm constantly hungry without vaping" : "Tengo hambre constante sin vapear",
      "No es una recaída en la salud. Es una mejora que se manifiesta con limpieza.": i18n.language === 'en' ? "This cough means I'm getting worse" : "Esta tos significa que estoy empeorando",
      "No es casualidad. Es una transformación lenta pero segura.": i18n.language === 'en' ? "These changes are coincidental, not real" : "Estos cambios son casuales, no reales",
      "No es un pequeño logro. Es un paso de gigante.": i18n.language === 'en' ? "One day is nothing, it's very little progress" : "Un día no es nada, es muy poco progreso",
      
      // === CONTRARRÉPLICAS CORREGIDAS - SIN SESGO NEOLIBERAL ===
      "Si esto es estar curade, vaya m*.": i18n.language === 'en' ? "If this is being cured, it sucks" : "Si esto es estar curade, vaya m*",
      "No estoy curade, estoy reequilibrando mi sistema emocional. Jode, pero ten paciencia: se pasa y mejora.": i18n.language === 'en' ? "I'm not cured, I'm rebalancing my emotional system. It sucks, but be patient: it passes and improves." : "No estoy curade, estoy reequilibrando mi sistema emocional. Jode, pero ten paciencia: se pasa y mejora.",
      "No es el fin ni el inicio. Es solo un día más sin propilenglicol en los bronquios.": i18n.language === 'en' ? "This is the end of the process" : "Esto es el fin del proceso", 
      "Fin de proceso no hay. Lo que hay es menos interferencia. Y eso ya es bastante.": i18n.language === 'en' ? "This is the end of the process" : "Esto es el fin del proceso",
      "Sí, el subidón se ha ido. Pero también se fue la ansiedad química. Algo se equilibra.": i18n.language === 'en' ? "This is the end of the process" : "Esto es el fin del proceso",
      "Si esto es el fin, es de algo que no era mío. Y lo que viene, ya veremos si me gusta.": i18n.language === 'en' ? "This is the end of the process" : "Esto es el fin del proceso",
      
      // === DÍAS INTERMEDIOS - REALISMO CORPORAL ===
      "No es necesidad. Es automatismo que puede ser interrumpido.": i18n.language === 'en' ? "I really need to vape now" : "Realmente necesito vapear ahora",
      "No es déficit de atención. Es deshabituación del estímulo nicotínico constante.": i18n.language === 'en' ? "I can't concentrate without nicotine" : "No puedo concentrarme sin nicotina",
      "No estoy perdiendo el control. Estoy aprendiendo a manejarme sin filtros químicos.": i18n.language === 'en' ? "I'm losing control of my emotions" : "Estoy perdiendo el control de mis emociones",
      "No necesito excitar mi mente artificialmente. Puedo cultivarla desde dentro.": i18n.language === 'en' ? "My mind is dull without stimulation" : "Mi mente está apagada sin estimulación",
      "No son cambios sutiles. Es mi cuerpo respirando vida sin obstáculos.": i18n.language === 'en' ? "I don't notice any real change" : "No noto ningún cambio real",
      "No es insomnio. Es reinicio del sistema reparador nocturno.": i18n.language === 'en' ? "I can't sleep without vaping" : "No puedo dormir sin vapear",
      "No es casualidad. Es la microbiota agradeciendo el cambio de condiciones.": i18n.language === 'en' ? "These digestive problems are coincidental" : "Estos problemas digestivos son casuales",
      "No es migraña. Es cerebro recibiendo flujo sanguíneo completo.": i18n.language === 'en' ? "This headache is unbearable" : "Este dolor de cabeza es insoportable",
      "No es infección. Es boca limpiando residuos de saborizantes.": i18n.language === 'en' ? "I have some infection in my mouth" : "Tengo alguna infección en la boca",
      "No es bronquitis. Es árbol respiratorio reconstruyendo defensas.": i18n.language === 'en' ? "This cough seems like bronchitis" : "Esta tos parece bronquitis",
      "No es alergia. Es mucosas recuperando protección natural.": i18n.language === 'en' ? "I must be allergic to something" : "Debo ser alérgico a algo",
      "No estoy igual. Estoy en proceso activo de desintoxicación.": i18n.language === 'en' ? "I haven't changed anything, I'm still the same" : "No he cambiado nada, sigo igual",
      
      // === CONTRARRÉPLICAS ADICIONALES CORREGIDAS ===
      "No es enfermedad. Es hígado metabolizando sin aditivos.": i18n.language === 'en' ? "My liver must be sick" : "Mi hígado debe estar enfermo",
      "No necesito vaporizar. Pulmones recomponiendo estructura alveolar.": i18n.language === 'en' ? "I need to vape to breathe better" : "Necesito vapear para respirar mejor",
      "No es gingivitis. Es microbioma restaurando equilibrio.": i18n.language === 'en' ? "I have gingivitis from quitting vaping" : "Tengo gingivitis por dejar de vapear",
      "No es casualidad. Es piel recuperando homeostasis hídrica.": i18n.language === 'en' ? "My skin is worse by coincidence" : "Mi piel está peor por casualidad",
      "Siempre que he pensado 'solo una calada', he terminado vapeando regularmente en días o semanas.": i18n.language === 'en' ? "Just one puff to prove I have control" : "Solo una calada para probar que tengo control",
      "No es indigestión. Es intestino recuperando ritmo natural.": i18n.language === 'en' ? "I have digestive problems without vaping" : "Tengo problemas digestivos sin vapear",
      "No fue suerte. Fue mi cuerpo demostrando capacidad reparadora.": i18n.language === 'en' ? "I've made it this far by luck" : "He llegado hasta aquí por suerte",
      "No es fatiga crónica. Es órgano dedicando energía a detoxificación.": i18n.language === 'en' ? "I have chronic fatigue" : "Tengo fatiga crónica",
      "No necesito vapor. Necesito tiempo para reconstrucción alveolar.": i18n.language === 'en' ? "I need vapor to feel normal" : "Necesito vapor para sentirme normal",
      "No es colon irritable. Es microbioma restableciendo equilibrio.": i18n.language === 'en' ? "I have irritable bowel syndrome" : "Tengo síndrome de colon irritable",
      "No es TDA. Es atención aprendiendo a sostenerse sin estimulantes.": i18n.language === 'en' ? "I have attention deficit" : "Tengo déficit de atención",
      "No es mejor imaginada. Es mi sistema vascular funcionando sin tóxicos.": i18n.language === 'en' ? "This improvement is just imagination" : "Esta mejora es solo imaginación",
      "No necesito vapear. Necesito reconfigurar respuestas contextuales.": i18n.language === 'en' ? "I need to vape in certain situations" : "Necesito vapear en ciertas situaciones",
      "No soy invulnerable. Mantengo vigilancia atenta sin paranoia.": i18n.language === 'en' ? "I'm invulnerable to relapses" : "Soy invulnerable a las recaídas",
      
      // === IDENTIDAD Y CONSOLIDACIÓN - SIN PRETENSIONES ===
      "No soy ex-vaper. Soy alguien que no vapea.": i18n.language === 'en' ? "I'm an ex-vaper, I'll always be one" : "Soy un ex-vaper, siempre lo seré",
      "No soy 'ex-adicte'. Soy alguien en recuperación consolidada.": i18n.language === 'en' ? "I'll always be an ex-addict" : "Siempre seré un ex-adicte",
      "No es ruido neuronal sin significado.": i18n.language === 'en' ? "These thoughts have real meaning" : "Estos pensamientos tienen significado real",
      "No soy fríe. Estoy aprendiendo a relacionarme sin intermediarios químicos.": i18n.language === 'en' ? "I've become emotionally cold" : "Me he vuelto fríe emocionalmente",
      "No es euforia. Es mi mente funcionando sin bloqueos químicos.": i18n.language === 'en' ? "This creativity is just temporary euphoria" : "Esta creatividad es solo euforia temporal",
      "No necesito escapar. Puedo sostener lo que sea temporalmente.": i18n.language === 'en' ? "I need to escape this discomfort" : "Necesito escapar de este malestar",
      "No es permanente. Es el último intento de la adicción por sobrevivir.": i18n.language === 'en' ? "This sadness is permanent" : "Esta tristeza es permanente",
      
      // === TRISTEZA Y EMOCIONES - CORREGIDAS ===
      "Prefiero vapear y no estar tan triste - Estudios muestran que la tristeza post-cesación es temporal (6-12 semanas), pero vapear perpetúa la disregulación dopaminérgica indefinidamente.": i18n.language === 'en' ? "I prefer to vape and not be so sad" : "Prefiero vapear y no estar tan triste",
      "No extraño vapear. Extraño la falsa solución emocional que ofrecía.": i18n.language === 'en' ? "I really miss vaping" : "Extraño vapear realmente",
      "No estoy reviviendo. Estoy recordando sin anestesia química.": i18n.language === 'en' ? "I'm reliving past traumas" : "Estoy reviviendo traumas del pasado",
      "No es depresión. Es sistema recompensa aprendiendo a funcionar sin estímulos artificiales.": i18n.language === 'en' ? "I'm depressed without vaping" : "Estoy deprimido sin vapear",
      "No es hipocondría. Es reconexión mente-cuerpo post-adicción.": i18n.language === 'en' ? "I'm becoming hypochondriac" : "Me estoy volviendo hipocondríaco",
      "No es esfuerzo. Es creación de caminos neuronales alternativos.": i18n.language === 'en' ? "This requires too much effort" : "Esto requiere demasiado esfuerzo",
      "No es suerte. Es resultado de trabajo neuroemocional constante.": i18n.language === 'en' ? "I've been lucky so far" : "He tenido suerte hasta ahora",
      "No es deseo real. Es memoria condicionada buscando activación.": i18n.language === 'en' ? "I really want to vape" : "Realmente deseo vapear",
      "No necesito vapear para calmarme. Tengo recursos internos suficientes.": i18n.language === 'en' ? "I need to vape to calm down" : "Necesito vapear para calmarme",
      "No es insomnio residual. Es sueño natural sin alteraciones químicas.": i18n.language === 'en' ? "I have residual insomnia" : "Tengo insomnio residual",
      
      // === LOGROS Y PROGRESO - REALISTAS ===
      "No es poco. Es suficiente para un cerebro en recalibración.": i18n.language === 'en' ? "These small pleasures are not enough" : "Estos pequeños placeres no son suficientes",
      "No es peligro. Es oportunidad para reconfigurar asociaciones.": i18n.language === 'en' ? "Being in these places is dangerous" : "Estar en estos lugares es peligroso",
      "No es premonición. Es cerebro procesando el cambio de identidad.": i18n.language === 'en' ? "These dreams are premonitions of relapse" : "Estos sueños son premoniciones de recaída",
      "No soy plane. Soy estable sin alteraciones químicas externas.": i18n.language === 'en' ? "I've become emotionally flat" : "Me he vuelto emocionalmente plane",
      "No es autoengaño. Es evidencia acumulada de mi capacidad de cambio.": i18n.language === 'en' ? "I'm fooling myself" : "Me estoy autoengañando",
      "No es vacío. Es espacio para autoconocimiento sin intermediarios.": i18n.language === 'en' ? "I feel an existential void" : "Siento un vacío existencial",
      "No es tentación. Es el eco de un hábito moribundo.": i18n.language === 'en' ? "This is a real temptation" : "Esta es una tentación real",
      "No es automático. Es el fruto de mi trabajo neuroemocional.": i18n.language === 'en' ? "This should be automatic by now" : "Esto debería ser automático ya",
      "No es pérdida de tiempo. Es inversión en reparación neurológica.": i18n.language === 'en' ? "Sleeping so much is a waste of time" : "Dormir tanto es pérdida de tiempo",
      "No soy frágil. Soy adaptable sin soluciones químicas.": i18n.language === 'en' ? "I'm too fragile for this" : "Soy demasiado frágil para esto",
      "No es somatización. Es reconexión con sabiduría corporal.": i18n.language === 'en' ? "I'm somatizing problems" : "Estoy somatizando problemas",
      "No es inspiración repentina. Es mi mente liberada de bloqueos químicos.": i18n.language === 'en' ? "This creativity is just temporary inspiration" : "Esta creatividad es solo inspiración temporal",
      
      // === MANTENIMIENTO Y CONSOLIDACIÓN FINAL - SIN GRANDILOCUENCIA ===
      "No estoy 'curade'. Estoy en mantenimiento activo permanente.": i18n.language === 'en' ? "I'm completely cured now" : "Ya estoy curade completamente",
      "No es esfuerzo. Es mantenimiento de logros.": i18n.language === 'en' ? "Maintaining this requires too much effort" : "Mantener esto requiere demasiado esfuerzo",
      "No es autoengaño. Es reconocimiento de evidencia objetiva.": i18n.language === 'en' ? "I'm fooling myself with these achievements" : "Me estoy autoengañando con estos logros",
      "No soy rare. Soy coherente con mis valores de salud.": i18n.language === 'en' ? "I'm weird for not vaping" : "Soy rare por no vapear",
      "No necesito química externa. Tengo herramientas psicológicas efectivas.": i18n.language === 'en' ? "I need external chemical help" : "Necesito ayuda química externa",
      "No es meditación. Es vivir con conciencia plena.": i18n.language === 'en' ? "This is just new age meditation" : "Esto es solo meditación new age",
      "No es aburrido. Es libertad sin lucha constante.": i18n.language === 'en' ? "Life without vaping is boring" : "La vida sin vapear es aburrida",
      "No soy experte. Soy compañere de camino con experiencia.": i18n.language === 'en' ? "I'm an expert in quitting vaping" : "Soy un experte en dejar de vapear",
      "No es suerte. Es consecuencia de mi consistencia.": i18n.language === 'en' ? "I've been very lucky" : "He tenido mucha suerte",
      "No es sobrehumano. Es funcionamiento cerebral basal sin interferencias.": i18n.language === 'en' ? "This is superhuman, not normal" : "Esto es sobrehumano, no normal",
      "No es automático. Es el fruto de mi trabajo constante.": i18n.language === 'en' ? "This should be automatic" : "Esto debería ser automático",
      "No es fantasía. Es diseño consciente de vida libre.": i18n.language === 'en' ? "This is just fantasy" : "Esto es solo fantasía",
      "No soy frágil. Soy humane con historia adictiva que requiere vigilancia.": i18n.language === 'en' ? "I'm too fragile" : "Soy demasiado frágil",
      "No es olvido. Es sanación de memoria emocional adictiva.": i18n.language === 'en' ? "I'm forgetting my past" : "Estoy olvidando mi pasado",
      "No es vigilancia excesiva. Es autocuidado consciente.": i18n.language === 'en' ? "I'm being too vigilant" : "Estoy siendo demasiado vigilante",
      "No es tiempo extra. Es vida recuperada.": i18n.language === 'en' ? "This is just extra time" : "Esto es solo tiempo extra",
      "No es lujo. Es necesidad biológica no negociable.": i18n.language === 'en' ? "Sleeping so much is a luxury" : "Dormir tanto es un lujo",
      "No es hiperestesia. Es percepción normal recuperada.": i18n.language === 'en' ? "I have hypersensitivity" : "Tengo hipersensibilidad",
      "No soy invulnerable. Soy resiliente con recursos comprobados.": i18n.language === 'en' ? "I'm invulnerable now" : "Soy invulnerable ahora",
      "No es hipocondría. Es diálogo somático saludable.": i18n.language === 'en' ? "I'm becoming hypochondriac" : "Me estoy volviendo hipocondríaco",
      "No es indiferencia. Es emancipación de la necesidad química.": i18n.language === 'en' ? "I've become indifferent" : "Me he vuelto indiferente",
      "No soy especial. Soy evidencia de que la recuperación es posible.": i18n.language === 'en' ? "I'm special for having achieved this" : "Soy especial por haber logrado esto",
      "No es fantasía. Es diseño activo de vida post-adicción.": i18n.language === 'en' ? "This is pure fantasy" : "Esto es pura fantasía",
      "No es carga. Es inversión en calidad de vida sostenida.": i18n.language === 'en' ? "Maintaining this is a burden" : "Mantener esto es una carga",
      "No merezco castigo. Merezco disfrutar mi recuperación plenamente.": i18n.language === 'en' ? "I don't deserve to be well" : "No merezco estar bien",
      "No soy mi historia. Soy mi presente libre.": i18n.language === 'en' ? "I am my addictive history" : "Soy mi historia adictiva",
      "No es paranoia. Es prudencia basada en conocimiento.": i18n.language === 'en' ? "I'm being paranoid" : "Estoy siendo paranoico",
      "No fue suerte. Fue disciplina, conocimiento y autocompasión.": i18n.language === 'en' ? "This was all just luck" : "Todo esto fue pura suerte",
      "No soy superior. Soy compañere de viaje con experiencia acumulada.": i18n.language === 'en' ? "I'm superior to those who vape" : "Soy superior a los que vapean",
      "No es casualidad. Es consecuencia directa de mi compromiso.": i18n.language === 'en' ? "These changes are coincidental" : "Estos cambios son casuales",
      "No es mejora. Es funcionamiento óptimo recuperado.": i18n.language === 'en' ? "This is just a temporary improvement" : "Esto es solo una mejora temporal",
      "No evito. Elijo conscientemente.": i18n.language === 'en' ? "I'm avoiding situations out of fear" : "Estoy evitando situaciones por miedo",
      "No es regeneración milagrosa. Es capacidad natural del cuerpo.": i18n.language === 'en' ? "This is miraculous regeneration" : "Esto es regeneración milagrosa",
      "No es metáfora. Es transformación literal neurobiológica.": i18n.language === 'en' ? "This is just a metaphor" : "Esto es solo una metáfora",
      "No es esfuerzo. Es estilo de vida integrado.": i18n.language === 'en' ? "This requires too much effort" : "Esto requiere demasiado esfuerzo",
      "No es presunción. Es celebración legítima de victoria personal.": i18n.language === 'en' ? "I'm being presumptuous" : "Estoy siendo presuntuoso",
      "No es promesa. Es declaración de intención basada en evidencia.": i18n.language === 'en' ? "This is just an empty promise" : "Esto es solo una promesa vacía",
      "No es genética, simplemente decido no vapear, mi cuerpo hará el resto progresivamente": i18n.language === 'en' ? "It's genetic, I can't change my addictive tendency" : "Es genético, no puedo cambiar mi tendencia adictiva",
      "No soy ex-vaper. Soy alguien que una vez vapeo y eligió dejar de hacerlo.": i18n.language === 'en' ? "I'll always be an ex-vaper" : "Siempre seré un ex-vaper"
    };

    // Buscar coincidencia exacta
    if (responseToThoughtMap[contrareplica]) {
      return responseToThoughtMap[contrareplica];
    }

    // Si no hay coincidencia exacta, generar pensamiento genérico pero coherente
    if (contrareplica.includes("No es") || contrareplica.includes("No soy")) {
      // Extraer lo que se está negando y convertirlo en pensamiento positivo
      const negatedConcept = contrareplica.replace("No es ", "").replace("No soy ", "").split(".")[0];
      return i18n.language === 'en' ? 
        `Yes, it is ${negatedConcept.toLowerCase()}` : 
        `Sí es ${negatedConcept.toLowerCase()}`;
    }

    // Fallback genérico
    return i18n.language === 'en' ? 
      "This isn't working as I expected" : 
      "Esto no está funcionando como esperaba";
  };

  const dayContent = getCurrentDayContent();
  const hoursSince = startDate ? Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60)) : 0;

  if (!dayContent) return null;

  const intrusiveThought = getIntrusiveThoughtForResponse(dayContent.contrareplica);
  const validityPeriod = getValidityPeriod(dayContent.hora);

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50">
      <CardContent className="space-y-4 p-6">
        <div className="space-y-3">
          {/* COLORES SIMPLIFICADOS - Solo azul y gris */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-700 mb-1">{t('dayContent.evolution', { period: validityPeriod })}:</p>
            <p className="text-gray-700">{translateContent(cleanDayReferences(dayContent.sintesis))}</p>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-700 mb-1">{t('dayContent.advice')}:</p>
            <p className="text-gray-700">{translateContent(cleanDayReferences(dayContent.consejo))}</p>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-700 mb-1">{t('dayContent.reminder')}:</p>
            <p className="text-gray-700">{translateContent(cleanDayReferences(dayContent.recordatorio))}</p>
          </div>
          
          {/* Mantener rojo para pensamiento intrusivo y verde para contrarréplica */}
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">{t('dayContent.intrusiveThought')}:</p>
            
            {/* Pensamiento intrusivo en rojo */}
            <div className="bg-red-100 p-2 rounded mb-2 border-l-4 border-red-400">
              <p className="text-red-800 italic">"{intrusiveThought}"</p>
            </div>
            
            {/* Contrarréplica en verde */}
            <div className="bg-green-100 p-2 rounded border-l-4 border-green-400">
              <p className="text-sm font-medium text-green-700 mb-1">{t('dayContent.counterResponse')}:</p>
              <p className="text-green-800 font-medium italic">"{translateContent(dayContent.contrareplica)}"</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DayContentCard;