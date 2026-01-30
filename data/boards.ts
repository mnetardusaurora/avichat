// Pre-built board definitions

import { coreSymbols, Symbol } from './symbols';

export interface Board {
  id: string;
  title: string;
  symbols: Symbol[];       // Max 9 for 3x3 grid
  isCategory?: boolean;    // True if this is a sub-category
}

// Helper to get symbols by IDs
const getSymbols = (ids: string[]): Symbol[] => {
  return ids.map(id => coreSymbols[id]).filter(Boolean);
};

// Home board - Core words + categories button
export const homeBoard: Board = {
  id: 'home',
  title: 'Home',
  symbols: getSymbols([
    'want',
    'more',
    'help',
    'stop',
    'go',
    'allDone',
    'yes',
    'no',
    'categories',
  ]),
};

// Category selector board
export const categorySelector: Board = {
  id: 'categorySelector',
  title: 'Categories',
  symbols: getSymbols([
    'people',
    'food',
    'drinks',
    'feelings',
    'actions',
    'places',
    'things',
    'animals',
    'back',
  ]),
};

// Category boards
export const peopleBoard: Board = {
  id: 'people',
  title: 'People',
  isCategory: true,
  symbols: getSymbols([
    'mommy',
    'daddy',
    'baby',
    'grandma',
    'grandpa',
    'teacher',
    'friend',
    'me',
    'back',
  ]),
};

export const foodBoard: Board = {
  id: 'food',
  title: 'Food',
  isCategory: true,
  symbols: getSymbols([
    'apple',
    'banana',
    'cookie',
    'cracker',
    'cheese',
    'bread',
    'pizza',
    'snack',
    'back',
  ]),
};

export const drinksBoard: Board = {
  id: 'drinks',
  title: 'Drinks',
  isCategory: true,
  symbols: getSymbols([
    'water',
    'milk',
    'juice',
    'hotChocolate',
    'smoothie',
    'tea',
    'iceCream',
    'drink',
    'back',
  ]),
};

export const feelingsBoard: Board = {
  id: 'feelings',
  title: 'Feelings',
  isCategory: true,
  symbols: getSymbols([
    'happy',
    'sad',
    'mad',
    'scared',
    'tired',
    'hungry',
    'thirsty',
    'hurt',
    'back',
  ]),
};

export const actionsBoard: Board = {
  id: 'actions',
  title: 'Actions',
  isCategory: true,
  symbols: getSymbols([
    'play',
    'eat',
    'sleep',
    'read',
    'watch',
    'hug',
    'walk',
    'run',
    'back',
  ]),
};

export const placesBoard: Board = {
  id: 'places',
  title: 'Places',
  isCategory: true,
  symbols: getSymbols([
    'home',
    'school',
    'park',
    'store',
    'bathroom',
    'bedroom',
    'kitchen',
    'outside',
    'back',
  ]),
};

export const thingsBoard: Board = {
  id: 'things',
  title: 'Things',
  isCategory: true,
  symbols: getSymbols([
    'toy',
    'ball',
    'book',
    'phone',
    'tv',
    'blanket',
    'cup',
    'shoes',
    'back',
  ]),
};

export const animalsBoard: Board = {
  id: 'animals',
  title: 'Animals',
  isCategory: true,
  symbols: getSymbols([
    'dog',
    'cat',
    'bird',
    'fish',
    'bunny',
    'horse',
    'cow',
    'pig',
    'back',
  ]),
};

// Map of all boards by ID
export const boards: Record<string, Board> = {
  home: homeBoard,
  categorySelector: categorySelector,
  people: peopleBoard,
  food: foodBoard,
  drinks: drinksBoard,
  feelings: feelingsBoard,
  actions: actionsBoard,
  places: placesBoard,
  things: thingsBoard,
  animals: animalsBoard,
};

// Get board by ID
export const getBoard = (id: string): Board | undefined => {
  return boards[id];
};
