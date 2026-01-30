// AsyncStorage helpers for persisting custom images

import AsyncStorage from '@react-native-async-storage/async-storage';

const CUSTOM_IMAGES_KEY = 'avichat_custom_images';

export interface CustomImageMap {
  [symbolId: string]: string; // symbolId -> local URI
}

/**
 * Get all custom images
 */
export const getCustomImages = async (): Promise<CustomImageMap> => {
  try {
    const data = await AsyncStorage.getItem(CUSTOM_IMAGES_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading custom images:', error);
    return {};
  }
};

/**
 * Get custom image for a specific symbol
 */
export const getCustomImage = async (symbolId: string): Promise<string | null> => {
  const images = await getCustomImages();
  return images[symbolId] || null;
};

/**
 * Save a custom image for a symbol
 */
export const saveCustomImage = async (symbolId: string, uri: string): Promise<void> => {
  try {
    const images = await getCustomImages();
    images[symbolId] = uri;
    await AsyncStorage.setItem(CUSTOM_IMAGES_KEY, JSON.stringify(images));
  } catch (error) {
    console.error('Error saving custom image:', error);
    throw error;
  }
};

/**
 * Remove a custom image for a symbol
 */
export const removeCustomImage = async (symbolId: string): Promise<void> => {
  try {
    const images = await getCustomImages();
    delete images[symbolId];
    await AsyncStorage.setItem(CUSTOM_IMAGES_KEY, JSON.stringify(images));
  } catch (error) {
    console.error('Error removing custom image:', error);
    throw error;
  }
};

/**
 * Clear all custom images
 */
export const clearAllCustomImages = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CUSTOM_IMAGES_KEY);
  } catch (error) {
    console.error('Error clearing custom images:', error);
    throw error;
  }
};
