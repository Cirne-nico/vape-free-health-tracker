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
    title: 'The Smoke of a Thousand Faces',
    description: 'Overcome the illusion of immediate relief',
    days: 1,
    icon: '🌫️',
    challenge: 'Like a smoke hydra that takes a thousand forms: anxiety, boredom, pleasure, sadness. Each defeated face reveals the next.',
    reward: 'Recognition of self-deception patterns',
    nikotisInfluence: 'Nikotis whispers: "You just need one puff to feel better"',
    herculaResponse: 'Hercula observes: "The forms of smoke change, but the wind disperses them all the same"'
  },
  {
    id: 'routine_lion',
    title: 'The Lion of Routine',
    description: 'Break the automated daily habit',
    days: 3,
    icon: '🦁',
    challenge: 'A beast sleeping at the foot of the desk, roaring every time the phone is turned on or the coffee is finished.',
    reward: 'Freedom from conditioned automatisms',
    nikotisInfluence: 'Nikotis roars: "Your routine is incomplete without me"',
    herculaResponse: 'Hercula walks: "Paths open when we stop following yesterday\'s footprints"'
  },
  {
    id: 'empty_hands_cave',
    title: 'The Cave of Empty Hands',
    description: 'Resist the physical need to have something between your fingers',
    days: 5,
    icon: '🕳️',
    challenge: 'Hercula traverses a tunnel of echo and anxiety where her hands tremble and search without finding.',
    reward: 'Reconnection with natural tactile sensitivity',
    nikotisInfluence: 'Nikotis murmurs: "Your hands are empty, like your life without me"',
    herculaResponse: 'Hercula feels: "Empty hands can feel the whole world"'
  },
  {
    id: 'first_monday_swamp',
    title: 'The First Monday Swamp',
    description: 'Get through the first workday without vaping',
    days: 7,
    icon: '🌊',
    challenge: 'Emotional and nervous quagmire where feet sink and will slips.',
    reward: 'Demonstration that work is possible without nicotine',
    nikotisInfluence: 'Nikotis shouts: "You won\'t be able to concentrate or perform without me"',
    herculaResponse: 'Hercula advances: "Each step in the mud teaches where the firm ground is"'
  },
  {
    id: 'insomnia_serpent',
    title: 'The Serpent of Insomnia',
    description: 'Sleep without the false calm of nighttime vaping',
    days: 10,
    icon: '🐍',
    challenge: 'A silent serpent that coils around the chest, whispering that one puff will bring back sleep.',
    reward: 'Recovery of natural and restorative sleep',
    nikotisInfluence: 'Nikotis hisses: "Without me, you\'ll never sleep peacefully again"',
    herculaResponse: 'Hercula lies down: "Sleep comes when the body remembers its own rhythms"'
  },
  {
    id: 'gray_days_mirror',
    title: 'The Mirror of Gray Days',
    description: 'Accept the serotonin dip without retreating',
    days: 14,
    icon: '🪞',
    challenge: 'A mirror that distorts daylight: everything seems more boring, slower, more useless. But you have to go through it.',
    reward: 'Understanding that sadness is temporary and adaptive',
    nikotisInfluence: 'Nikotis reflects: "Look how gray your life is without me"',
    herculaResponse: 'Hercula looks: "Foggy mirrors also clear with time"'
  },
  {
    id: 'celebrations_island',
    title: 'The Island of Celebrations',
    description: 'Don\'t relapse during a party, birthday or celebration',
    days: 21,
    icon: '🎉',
    challenge: 'A place full of music and toasts, where Nikotis appears disguised as nostalgia and joy.',
    reward: 'Ability to celebrate without the need for substances',
    nikotisInfluence: 'Nikotis sings: "Parties aren\'t the same without me"',
    herculaResponse: 'Hercula dances: "The music sounds the same, only the listener changes"'
  },
  {
    id: 'anxiety_bridge',
    title: 'The Bridge of Anxiety',
    description: 'Endure a crisis without using vaping as anesthesia',
    days: 30,
    icon: '🌉',
    challenge: 'A wobbly bridge between two emotional cliffs. It can only be crossed by breathing deeply.',
    reward: 'Development of genuine self-regulation tools',
    nikotisInfluence: 'Nikotis threatens: "You\'ll fall into the void without my support"',
    herculaResponse: 'Hercula crosses: "Bridges are sustained step by step, not all at once"'
  },
  {
    id: 'judgment_crows',
    title: 'The Crows of Internal Judgment',
    description: 'Overcome the self-criticism that whispers: "You\'re going to fail"',
    days: 40,
    icon: '🐦‍⬛',
    challenge: 'Black flocks that caw doubts over the shoulder. The challenge: not to fight them, but to let them pass.',
    reward: 'Liberation from destructive self-criticism',
    nikotisInfluence: 'Nikotis caws: "You\'re weak, you\'ve always been weak"',
    herculaResponse: 'Hercula listens: "Crows fly, but the sky remains"'
  },
  {
    id: 'comparison_mountain',
    title: 'The Mountain of Comparison',
    description: 'Avoid judging those who do consume',
    days: 50,
    icon: '⛰️',
    challenge: 'A misty peak where Nikotis\' voice murmurs: "Others handle it, you could too."',
    reward: 'Acceptance that each path is unique',
    nikotisInfluence: 'Nikotis compares: "Look how others enjoy what you deny yourself"',
    herculaResponse: 'Hercula ascends: "Each mountain has its own summit"'
  },
  {
    id: 'small_excuses_lake',
    title: 'The Lake of Small Excuses',
    description: 'Don\'t fall into the trap of "just one more time"',
    days: 60,
    icon: '🏞️',
    challenge: 'Each drop of the lake is a rationalized excuse: "I had a bad day today", "I control it", "just this once".',
    reward: 'Mental clarity to recognize cognitive traps',
    nikotisInfluence: 'Nikotis drips: "Just once won\'t hurt"',
    herculaResponse: 'Hercula skirts: "Drops form lakes, lakes form oceans"'
  },
  {
    id: 'slow_time_guardian',
    title: 'The Guardian of Slow Time',
    description: 'Endure the slowness of change',
    days: 75,
    icon: '⏳',
    challenge: 'A giant that drags the minutes and challenges Hercula to stay the course even when nothing seems to improve.',
    reward: 'Patience and trust in natural processes',
    nikotisInfluence: 'Nikotis slows: "This rain will never stop without me"',
    herculaResponse: 'Hercula waits: "Oaks grow slowly, but last for centuries"'
  },
  {
    id: 'lost_lungs_treasure',
    title: 'The Treasure of the Lost Lungs',
    description: 'Recover health without obsessively seeking it',
    days: 90,
    icon: '💎',
    challenge: 'A sealed chamber that can only be entered when one stops running after benefits and walks through the process.',
    reward: 'Complete recovery of respiratory function',
    nikotisInfluence: 'Nikotis hides: "You\'ll never recover what you lost"',
    herculaResponse: 'Hercula breathes: "Treasures appear when we stop looking for them"'
  },
  {
    id: 'old_altar_voices',
    title: 'The Voices of the Old Altar',
    description: 'Close the symbolic cycle with the figure of vaping',
    days: 120,
    icon: '🏛️',
    challenge: 'An altar where Nikotis was a protective god. Hercula contemplates it one last time before tearing it down.',
    reward: 'Symbolic and emotional closure of the addictive cycle',
    nikotisInfluence: 'Nikotis implores: "I was your refuge, your comfort, your company"',
    herculaResponse: 'Hercula contemplates: "Altars change, but the one who prays remains"'
  },
  {
    id: 'flower_that_smells_again',
    title: 'The Flower That Smells Again',
    description: 'Reconnect with simple pleasures: the body, the skin, breathing',
    days: 150,
    icon: '🌸',
    challenge: 'A gentle moment, without heroism or struggle. Just enjoyment: the sign that a new mythology has begun.',
    reward: 'Full reconnection with the senses and natural pleasures',
    nikotisInfluence: 'Nikotis fades: "You don\'t need me anymore..."',
    herculaResponse: 'Hercula smells: "The flowers were always there, waiting"'
  },
  {
    id: 'sweet_memory_eclipse',
    title: 'The Eclipse of Sweet Memory',
    description: 'Accept that there are memories linked to vaping without wanting to relive them',
    days: 180,
    icon: '🌑',
    challenge: 'The sky darkens when we evoke certain moments. Hercula learns to remember them without recreating them.',
    reward: 'Healthy integration of personal history',
    nikotisInfluence: 'Nikotis nostalgic: "Remember the good times we shared"',
    herculaResponse: 'Hercula remembers: "Eclipses pass, but the moon remains"'
  },
  {
    id: 'temptations_market',
    title: 'The Market of Temptations',
    description: 'Resist the offers, the stores, the external stimuli',
    days: 210,
    icon: '🏪',
    challenge: 'A noisy market where colors and flavors promise instant happiness. But they\'re just smoke and expense.',
    reward: 'Immunity to the industry\'s commercial stimuli',
    nikotisInfluence: 'Nikotis sells: "New flavors, new experiences await you"',
    herculaResponse: 'Hercula walks: "Markets shout, but the pocket decides"'
  },
  {
    id: 'social_silence_bell',
    title: 'The Bell of Social Silence',
    description: 'Not feeling out of place in a group where people vape',
    days: 240,
    icon: '🔔',
    challenge: 'A glass bell isolates Hercula from the group. Her task: not to break it, but to make it transparent.',
    reward: 'Social confidence without the need for conformity',
    nikotisInfluence: 'Nikotis isolates: "You\'re alone, different, excluded"',
    herculaResponse: 'Hercula coexists: "Glass separates, but also lets you see"'
  },
  {
    id: 'past_relapses_wall',
    title: 'The Wall of Past Relapses',
    description: 'Don\'t use old mistakes as a prophecy of failure',
    days: 270,
    icon: '🧱',
    challenge: 'A wall carved with the dates of each fall. Hercula passes through it without looking back.',
    reward: 'Liberation from the weight of past mistakes',
    nikotisInfluence: 'Nikotis remembers: "You\'ve failed before, you\'ll fail again"',
    herculaResponse: 'Hercula passes: "Walls were built to be crossed"'
  },
  {
    id: 'impatience_rain',
    title: 'The Rain of Impatience',
    description: 'Accept the ups and downs without seeking immediate relief',
    days: 300,
    icon: '🌧️',
    challenge: 'Persistent rain, no storm, no sun. You walk wet, but you walk.',
    reward: 'Tolerance to discomfort and patience with processes',
    nikotisInfluence: 'Nikotis soaks: "This rain will never stop without me"',
    herculaResponse: 'Hercula gets wet: "Rain soaks everyone equally"'
  },
  {
    id: 'autonomy_tower',
    title: 'The Tower of Autonomy',
    description: 'Rebuild the notion of self-care without substances',
    days: 330,
    icon: '🗼',
    challenge: 'Floor by floor, Hercula ascends. Each step is a new practice: music, walk, hug, writing.',
    reward: 'Complete system of genuine self-care',
    nikotisInfluence: 'Nikotis from below: "You\'ll never reach the top without me"',
    herculaResponse: 'Hercula builds: "Towers are raised stone by stone"'
  },
  {
    id: 'self_deception_labyrinth',
    title: 'The Labyrinth of Self-Deception',
    description: 'Detect thoughts that seek to justify a relapse',
    days: 365,
    icon: '🌀',
    challenge: 'Corridors that turn on themselves: "It\'s not so bad", "life is short". Exiting implies naming the trap.',
    reward: 'Total mental clarity and honesty with oneself',
    nikotisInfluence: 'Nikotis confuses: "Just once, to celebrate the year"',
    herculaResponse: 'Hercula finds: "Labyrinths have exits, you just have to walk"'
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