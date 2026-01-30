import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Category } from '../types';
import { COLORS, LABEL_SIZES } from '../utils/constants';
import { getImageSource } from '../utils/imageUtils';

interface CategoryButtonProps {
  category: Category;
  size: number;
  onPress: () => void;
  showLabel: boolean;
  labelSize: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

function CategoryButtonComponent({
  category,
  size,
  onPress,
  showLabel,
  labelSize,
  disabled = false,
}: CategoryButtonProps) {
  const imageSource = getImageSource(category);
  const imageHeight = showLabel ? size * 0.75 : size * 0.85;
  const fontSize = LABEL_SIZES[labelSize];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={`Open ${category.label}`}
      accessibilityRole="button"
      accessibilityHint={`Tap to see words in ${category.label}`}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.container,
        {
          width: size,
          height: size,
          transform: [{ scale: pressed ? 0.95 : 1 }],
          opacity: disabled ? 0.5 : 1,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.folderOverlay} />
      <View style={[styles.imageContainer, { height: imageHeight }]}>
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text
            style={[styles.label, { fontSize }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {category.label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    backgroundColor: COLORS.categoryOverlay,
    borderColor: COLORS.primaryDark,
  },
  folderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    opacity: 0.3,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  image: {
    width: '80%',
    height: '80%',
  },
  labelContainer: {
    paddingTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
  },
});

export const CategoryButton = memo(CategoryButtonComponent);
