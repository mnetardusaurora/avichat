import * as FileSystem from 'expo-file-system/legacy';
import { VocabularyItem, Category, ImageSourceType } from '../types';
import { CUSTOM_IMAGES_DIR } from './constants';
import { generateId } from './uuid';

// Symbol image mapping for bundled assets
const SYMBOL_IMAGES: Record<string, any> = {
  // Core words
  'core/more': require('../../assets/symbols/core/more.png'),
  'core/help': require('../../assets/symbols/core/help.png'),
  'core/stop': require('../../assets/symbols/core/stop.png'),
  'core/go': require('../../assets/symbols/core/go.png'),
  'core/want': require('../../assets/symbols/core/want.png'),
  'core/yes': require('../../assets/symbols/core/yes.png'),
  'core/no': require('../../assets/symbols/core/no.png'),
  'core/please': require('../../assets/symbols/core/please.png'),
  'core/thank-you': require('../../assets/symbols/core/thank-you.png'),
  'core/sorry': require('../../assets/symbols/core/sorry.png'),
  'core/mine': require('../../assets/symbols/core/mine.png'),
  'core/you': require('../../assets/symbols/core/you.png'),
  'core/i': require('../../assets/symbols/core/i.png'),
  'core/it': require('../../assets/symbols/core/it.png'),
  'core/that': require('../../assets/symbols/core/that.png'),

  // Food
  'food/apple': require('../../assets/symbols/food/apple.png'),
  'food/banana': require('../../assets/symbols/food/banana.png'),
  'food/cookie': require('../../assets/symbols/food/cookie.png'),
  'food/cracker': require('../../assets/symbols/food/cracker.png'),
  'food/cheese': require('../../assets/symbols/food/cheese.png'),
  'food/bread': require('../../assets/symbols/food/bread.png'),
  'food/chicken': require('../../assets/symbols/food/chicken.png'),
  'food/rice': require('../../assets/symbols/food/rice.png'),
  'food/pasta': require('../../assets/symbols/food/pasta.png'),
  'food/snack': require('../../assets/symbols/food/snack.png'),

  // Drinks
  'drinks/water': require('../../assets/symbols/drinks/water.png'),
  'drinks/milk': require('../../assets/symbols/drinks/milk.png'),
  'drinks/juice': require('../../assets/symbols/drinks/juice.png'),
  'drinks/cup': require('../../assets/symbols/drinks/cup.png'),

  // People
  'people/mom': require('../../assets/symbols/people/mom.png'),
  'people/dad': require('../../assets/symbols/people/dad.png'),
  'people/grandma': require('../../assets/symbols/people/grandma.png'),
  'people/grandpa': require('../../assets/symbols/people/grandpa.png'),
  'people/baby': require('../../assets/symbols/people/baby.png'),
  'people/teacher': require('../../assets/symbols/people/teacher.png'),
  'people/friend': require('../../assets/symbols/people/friend.png'),
  'people/me': require('../../assets/symbols/people/me.png'),

  // Actions
  'actions/eat': require('../../assets/symbols/actions/eat.png'),
  'actions/drink': require('../../assets/symbols/actions/drink.png'),
  'actions/play': require('../../assets/symbols/actions/play.png'),
  'actions/read': require('../../assets/symbols/actions/read.png'),
  'actions/sleep': require('../../assets/symbols/actions/sleep.png'),
  'actions/walk': require('../../assets/symbols/actions/walk.png'),
  'actions/run': require('../../assets/symbols/actions/run.png'),
  'actions/sit': require('../../assets/symbols/actions/sit.png'),
  'actions/stand': require('../../assets/symbols/actions/stand.png'),
  'actions/open': require('../../assets/symbols/actions/open.png'),
  'actions/close': require('../../assets/symbols/actions/close.png'),
  'actions/push': require('../../assets/symbols/actions/push.png'),
  'actions/pull': require('../../assets/symbols/actions/pull.png'),
  'actions/hug': require('../../assets/symbols/actions/hug.png'),
  'actions/kiss': require('../../assets/symbols/actions/kiss.png'),

  // Feelings
  'feelings/happy': require('../../assets/symbols/feelings/happy.png'),
  'feelings/sad': require('../../assets/symbols/feelings/sad.png'),
  'feelings/angry': require('../../assets/symbols/feelings/angry.png'),
  'feelings/scared': require('../../assets/symbols/feelings/scared.png'),
  'feelings/tired': require('../../assets/symbols/feelings/tired.png'),
  'feelings/sick': require('../../assets/symbols/feelings/sick.png'),
  'feelings/hungry': require('../../assets/symbols/feelings/hungry.png'),
  'feelings/thirsty': require('../../assets/symbols/feelings/thirsty.png'),
  'feelings/hurt': require('../../assets/symbols/feelings/hurt.png'),
  'feelings/love': require('../../assets/symbols/feelings/love.png'),
  'feelings/like': require('../../assets/symbols/feelings/like.png'),

  // Objects
  'objects/ball': require('../../assets/symbols/objects/ball.png'),
  'objects/book': require('../../assets/symbols/objects/book.png'),
  'objects/toy': require('../../assets/symbols/objects/toy.png'),
  'objects/blanket': require('../../assets/symbols/objects/blanket.png'),
  'objects/phone': require('../../assets/symbols/objects/phone.png'),
  'objects/tv': require('../../assets/symbols/objects/tv.png'),
  'objects/car': require('../../assets/symbols/objects/car.png'),
  'objects/bed': require('../../assets/symbols/objects/bed.png'),
  'objects/diaper': require('../../assets/symbols/objects/diaper.png'),
  'objects/potty': require('../../assets/symbols/objects/potty.png'),
  'objects/bath': require('../../assets/symbols/objects/bath.png'),
  'objects/shoes': require('../../assets/symbols/objects/shoes.png'),
  'objects/clothes': require('../../assets/symbols/objects/clothes.png'),
};

// Category icons
const CATEGORY_IMAGES: Record<string, any> = {
  'category_core-words': require('../../assets/ui/category-core.png'),
  'category_food': require('../../assets/ui/category-food.png'),
  'category_drinks': require('../../assets/ui/category-drinks.png'),
  'category_people': require('../../assets/ui/category-people.png'),
  'category_actions': require('../../assets/ui/category-actions.png'),
  'category_feelings': require('../../assets/ui/category-feelings.png'),
  'category_objects': require('../../assets/ui/category-objects.png'),
};

// Placeholder and folder icons
const PLACEHOLDER_IMAGE = require('../../assets/ui/placeholder.png');
const FOLDER_ICON = require('../../assets/ui/folder-icon.png');

// Get image source for vocabulary item or category
export function getImageSource(item: VocabularyItem | Category): ImageSourceType {
  if ('audioType' in item) {
    // It's a VocabularyItem
    if (item.imageType === 'custom') {
      return { uri: item.imagePath };
    }
    // Bundled image
    const bundledImage = SYMBOL_IMAGES[item.imagePath];
    if (bundledImage) {
      return bundledImage;
    }
    // Fallback to placeholder
    return PLACEHOLDER_IMAGE;
  } else {
    // It's a Category
    const categoryImage = CATEGORY_IMAGES[item.imagePath];
    if (categoryImage) {
      return categoryImage;
    }
    return FOLDER_ICON;
  }
}

// Get the directory for custom images
export function getCustomImagesDir(): string {
  return `${FileSystem.documentDirectory}${CUSTOM_IMAGES_DIR}/`;
}

// Ensure custom images directory exists
export async function ensureCustomImagesDirExists(): Promise<void> {
  const dir = getCustomImagesDir();
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
}

// Save an image to custom storage
export async function saveImageToStorage(sourceUri: string): Promise<string> {
  await ensureCustomImagesDirExists();

  const filename = `${generateId()}.jpg`;
  const destPath = `${getCustomImagesDir()}${filename}`;

  await FileSystem.copyAsync({
    from: sourceUri,
    to: destPath,
  });

  return destPath;
}

// Delete a custom image
export async function deleteImage(path: string): Promise<void> {
  try {
    const fileInfo = await FileSystem.getInfoAsync(path);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(path);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}
