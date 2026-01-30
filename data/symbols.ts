// Symbol definitions with labels and icons

export interface Symbol {
  id: string;
  label: string;           // Text to speak & display
  icon: string;            // Built-in icon identifier (emoji for MVP)
  customImageUri?: string; // Optional photo override (local URI)
  backgroundColor?: string;
}

// Core vocabulary symbols based on AAC research
export const coreSymbols: Record<string, Symbol> = {
  // Core words (most used in AAC)
  want: {
    id: 'want',
    label: 'Want',
    icon: '👋',
    backgroundColor: '#FFD700', // Gold
  },
  more: {
    id: 'more',
    label: 'More',
    icon: '➕',
    backgroundColor: '#32CD32', // Lime green
  },
  help: {
    id: 'help',
    label: 'Help',
    icon: '🆘',
    backgroundColor: '#FF6347', // Tomato
  },
  stop: {
    id: 'stop',
    label: 'Stop',
    icon: '✋',
    backgroundColor: '#DC143C', // Crimson
  },
  go: {
    id: 'go',
    label: 'Go',
    icon: '▶️',
    backgroundColor: '#228B22', // Forest green
  },
  allDone: {
    id: 'allDone',
    label: 'All done',
    icon: '✅',
    backgroundColor: '#4169E1', // Royal blue
  },
  yes: {
    id: 'yes',
    label: 'Yes',
    icon: '👍',
    backgroundColor: '#00CED1', // Dark turquoise
  },
  no: {
    id: 'no',
    label: 'No',
    icon: '👎',
    backgroundColor: '#FF4500', // Orange red
  },
  categories: {
    id: 'categories',
    label: 'Categories',
    icon: '📂',
    backgroundColor: '#9370DB', // Medium purple
  },

  // Category navigation symbols
  people: {
    id: 'people',
    label: 'People',
    icon: '👨‍👩‍👧‍👦',
    backgroundColor: '#FF69B4', // Hot pink
  },
  food: {
    id: 'food',
    label: 'Food',
    icon: '🍎',
    backgroundColor: '#FF8C00', // Dark orange
  },
  drinks: {
    id: 'drinks',
    label: 'Drinks',
    icon: '🥤',
    backgroundColor: '#1E90FF', // Dodger blue
  },
  feelings: {
    id: 'feelings',
    label: 'Feelings',
    icon: '😊',
    backgroundColor: '#FFB6C1', // Light pink
  },
  actions: {
    id: 'actions',
    label: 'Actions',
    icon: '🏃',
    backgroundColor: '#FFA500', // Orange
  },
  places: {
    id: 'places',
    label: 'Places',
    icon: '🏠',
    backgroundColor: '#8B4513', // Saddle brown
  },
  things: {
    id: 'things',
    label: 'Things',
    icon: '🎁',
    backgroundColor: '#6A5ACD', // Slate blue
  },
  animals: {
    id: 'animals',
    label: 'Animals',
    icon: '🐶',
    backgroundColor: '#DAA520', // Goldenrod
  },
  back: {
    id: 'back',
    label: 'Back',
    icon: '⬅️',
    backgroundColor: '#808080', // Gray
  },

  // People category
  mommy: {
    id: 'mommy',
    label: 'Mommy',
    icon: '👩',
    backgroundColor: '#FF69B4',
  },
  daddy: {
    id: 'daddy',
    label: 'Daddy',
    icon: '👨',
    backgroundColor: '#4169E1',
  },
  baby: {
    id: 'baby',
    label: 'Baby',
    icon: '👶',
    backgroundColor: '#FFB6C1',
  },
  grandma: {
    id: 'grandma',
    label: 'Grandma',
    icon: '👵',
    backgroundColor: '#DDA0DD',
  },
  grandpa: {
    id: 'grandpa',
    label: 'Grandpa',
    icon: '👴',
    backgroundColor: '#778899',
  },
  teacher: {
    id: 'teacher',
    label: 'Teacher',
    icon: '👩‍🏫',
    backgroundColor: '#20B2AA',
  },
  friend: {
    id: 'friend',
    label: 'Friend',
    icon: '🧒',
    backgroundColor: '#FFA07A',
  },
  me: {
    id: 'me',
    label: 'Me',
    icon: '🙋',
    backgroundColor: '#87CEEB',
  },

  // Food category
  apple: {
    id: 'apple',
    label: 'Apple',
    icon: '🍎',
    backgroundColor: '#FF0000',
  },
  banana: {
    id: 'banana',
    label: 'Banana',
    icon: '🍌',
    backgroundColor: '#FFE135',
  },
  cookie: {
    id: 'cookie',
    label: 'Cookie',
    icon: '🍪',
    backgroundColor: '#D2691E',
  },
  cracker: {
    id: 'cracker',
    label: 'Cracker',
    icon: '🥠',
    backgroundColor: '#F5DEB3',
  },
  cheese: {
    id: 'cheese',
    label: 'Cheese',
    icon: '🧀',
    backgroundColor: '#FFD700',
  },
  bread: {
    id: 'bread',
    label: 'Bread',
    icon: '🍞',
    backgroundColor: '#DEB887',
  },
  pizza: {
    id: 'pizza',
    label: 'Pizza',
    icon: '🍕',
    backgroundColor: '#FF6347',
  },
  snack: {
    id: 'snack',
    label: 'Snack',
    icon: '🍿',
    backgroundColor: '#FFFACD',
  },

  // Drinks category
  water: {
    id: 'water',
    label: 'Water',
    icon: '💧',
    backgroundColor: '#87CEEB',
  },
  milk: {
    id: 'milk',
    label: 'Milk',
    icon: '🥛',
    backgroundColor: '#FFFAF0',
  },
  juice: {
    id: 'juice',
    label: 'Juice',
    icon: '🧃',
    backgroundColor: '#FFA500',
  },
  hotChocolate: {
    id: 'hotChocolate',
    label: 'Hot chocolate',
    icon: '☕',
    backgroundColor: '#8B4513',
  },
  smoothie: {
    id: 'smoothie',
    label: 'Smoothie',
    icon: '🥤',
    backgroundColor: '#FF69B4',
  },
  tea: {
    id: 'tea',
    label: 'Tea',
    icon: '🍵',
    backgroundColor: '#90EE90',
  },
  iceCream: {
    id: 'iceCream',
    label: 'Ice cream',
    icon: '🍦',
    backgroundColor: '#FAEBD7',
  },
  drink: {
    id: 'drink',
    label: 'Drink',
    icon: '🥤',
    backgroundColor: '#1E90FF',
  },

  // Feelings category
  happy: {
    id: 'happy',
    label: 'Happy',
    icon: '😊',
    backgroundColor: '#FFD700',
  },
  sad: {
    id: 'sad',
    label: 'Sad',
    icon: '😢',
    backgroundColor: '#4682B4',
  },
  mad: {
    id: 'mad',
    label: 'Mad',
    icon: '😠',
    backgroundColor: '#FF4500',
  },
  scared: {
    id: 'scared',
    label: 'Scared',
    icon: '😨',
    backgroundColor: '#9932CC',
  },
  tired: {
    id: 'tired',
    label: 'Tired',
    icon: '😴',
    backgroundColor: '#708090',
  },
  hungry: {
    id: 'hungry',
    label: 'Hungry',
    icon: '🤤',
    backgroundColor: '#FF8C00',
  },
  thirsty: {
    id: 'thirsty',
    label: 'Thirsty',
    icon: '🥵',
    backgroundColor: '#00CED1',
  },
  hurt: {
    id: 'hurt',
    label: 'Hurt',
    icon: '🤕',
    backgroundColor: '#DC143C',
  },

  // Actions category
  play: {
    id: 'play',
    label: 'Play',
    icon: '🎮',
    backgroundColor: '#32CD32',
  },
  eat: {
    id: 'eat',
    label: 'Eat',
    icon: '🍽️',
    backgroundColor: '#FF8C00',
  },
  sleep: {
    id: 'sleep',
    label: 'Sleep',
    icon: '😴',
    backgroundColor: '#483D8B',
  },
  read: {
    id: 'read',
    label: 'Read',
    icon: '📖',
    backgroundColor: '#8B4513',
  },
  watch: {
    id: 'watch',
    label: 'Watch',
    icon: '📺',
    backgroundColor: '#4169E1',
  },
  hug: {
    id: 'hug',
    label: 'Hug',
    icon: '🤗',
    backgroundColor: '#FF69B4',
  },
  walk: {
    id: 'walk',
    label: 'Walk',
    icon: '🚶',
    backgroundColor: '#228B22',
  },
  run: {
    id: 'run',
    label: 'Run',
    icon: '🏃',
    backgroundColor: '#FFA500',
  },

  // Places category
  home: {
    id: 'home',
    label: 'Home',
    icon: '🏠',
    backgroundColor: '#8B4513',
  },
  school: {
    id: 'school',
    label: 'School',
    icon: '🏫',
    backgroundColor: '#DC143C',
  },
  park: {
    id: 'park',
    label: 'Park',
    icon: '🌳',
    backgroundColor: '#228B22',
  },
  store: {
    id: 'store',
    label: 'Store',
    icon: '🏪',
    backgroundColor: '#4169E1',
  },
  bathroom: {
    id: 'bathroom',
    label: 'Bathroom',
    icon: '🚽',
    backgroundColor: '#87CEEB',
  },
  bedroom: {
    id: 'bedroom',
    label: 'Bedroom',
    icon: '🛏️',
    backgroundColor: '#DDA0DD',
  },
  kitchen: {
    id: 'kitchen',
    label: 'Kitchen',
    icon: '🍳',
    backgroundColor: '#FFD700',
  },
  outside: {
    id: 'outside',
    label: 'Outside',
    icon: '☀️',
    backgroundColor: '#00CED1',
  },

  // Things category
  toy: {
    id: 'toy',
    label: 'Toy',
    icon: '🧸',
    backgroundColor: '#FF69B4',
  },
  ball: {
    id: 'ball',
    label: 'Ball',
    icon: '⚽',
    backgroundColor: '#32CD32',
  },
  book: {
    id: 'book',
    label: 'Book',
    icon: '📚',
    backgroundColor: '#8B4513',
  },
  phone: {
    id: 'phone',
    label: 'Phone',
    icon: '📱',
    backgroundColor: '#4169E1',
  },
  tv: {
    id: 'tv',
    label: 'TV',
    icon: '📺',
    backgroundColor: '#2F4F4F',
  },
  blanket: {
    id: 'blanket',
    label: 'Blanket',
    icon: '🛏️',
    backgroundColor: '#DDA0DD',
  },
  cup: {
    id: 'cup',
    label: 'Cup',
    icon: '🥤',
    backgroundColor: '#1E90FF',
  },
  shoes: {
    id: 'shoes',
    label: 'Shoes',
    icon: '👟',
    backgroundColor: '#FF4500',
  },

  // Animals category
  dog: {
    id: 'dog',
    label: 'Dog',
    icon: '🐶',
    backgroundColor: '#D2691E',
  },
  cat: {
    id: 'cat',
    label: 'Cat',
    icon: '🐱',
    backgroundColor: '#FFA500',
  },
  bird: {
    id: 'bird',
    label: 'Bird',
    icon: '🐦',
    backgroundColor: '#87CEEB',
  },
  fish: {
    id: 'fish',
    label: 'Fish',
    icon: '🐟',
    backgroundColor: '#1E90FF',
  },
  bunny: {
    id: 'bunny',
    label: 'Bunny',
    icon: '🐰',
    backgroundColor: '#FFB6C1',
  },
  horse: {
    id: 'horse',
    label: 'Horse',
    icon: '🐴',
    backgroundColor: '#8B4513',
  },
  cow: {
    id: 'cow',
    label: 'Cow',
    icon: '🐄',
    backgroundColor: '#F5F5DC',
  },
  pig: {
    id: 'pig',
    label: 'Pig',
    icon: '🐷',
    backgroundColor: '#FFB6C1',
  },
};
