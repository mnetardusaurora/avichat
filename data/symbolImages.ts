// ARASAAC Symbol Images
// Licensed under CC BY-NC-SA 4.0
// Attribution: Sergio Palao / ARASAAC (https://arasaac.org)

import { ImageSourcePropType } from 'react-native';

// Map of symbol IDs to their image sources
// Using require() for bundled assets
export const symbolImages: Record<string, ImageSourcePropType> = {
  // Core words
  want: require('../assets/symbols/want.png'),
  more: require('../assets/symbols/more.png'),
  help: require('../assets/symbols/help.png'),
  stop: require('../assets/symbols/stop.png'),
  go: require('../assets/symbols/go.png'),
  allDone: require('../assets/symbols/allDone.png'),
  yes: require('../assets/symbols/yes.png'),
  no: require('../assets/symbols/no.png'),

  // Categories
  categories: require('../assets/symbols/categories.png'),
  people: require('../assets/symbols/people.png'),
  food: require('../assets/symbols/food.png'),
  drinks: require('../assets/symbols/drinks.png'),
  feelings: require('../assets/symbols/feelings.png'),
  actions: require('../assets/symbols/actions.png'),
  places: require('../assets/symbols/places.png'),
  things: require('../assets/symbols/things.png'),
  animals: require('../assets/symbols/animals.png'),
  back: require('../assets/symbols/back.png'),

  // People
  mommy: require('../assets/symbols/mommy.png'),
  daddy: require('../assets/symbols/daddy.png'),
  baby: require('../assets/symbols/baby.png'),
  grandma: require('../assets/symbols/grandma.png'),
  grandpa: require('../assets/symbols/grandpa.png'),
  teacher: require('../assets/symbols/teacher.png'),
  friend: require('../assets/symbols/friend.png'),
  me: require('../assets/symbols/me.png'),

  // Food
  apple: require('../assets/symbols/apple.png'),
  banana: require('../assets/symbols/banana.png'),
  cookie: require('../assets/symbols/cookie.png'),
  cracker: require('../assets/symbols/cracker.png'),
  cheese: require('../assets/symbols/cheese.png'),
  bread: require('../assets/symbols/bread.png'),
  pizza: require('../assets/symbols/pizza.png'),
  snack: require('../assets/symbols/snack.png'),

  // Drinks
  water: require('../assets/symbols/water.png'),
  milk: require('../assets/symbols/milk.png'),
  juice: require('../assets/symbols/juice.png'),
  hotChocolate: require('../assets/symbols/hotChocolate.png'),
  smoothie: require('../assets/symbols/smoothie.png'),
  tea: require('../assets/symbols/tea.png'),
  iceCream: require('../assets/symbols/iceCream.png'),
  drink: require('../assets/symbols/drink.png'),

  // Feelings
  happy: require('../assets/symbols/happy.png'),
  sad: require('../assets/symbols/sad.png'),
  mad: require('../assets/symbols/mad.png'),
  scared: require('../assets/symbols/scared.png'),
  tired: require('../assets/symbols/tired.png'),
  hungry: require('../assets/symbols/hungry.png'),
  thirsty: require('../assets/symbols/thirsty.png'),
  hurt: require('../assets/symbols/hurt.png'),

  // Actions
  play: require('../assets/symbols/play.png'),
  eat: require('../assets/symbols/eat.png'),
  sleep: require('../assets/symbols/sleep.png'),
  read: require('../assets/symbols/read.png'),
  watch: require('../assets/symbols/watch.png'),
  hug: require('../assets/symbols/hug.png'),
  walk: require('../assets/symbols/walk.png'),
  run: require('../assets/symbols/run.png'),

  // Places
  home: require('../assets/symbols/home.png'),
  school: require('../assets/symbols/school.png'),
  park: require('../assets/symbols/park.png'),
  store: require('../assets/symbols/store.png'),
  bathroom: require('../assets/symbols/bathroom.png'),
  bedroom: require('../assets/symbols/bedroom.png'),
  kitchen: require('../assets/symbols/kitchen.png'),
  outside: require('../assets/symbols/outside.png'),

  // Things
  toy: require('../assets/symbols/toy.png'),
  ball: require('../assets/symbols/ball.png'),
  book: require('../assets/symbols/book.png'),
  phone: require('../assets/symbols/phone.png'),
  tv: require('../assets/symbols/tv.png'),
  blanket: require('../assets/symbols/blanket.png'),
  cup: require('../assets/symbols/cup.png'),
  shoes: require('../assets/symbols/shoes.png'),

  // Animals
  dog: require('../assets/symbols/dog.png'),
  cat: require('../assets/symbols/cat.png'),
  bird: require('../assets/symbols/bird.png'),
  fish: require('../assets/symbols/fish.png'),
  bunny: require('../assets/symbols/bunny.png'),
  horse: require('../assets/symbols/horse.png'),
  cow: require('../assets/symbols/cow.png'),
  pig: require('../assets/symbols/pig.png'),
};

// Get the image source for a symbol, with fallback to undefined
export const getSymbolImage = (symbolId: string): ImageSourcePropType | undefined => {
  return symbolImages[symbolId];
};
