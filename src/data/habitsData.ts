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
    name: 'Daily Exercise (20-30 min)',
    shortName: 'Quick Exercise',
    description: 'Daily physical activity to combat cravings',
    routine: 'Walk briskly, swim or bike for 20 min/day. If a vaping craving arises, do 5 min of intense activity (squats, jumps).',
    scientificBasis: 'Reduces cravings and stress by releasing endorphins',
    vapeAdjustment: 'Accelerates recovery of respiratory passages irritated by vapor',
    reference: 'Taylor et al., 2007',
    icon: '🏃‍♂️',
    category: 'physical'
  },
  {
    id: 'programmed_hydration',
    name: 'Programmed Hydration',
    shortName: 'Water vs Craving',
    description: 'Strategic hydration against cravings',
    routine: 'Drink 1 glass of water upon waking and before each meal. Take a sip when feeling the urge to vape.',
    scientificBasis: 'Eliminates accumulated nicotine/glycerin residues and reduces "cotton mouth"',
    vapeAdjustment: 'Mitigates the sensory need for flavor or moisture in the mouth',
    reference: 'NIH/NIDA',
    icon: '💧',
    category: 'physical'
  },
  {
    id: 'breathing_4_6',
    name: '4-6 Breathing for Acute Cravings',
    shortName: 'Breathe 4-6',
    description: 'Breathing technique for emergencies',
    routine: 'Inhale 4s → Hold 2s → Exhale 6s (repeat 5 times) when feeling the urge to vape.',
    scientificBasis: 'Reduces cortisol and anxiety in seconds',
    vapeAdjustment: 'Substitutes the physical ritual of deep inhalation',
    reference: 'Zope & Zope, 2013',
    icon: '🌬️',
    category: 'mental'
  },
  {
    id: 'strict_sleep_schedule',
    name: 'Strict Sleep Schedule',
    shortName: 'Strict Sleep',
    description: 'Sleep routine for impulse control',
    routine: 'Go to bed/wake up at the same time (±30 min). Turn off screens 1 h before.',
    scientificBasis: 'Improves impulse control and reduces relapses',
    vapeAdjustment: 'Breaks the habit of vaping in bed',
    reference: 'Jaehne et al., 2009',
    icon: '😴',
    category: 'behavioral'
  },
  {
    id: 'protein_reinforcement',
    name: 'Protein Reinforcement in Meals',
    shortName: 'Satiating Proteins',
    description: 'Glycemic stabilization against anxiety',
    routine: 'Include egg, Greek yogurt or legumes in breakfast/lunch. Eat every 3-4 h.',
    scientificBasis: 'Stabilizes glucose and reduces anxiety by 24%',
    vapeAdjustment: 'Counteracts "anxiety peaks" from fast liquid nicotine',
    reference: 'Spring et al., 2008',
    icon: '🥚',
    category: 'physical'
  },
  {
    id: 'manual_substitute',
    name: 'Manual Substitute for the Device',
    shortName: 'Busy Hand',
    description: 'Manipulable object as substitute',
    routine: 'Always carry a manipulable object (pen, coin, fidget spinner). Use it when noticing "empty hand".',
    scientificBasis: 'Breaks hand-to-mouth reflex',
    vapeAdjustment: 'Priority due to the constant portability of the vaper',
    reference: 'American Lung Association',
    icon: '✋',
    category: 'behavioral'
  },
  {
    id: 'nature_walks',
    name: 'Daily Nature Walks',
    shortName: 'Daily Nature',
    description: 'Connection with nature against rumination',
    routine: '15 min/day in park/trees (without bringing vaper). Observe plants/birds.',
    scientificBasis: 'Reduces mental rumination associated with relapses',
    vapeAdjustment: 'Decreases automatic vaping due to boredom',
    reference: 'Bratman et al., 2015',
    icon: '🌳',
    category: 'mental'
  },
  {
    id: 'social_commitment',
    name: 'Weekly Social Commitment',
    shortName: 'Weekly Support',
    description: 'Support network for accountability',
    routine: 'Weekly date with someone who knows you quit vaping. Report your progress.',
    scientificBasis: 'Increases success by 50% vs. solo attempts',
    vapeAdjustment: 'Combats the isolation typical of solitary vaping',
    reference: 'Stead et al., 2017',
    icon: '👥',
    category: 'social'
  },
  {
    id: 'clock_technique',
    name: 'Clock Technique for Cravings',
    shortName: 'Wait 5 Min',
    description: 'Delay technique for cravings',
    routine: 'When feeling the urge: 1) Look at the clock 2) Wait 5 min without acting 3) Reassess.',
    scientificBasis: '90% of cravings decrease in intensity',
    vapeAdjustment: 'Neutralizes the immediacy of the liquid nicotine "hit"',
    reference: 'Bowen & Marlatt, 2009',
    icon: '⏳',
    category: 'mental'
  }
];

export const createHabit = (baseHabit: Omit<Habit, 'isActive'>): Habit => ({
  ...baseHabit,
  isActive: false
});