// Hook for managing symbol images (built-in vs custom photos)

import { useState, useEffect, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getCustomImages, saveCustomImage, removeCustomImage, CustomImageMap } from '@/lib/storage';

export interface UseSymbolImageReturn {
  customImages: CustomImageMap;
  getImageForSymbol: (symbolId: string, defaultIcon: string) => { type: 'emoji' | 'image'; value: string };
  pickImage: (symbolId: string) => Promise<void>;
  removeImage: (symbolId: string) => Promise<void>;
  isLoading: boolean;
}

/**
 * Hook for managing symbol images with custom photo support
 */
export const useSymbolImage = (): UseSymbolImageReturn => {
  const [customImages, setCustomImages] = useState<CustomImageMap>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load custom images on mount
  useEffect(() => {
    const loadImages = async () => {
      const images = await getCustomImages();
      setCustomImages(images);
      setIsLoading(false);
    };
    loadImages();
  }, []);

  // Get the image to display for a symbol
  const getImageForSymbol = useCallback(
    (symbolId: string, defaultIcon: string): { type: 'emoji' | 'image'; value: string } => {
      const customUri = customImages[symbolId];
      if (customUri) {
        return { type: 'image', value: customUri };
      }
      return { type: 'emoji', value: defaultIcon };
    },
    [customImages]
  );

  // Pick a new image for a symbol
  const pickImage = useCallback(async (symbolId: string) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access photos is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      await saveCustomImage(symbolId, uri);
      setCustomImages(prev => ({ ...prev, [symbolId]: uri }));
    }
  }, []);

  // Remove a custom image for a symbol
  const removeImage = useCallback(async (symbolId: string) => {
    await removeCustomImage(symbolId);
    setCustomImages(prev => {
      const next = { ...prev };
      delete next[symbolId];
      return next;
    });
  }, []);

  return {
    customImages,
    getImageForSymbol,
    pickImage,
    removeImage,
    isLoading,
  };
};
