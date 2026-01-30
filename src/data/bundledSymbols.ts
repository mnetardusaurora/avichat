import { CATEGORY_IDS } from '../utils/constants';
import { generateId } from '../utils/uuid';

// Bundled symbol definition
export interface BundledSymbol {
  id: string;
  label: string;
  imagePath: string;
  categoryId: string;
  arasaacId?: number; // For attribution
}

// Pre-generated IDs for consistent seeding
const ids = {
  // Core words
  more: 'vocab-core-more',
  help: 'vocab-core-help',
  stop: 'vocab-core-stop',
  go: 'vocab-core-go',
  want: 'vocab-core-want',
  yes: 'vocab-core-yes',
  no: 'vocab-core-no',
  please: 'vocab-core-please',
  thankYou: 'vocab-core-thank-you',
  sorry: 'vocab-core-sorry',
  mine: 'vocab-core-mine',
  you: 'vocab-core-you',
  i: 'vocab-core-i',
  it: 'vocab-core-it',
  that: 'vocab-core-that',

  // Food
  apple: 'vocab-food-apple',
  banana: 'vocab-food-banana',
  cookie: 'vocab-food-cookie',
  cracker: 'vocab-food-cracker',
  cheese: 'vocab-food-cheese',
  bread: 'vocab-food-bread',
  chicken: 'vocab-food-chicken',
  rice: 'vocab-food-rice',
  pasta: 'vocab-food-pasta',
  snack: 'vocab-food-snack',

  // Drinks
  water: 'vocab-drinks-water',
  milk: 'vocab-drinks-milk',
  juice: 'vocab-drinks-juice',
  cup: 'vocab-drinks-cup',

  // People
  mom: 'vocab-people-mom',
  dad: 'vocab-people-dad',
  grandma: 'vocab-people-grandma',
  grandpa: 'vocab-people-grandpa',
  baby: 'vocab-people-baby',
  teacher: 'vocab-people-teacher',
  friend: 'vocab-people-friend',
  me: 'vocab-people-me',

  // Actions
  eat: 'vocab-actions-eat',
  drink: 'vocab-actions-drink',
  play: 'vocab-actions-play',
  read: 'vocab-actions-read',
  sleep: 'vocab-actions-sleep',
  walk: 'vocab-actions-walk',
  run: 'vocab-actions-run',
  sit: 'vocab-actions-sit',
  stand: 'vocab-actions-stand',
  open: 'vocab-actions-open',
  close: 'vocab-actions-close',
  push: 'vocab-actions-push',
  pull: 'vocab-actions-pull',
  hug: 'vocab-actions-hug',
  kiss: 'vocab-actions-kiss',

  // Feelings
  happy: 'vocab-feelings-happy',
  sad: 'vocab-feelings-sad',
  angry: 'vocab-feelings-angry',
  scared: 'vocab-feelings-scared',
  tired: 'vocab-feelings-tired',
  sick: 'vocab-feelings-sick',
  hungry: 'vocab-feelings-hungry',
  thirsty: 'vocab-feelings-thirsty',
  hurt: 'vocab-feelings-hurt',
  love: 'vocab-feelings-love',
  like: 'vocab-feelings-like',

  // Objects
  ball: 'vocab-objects-ball',
  book: 'vocab-objects-book',
  toy: 'vocab-objects-toy',
  blanket: 'vocab-objects-blanket',
  phone: 'vocab-objects-phone',
  tv: 'vocab-objects-tv',
  car: 'vocab-objects-car',
  bed: 'vocab-objects-bed',
  diaper: 'vocab-objects-diaper',
  potty: 'vocab-objects-potty',
  bath: 'vocab-objects-bath',
  shoes: 'vocab-objects-shoes',
  clothes: 'vocab-objects-clothes',
};

// Bundled symbols array
export const BUNDLED_SYMBOLS: BundledSymbol[] = [
  // Core Words (most important, highest frequency)
  { id: ids.more, label: 'more', imagePath: 'core/more', categoryId: CATEGORY_IDS.CORE },
  { id: ids.help, label: 'help', imagePath: 'core/help', categoryId: CATEGORY_IDS.CORE },
  { id: ids.stop, label: 'stop', imagePath: 'core/stop', categoryId: CATEGORY_IDS.CORE },
  { id: ids.go, label: 'go', imagePath: 'core/go', categoryId: CATEGORY_IDS.CORE },
  { id: ids.want, label: 'want', imagePath: 'core/want', categoryId: CATEGORY_IDS.CORE },
  { id: ids.yes, label: 'yes', imagePath: 'core/yes', categoryId: CATEGORY_IDS.CORE },
  { id: ids.no, label: 'no', imagePath: 'core/no', categoryId: CATEGORY_IDS.CORE },
  { id: ids.please, label: 'please', imagePath: 'core/please', categoryId: CATEGORY_IDS.CORE },
  { id: ids.thankYou, label: 'thank you', imagePath: 'core/thank-you', categoryId: CATEGORY_IDS.CORE },
  { id: ids.sorry, label: 'sorry', imagePath: 'core/sorry', categoryId: CATEGORY_IDS.CORE },
  { id: ids.mine, label: 'mine', imagePath: 'core/mine', categoryId: CATEGORY_IDS.CORE },
  { id: ids.you, label: 'you', imagePath: 'core/you', categoryId: CATEGORY_IDS.CORE },
  { id: ids.i, label: 'I', imagePath: 'core/i', categoryId: CATEGORY_IDS.CORE },
  { id: ids.it, label: 'it', imagePath: 'core/it', categoryId: CATEGORY_IDS.CORE },
  { id: ids.that, label: 'that', imagePath: 'core/that', categoryId: CATEGORY_IDS.CORE },

  // Food
  { id: ids.apple, label: 'apple', imagePath: 'food/apple', categoryId: CATEGORY_IDS.FOOD },
  { id: ids.banana, label: 'banana', imagePath: 'food/banana', categoryId: CATEGORY_IDS.FOOD },
  { id: ids.cookie, label: 'cookie', imagePath: 'food/cookie', categoryId: CATEGORY_IDS.FOOD },
  { id: ids.cracker, label: 'cracker', imagePath: 'food/cracker', categoryId: CATEGORY_IDS.FOOD },
  { id: ids.cheese, label: 'cheese', imagePath: 'food/cheese', categoryId: CATEGORY_IDS.FOOD },
  { id: ids.bread, label: 'bread', imagePath: 'food/bread', categoryId: CATEGORY_IDS.FOOD },
  { id: ids.chicken, label: 'chicken', imagePath: 'food/chicken', categoryId: CATEGORY_IDS.FOOD },
  { id: ids.rice, label: 'rice', imagePath: 'food/rice', categoryId: CATEGORY_IDS.FOOD },
  { id: ids.pasta, label: 'pasta', imagePath: 'food/pasta', categoryId: CATEGORY_IDS.FOOD },
  { id: ids.snack, label: 'snack', imagePath: 'food/snack', categoryId: CATEGORY_IDS.FOOD },

  // Drinks
  { id: ids.water, label: 'water', imagePath: 'drinks/water', categoryId: CATEGORY_IDS.DRINKS },
  { id: ids.milk, label: 'milk', imagePath: 'drinks/milk', categoryId: CATEGORY_IDS.DRINKS },
  { id: ids.juice, label: 'juice', imagePath: 'drinks/juice', categoryId: CATEGORY_IDS.DRINKS },
  { id: ids.cup, label: 'cup', imagePath: 'drinks/cup', categoryId: CATEGORY_IDS.DRINKS },

  // People
  { id: ids.mom, label: 'mom', imagePath: 'people/mom', categoryId: CATEGORY_IDS.PEOPLE },
  { id: ids.dad, label: 'dad', imagePath: 'people/dad', categoryId: CATEGORY_IDS.PEOPLE },
  { id: ids.grandma, label: 'grandma', imagePath: 'people/grandma', categoryId: CATEGORY_IDS.PEOPLE },
  { id: ids.grandpa, label: 'grandpa', imagePath: 'people/grandpa', categoryId: CATEGORY_IDS.PEOPLE },
  { id: ids.baby, label: 'baby', imagePath: 'people/baby', categoryId: CATEGORY_IDS.PEOPLE },
  { id: ids.teacher, label: 'teacher', imagePath: 'people/teacher', categoryId: CATEGORY_IDS.PEOPLE },
  { id: ids.friend, label: 'friend', imagePath: 'people/friend', categoryId: CATEGORY_IDS.PEOPLE },
  { id: ids.me, label: 'me', imagePath: 'people/me', categoryId: CATEGORY_IDS.PEOPLE },

  // Actions
  { id: ids.eat, label: 'eat', imagePath: 'actions/eat', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.drink, label: 'drink', imagePath: 'actions/drink', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.play, label: 'play', imagePath: 'actions/play', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.read, label: 'read', imagePath: 'actions/read', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.sleep, label: 'sleep', imagePath: 'actions/sleep', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.walk, label: 'walk', imagePath: 'actions/walk', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.run, label: 'run', imagePath: 'actions/run', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.sit, label: 'sit', imagePath: 'actions/sit', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.stand, label: 'stand', imagePath: 'actions/stand', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.open, label: 'open', imagePath: 'actions/open', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.close, label: 'close', imagePath: 'actions/close', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.push, label: 'push', imagePath: 'actions/push', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.pull, label: 'pull', imagePath: 'actions/pull', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.hug, label: 'hug', imagePath: 'actions/hug', categoryId: CATEGORY_IDS.ACTIONS },
  { id: ids.kiss, label: 'kiss', imagePath: 'actions/kiss', categoryId: CATEGORY_IDS.ACTIONS },

  // Feelings
  { id: ids.happy, label: 'happy', imagePath: 'feelings/happy', categoryId: CATEGORY_IDS.FEELINGS },
  { id: ids.sad, label: 'sad', imagePath: 'feelings/sad', categoryId: CATEGORY_IDS.FEELINGS },
  { id: ids.angry, label: 'angry', imagePath: 'feelings/angry', categoryId: CATEGORY_IDS.FEELINGS },
  { id: ids.scared, label: 'scared', imagePath: 'feelings/scared', categoryId: CATEGORY_IDS.FEELINGS },
  { id: ids.tired, label: 'tired', imagePath: 'feelings/tired', categoryId: CATEGORY_IDS.FEELINGS },
  { id: ids.sick, label: 'sick', imagePath: 'feelings/sick', categoryId: CATEGORY_IDS.FEELINGS },
  { id: ids.hungry, label: 'hungry', imagePath: 'feelings/hungry', categoryId: CATEGORY_IDS.FEELINGS },
  { id: ids.thirsty, label: 'thirsty', imagePath: 'feelings/thirsty', categoryId: CATEGORY_IDS.FEELINGS },
  { id: ids.hurt, label: 'hurt', imagePath: 'feelings/hurt', categoryId: CATEGORY_IDS.FEELINGS },
  { id: ids.love, label: 'love', imagePath: 'feelings/love', categoryId: CATEGORY_IDS.FEELINGS },
  { id: ids.like, label: 'like', imagePath: 'feelings/like', categoryId: CATEGORY_IDS.FEELINGS },

  // Objects
  { id: ids.ball, label: 'ball', imagePath: 'objects/ball', categoryId: CATEGORY_IDS.OBJECTS },
  { id: ids.book, label: 'book', imagePath: 'objects/book', categoryId: CATEGORY_IDS.OBJECTS },
  { id: ids.toy, label: 'toy', imagePath: 'objects/toy', categoryId: CATEGORY_IDS.OBJECTS },
  { id: ids.blanket, label: 'blanket', imagePath: 'objects/blanket', categoryId: CATEGORY_IDS.OBJECTS },
  { id: ids.phone, label: 'phone', imagePath: 'objects/phone', categoryId: CATEGORY_IDS.OBJECTS },
  { id: ids.tv, label: 'TV', imagePath: 'objects/tv', categoryId: CATEGORY_IDS.OBJECTS },
  { id: ids.car, label: 'car', imagePath: 'objects/car', categoryId: CATEGORY_IDS.OBJECTS },
  { id: ids.bed, label: 'bed', imagePath: 'objects/bed', categoryId: CATEGORY_IDS.OBJECTS },
  { id: ids.diaper, label: 'diaper', imagePath: 'objects/diaper', categoryId: CATEGORY_IDS.OBJECTS },
  { id: ids.potty, label: 'potty', imagePath: 'objects/potty', categoryId: CATEGORY_IDS.OBJECTS },
  { id: ids.bath, label: 'bath', imagePath: 'objects/bath', categoryId: CATEGORY_IDS.OBJECTS },
  { id: ids.shoes, label: 'shoes', imagePath: 'objects/shoes', categoryId: CATEGORY_IDS.OBJECTS },
  { id: ids.clothes, label: 'clothes', imagePath: 'objects/clothes', categoryId: CATEGORY_IDS.OBJECTS },
];

// Helper function to get a bundled symbol by label
export function getBundledSymbol(label: string): BundledSymbol | undefined {
  return BUNDLED_SYMBOLS.find(
    (s) => s.label.toLowerCase() === label.toLowerCase()
  );
}

// Helper function to get all symbols for a category
export function getSymbolsByCategory(categoryId: string): BundledSymbol[] {
  return BUNDLED_SYMBOLS.filter((s) => s.categoryId === categoryId);
}

// Get symbol count by category
export function getSymbolCountByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const symbol of BUNDLED_SYMBOLS) {
    counts[symbol.categoryId] = (counts[symbol.categoryId] || 0) + 1;
  }
  return counts;
}
