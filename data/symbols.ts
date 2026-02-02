// Symbol definitions with labels and icons
// Using Fitzgerald Key color coding (AAC standard)
// Green = Verbs, Yellow = Pronouns, Orange = Nouns, Blue = Descriptors
// Pink = Social, Red = Negation/Stop, Purple = Questions

export interface Symbol {
  id: string;
  label: string;           // Text to speak & display
  icon: string;            // Built-in icon identifier (emoji for MVP)
  customImageUri?: string; // Optional photo override (local URI)
  backgroundColor?: string;
}

// AAC Standard Colors (Fitzgerald Key)
const COLORS = {
  verb: '#4CAF50',        // Green - actions/verbs
  noun: '#FF9800',        // Orange - nouns/things
  pronoun: '#FFEB3B',     // Yellow - pronouns
  descriptor: '#2196F3',  // Blue - descriptors/adjectives
  social: '#E91E63',      // Pink - social words
  question: '#9C27B0',    // Purple - questions
  negation: '#F44336',    // Red - no/stop
  affirmation: '#66BB6A', // Light green - yes/go
  preposition: '#00BCD4', // Cyan - prepositions
  misc: '#78909C',        // Grey - miscellaneous
  category: '#7E57C2',    // Purple - category navigation
  food: '#FF7043',        // Deep orange - food
  drink: '#29B6F6',       // Light blue - drinks
  feeling: '#AB47BC',     // Purple - feelings
  place: '#8D6E63',       // Brown - places
  animal: '#9CCC65',      // Light green - animals
  person: '#EC407A',      // Pink - people
};

// Core vocabulary symbols based on AAC research
export const coreSymbols: Record<string, Symbol> = {
  // ===== CORE WORDS (Home Board) =====
  want: {
    id: 'want',
    label: 'I want',
    icon: '🙋',
    backgroundColor: COLORS.verb,
  },
  more: {
    id: 'more',
    label: 'More',
    icon: '➕',
    backgroundColor: COLORS.verb,
  },
  help: {
    id: 'help',
    label: 'Help',
    icon: '🤝',
    backgroundColor: COLORS.social,
  },
  stop: {
    id: 'stop',
    label: 'Stop',
    icon: '🛑',
    backgroundColor: COLORS.negation,
  },
  go: {
    id: 'go',
    label: 'Go',
    icon: '▶️',
    backgroundColor: COLORS.affirmation,
  },
  allDone: {
    id: 'allDone',
    label: 'All done',
    icon: '✅',
    backgroundColor: COLORS.verb,
  },
  yes: {
    id: 'yes',
    label: 'Yes',
    icon: '👍',
    backgroundColor: COLORS.affirmation,
  },
  no: {
    id: 'no',
    label: 'No',
    icon: '👎',
    backgroundColor: COLORS.negation,
  },
  categories: {
    id: 'categories',
    label: 'More Words',
    icon: '📚',
    backgroundColor: COLORS.category,
  },

  // ===== CATEGORY NAVIGATION =====
  people: {
    id: 'people',
    label: 'People',
    icon: '👨‍👩‍👧',
    backgroundColor: COLORS.person,
  },
  food: {
    id: 'food',
    label: 'Food',
    icon: '🍽️',
    backgroundColor: COLORS.food,
  },
  drinks: {
    id: 'drinks',
    label: 'Drinks',
    icon: '🥤',
    backgroundColor: COLORS.drink,
  },
  feelings: {
    id: 'feelings',
    label: 'Feelings',
    icon: '💭',
    backgroundColor: COLORS.feeling,
  },
  actions: {
    id: 'actions',
    label: 'Actions',
    icon: '🏃',
    backgroundColor: COLORS.verb,
  },
  places: {
    id: 'places',
    label: 'Places',
    icon: '🏠',
    backgroundColor: COLORS.place,
  },
  things: {
    id: 'things',
    label: 'Things',
    icon: '🧸',
    backgroundColor: COLORS.noun,
  },
  animals: {
    id: 'animals',
    label: 'Animals',
    icon: '🐾',
    backgroundColor: COLORS.animal,
  },
  back: {
    id: 'back',
    label: 'Back',
    icon: '⬅️',
    backgroundColor: COLORS.misc,
  },

  // ===== PEOPLE CATEGORY =====
  mommy: {
    id: 'mommy',
    label: 'Mommy',
    icon: '👩',
    backgroundColor: COLORS.person,
  },
  daddy: {
    id: 'daddy',
    label: 'Daddy',
    icon: '👨',
    backgroundColor: COLORS.person,
  },
  baby: {
    id: 'baby',
    label: 'Baby',
    icon: '👶',
    backgroundColor: COLORS.person,
  },
  grandma: {
    id: 'grandma',
    label: 'Grandma',
    icon: '👵',
    backgroundColor: COLORS.person,
  },
  grandpa: {
    id: 'grandpa',
    label: 'Grandpa',
    icon: '👴',
    backgroundColor: COLORS.person,
  },
  teacher: {
    id: 'teacher',
    label: 'Teacher',
    icon: '👩‍🏫',
    backgroundColor: COLORS.person,
  },
  friend: {
    id: 'friend',
    label: 'Friend',
    icon: '🧒',
    backgroundColor: COLORS.person,
  },
  me: {
    id: 'me',
    label: 'Me',
    icon: '🙋‍♂️',
    backgroundColor: COLORS.pronoun,
  },

  // ===== FOOD CATEGORY =====
  apple: {
    id: 'apple',
    label: 'Apple',
    icon: '🍎',
    backgroundColor: COLORS.food,
  },
  banana: {
    id: 'banana',
    label: 'Banana',
    icon: '🍌',
    backgroundColor: COLORS.food,
  },
  cookie: {
    id: 'cookie',
    label: 'Cookie',
    icon: '🍪',
    backgroundColor: COLORS.food,
  },
  cracker: {
    id: 'cracker',
    label: 'Cracker',
    icon: '🥨',
    backgroundColor: COLORS.food,
  },
  cheese: {
    id: 'cheese',
    label: 'Cheese',
    icon: '🧀',
    backgroundColor: COLORS.food,
  },
  bread: {
    id: 'bread',
    label: 'Bread',
    icon: '🍞',
    backgroundColor: COLORS.food,
  },
  pizza: {
    id: 'pizza',
    label: 'Pizza',
    icon: '🍕',
    backgroundColor: COLORS.food,
  },
  snack: {
    id: 'snack',
    label: 'Snack',
    icon: '🍿',
    backgroundColor: COLORS.food,
  },

  // ===== DRINKS CATEGORY =====
  water: {
    id: 'water',
    label: 'Water',
    icon: '💧',
    backgroundColor: COLORS.drink,
  },
  milk: {
    id: 'milk',
    label: 'Milk',
    icon: '🥛',
    backgroundColor: COLORS.drink,
  },
  juice: {
    id: 'juice',
    label: 'Juice',
    icon: '🧃',
    backgroundColor: COLORS.drink,
  },
  hotChocolate: {
    id: 'hotChocolate',
    label: 'Hot cocoa',
    icon: '☕',
    backgroundColor: COLORS.drink,
  },
  smoothie: {
    id: 'smoothie',
    label: 'Smoothie',
    icon: '🥤',
    backgroundColor: COLORS.drink,
  },
  tea: {
    id: 'tea',
    label: 'Tea',
    icon: '🍵',
    backgroundColor: COLORS.drink,
  },
  iceCream: {
    id: 'iceCream',
    label: 'Ice cream',
    icon: '🍦',
    backgroundColor: COLORS.drink,
  },
  drink: {
    id: 'drink',
    label: 'Drink',
    icon: '🥤',
    backgroundColor: COLORS.drink,
  },

  // ===== FEELINGS CATEGORY =====
  happy: {
    id: 'happy',
    label: 'Happy',
    icon: '😊',
    backgroundColor: COLORS.feeling,
  },
  sad: {
    id: 'sad',
    label: 'Sad',
    icon: '😢',
    backgroundColor: COLORS.feeling,
  },
  mad: {
    id: 'mad',
    label: 'Mad',
    icon: '😠',
    backgroundColor: COLORS.feeling,
  },
  scared: {
    id: 'scared',
    label: 'Scared',
    icon: '😨',
    backgroundColor: COLORS.feeling,
  },
  tired: {
    id: 'tired',
    label: 'Tired',
    icon: '😴',
    backgroundColor: COLORS.feeling,
  },
  hungry: {
    id: 'hungry',
    label: 'Hungry',
    icon: '🤤',
    backgroundColor: COLORS.feeling,
  },
  thirsty: {
    id: 'thirsty',
    label: 'Thirsty',
    icon: '🥵',
    backgroundColor: COLORS.feeling,
  },
  hurt: {
    id: 'hurt',
    label: 'Hurt',
    icon: '🤕',
    backgroundColor: COLORS.negation,
  },

  // ===== ACTIONS CATEGORY =====
  play: {
    id: 'play',
    label: 'Play',
    icon: '🎮',
    backgroundColor: COLORS.verb,
  },
  eat: {
    id: 'eat',
    label: 'Eat',
    icon: '🍴',
    backgroundColor: COLORS.verb,
  },
  sleep: {
    id: 'sleep',
    label: 'Sleep',
    icon: '😴',
    backgroundColor: COLORS.verb,
  },
  read: {
    id: 'read',
    label: 'Read',
    icon: '📖',
    backgroundColor: COLORS.verb,
  },
  watch: {
    id: 'watch',
    label: 'Watch',
    icon: '📺',
    backgroundColor: COLORS.verb,
  },
  hug: {
    id: 'hug',
    label: 'Hug',
    icon: '🤗',
    backgroundColor: COLORS.social,
  },
  walk: {
    id: 'walk',
    label: 'Walk',
    icon: '🚶',
    backgroundColor: COLORS.verb,
  },
  run: {
    id: 'run',
    label: 'Run',
    icon: '🏃',
    backgroundColor: COLORS.verb,
  },

  // ===== PLACES CATEGORY =====
  home: {
    id: 'home',
    label: 'Home',
    icon: '🏠',
    backgroundColor: COLORS.place,
  },
  school: {
    id: 'school',
    label: 'School',
    icon: '🏫',
    backgroundColor: COLORS.place,
  },
  park: {
    id: 'park',
    label: 'Park',
    icon: '🌳',
    backgroundColor: COLORS.place,
  },
  store: {
    id: 'store',
    label: 'Store',
    icon: '🏪',
    backgroundColor: COLORS.place,
  },
  bathroom: {
    id: 'bathroom',
    label: 'Bathroom',
    icon: '🚽',
    backgroundColor: COLORS.place,
  },
  bedroom: {
    id: 'bedroom',
    label: 'Bedroom',
    icon: '🛏️',
    backgroundColor: COLORS.place,
  },
  kitchen: {
    id: 'kitchen',
    label: 'Kitchen',
    icon: '🍳',
    backgroundColor: COLORS.place,
  },
  outside: {
    id: 'outside',
    label: 'Outside',
    icon: '☀️',
    backgroundColor: COLORS.place,
  },

  // ===== THINGS CATEGORY =====
  toy: {
    id: 'toy',
    label: 'Toy',
    icon: '🧸',
    backgroundColor: COLORS.noun,
  },
  ball: {
    id: 'ball',
    label: 'Ball',
    icon: '⚽',
    backgroundColor: COLORS.noun,
  },
  book: {
    id: 'book',
    label: 'Book',
    icon: '📚',
    backgroundColor: COLORS.noun,
  },
  phone: {
    id: 'phone',
    label: 'Phone',
    icon: '📱',
    backgroundColor: COLORS.noun,
  },
  tv: {
    id: 'tv',
    label: 'TV',
    icon: '📺',
    backgroundColor: COLORS.noun,
  },
  blanket: {
    id: 'blanket',
    label: 'Blanket',
    icon: '🛏️',
    backgroundColor: COLORS.noun,
  },
  cup: {
    id: 'cup',
    label: 'Cup',
    icon: '🥤',
    backgroundColor: COLORS.noun,
  },
  shoes: {
    id: 'shoes',
    label: 'Shoes',
    icon: '👟',
    backgroundColor: COLORS.noun,
  },

  // ===== ANIMALS CATEGORY =====
  dog: {
    id: 'dog',
    label: 'Dog',
    icon: '🐕',
    backgroundColor: COLORS.animal,
  },
  cat: {
    id: 'cat',
    label: 'Cat',
    icon: '🐈',
    backgroundColor: COLORS.animal,
  },
  bird: {
    id: 'bird',
    label: 'Bird',
    icon: '🐦',
    backgroundColor: COLORS.animal,
  },
  fish: {
    id: 'fish',
    label: 'Fish',
    icon: '🐟',
    backgroundColor: COLORS.animal,
  },
  bunny: {
    id: 'bunny',
    label: 'Bunny',
    icon: '🐰',
    backgroundColor: COLORS.animal,
  },
  horse: {
    id: 'horse',
    label: 'Horse',
    icon: '🐴',
    backgroundColor: COLORS.animal,
  },
  cow: {
    id: 'cow',
    label: 'Cow',
    icon: '🐄',
    backgroundColor: COLORS.animal,
  },
  pig: {
    id: 'pig',
    label: 'Pig',
    icon: '🐷',
    backgroundColor: COLORS.animal,
  },
};
