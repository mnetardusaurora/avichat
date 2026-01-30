import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { VocabularyItem } from '../types';
import { COLORS, LABEL_SIZES } from '../utils/constants';
import { getImageSource } from '../utils/imageUtils';

interface SymbolButtonProps {
  item: VocabularyItem;
  size: number;
  onPress: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  showLabel: boolean;
  labelSize: 'small' | 'medium' | 'large';
  disabled?: boolean;
  speakOnPress?: boolean;
}

function SymbolButtonComponent({
  item,
  size,
  onPress,
  onPressIn,
  onPressOut,
  showLabel,
  labelSize,
  disabled = false,
  speakOnPress = true,
}: SymbolButtonProps) {
  const imageSource = getImageSource(item);
  const imageHeight = showLabel ? size * 0.75 : size * 0.85;
  const fontSize = LABEL_SIZES[labelSize];

  const handlePressIn = useCallback(() => {
    if (speakOnPress && onPressIn) {
      onPressIn();
    }
  }, [speakOnPress, onPressIn]);

  const handlePressOut = useCallback(() => {
    if (!speakOnPress && onPressOut) {
      onPressOut();
    }
  }, [speakOnPress, onPressOut]);

  const handlePress = useCallback(() => {
    if (speakOnPress) {
      onPress();
    }
  }, [speakOnPress, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityLabel={item.label}
      accessibilityRole="button"
      accessibilityHint={`Tap to hear ${item.label}`}
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
      <View style={[styles.imageContainer, { height: imageHeight }]}>
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="contain"
          defaultSource={require('../../assets/ui/placeholder.png')}
        />
      </View>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text
            style={[styles.label, { fontSize }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.label}
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
    borderWidth: 1,
    borderColor: COLORS.border,
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
    backgroundColor: COLORS.borderLight,
    borderColor: COLORS.primary,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
  },
  labelContainer: {
    paddingTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
});

export const SymbolButton = memo(SymbolButtonComponent);
