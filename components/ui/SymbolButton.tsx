// Main tappable symbol component for AAC communication
// Uses ARASAAC symbols (CC BY-NC-SA 4.0 - Sergio Palao / ARASAAC)

import React, { useCallback } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Symbol } from '@/data/symbols';
import { SymbolImageInfo } from '@/hooks/useSymbolImage';
import { COLORS, FONTS, SPACING, RADIUS } from '@/lib/theme';

export interface SymbolButtonProps {
  symbol: Symbol;
  imageInfo: SymbolImageInfo;
  onPress: (symbol: Symbol) => void;
  onLongPress?: (symbol: Symbol) => void;
  testID?: string;
}

export const SymbolButton: React.FC<SymbolButtonProps> = ({
  symbol,
  imageInfo,
  onPress,
  onLongPress,
  testID,
}) => {
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPress(symbol);
    },
    [symbol, onPress]
  );

  const handleLongPress = useCallback(
    (event: GestureResponderEvent) => {
      if (onLongPress) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        onLongPress(symbol);
      }
    },
    [symbol, onLongPress]
  );

  // Render the appropriate image type
  const renderImage = () => {
    if (imageInfo.type === 'bundled' && imageInfo.source) {
      return (
        <Image
          source={imageInfo.source}
          style={styles.symbolImage}
          resizeMode="contain"
        />
      );
    }

    if (imageInfo.type === 'custom' && imageInfo.uri) {
      return (
        <Image
          source={{ uri: imageInfo.uri }}
          style={styles.symbolImage}
          resizeMode="cover"
        />
      );
    }

    // Fallback to emoji
    return (
      <Text style={styles.emoji}>{imageInfo.emoji || symbol.icon}</Text>
    );
  };

  return (
    <TouchableOpacity
      testID={testID}
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={500}
      activeOpacity={0.7}
      accessibilityLabel={symbol.label}
      accessibilityRole="button"
      accessibilityHint={`Tap to say ${symbol.label}`}
      style={[
        styles.button,
        { backgroundColor: symbol.backgroundColor || COLORS.primaryLight },
      ]}
    >
      <View style={styles.imageContainer}>
        {renderImage()}
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label} numberOfLines={2} adjustsFontSizeToFit>
          {symbol.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    aspectRatio: 1,
    margin: SPACING.sm,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.sm,
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: SPACING.xs,
  },
  symbolImage: {
    width: '90%',
    height: '90%',
    borderRadius: RADIUS.sm,
  },
  emoji: {
    fontSize: FONTS.emoji,
    textAlign: 'center',
  },
  labelContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    marginTop: SPACING.xs,
    minWidth: '85%',
  },
  label: {
    fontSize: FONTS.labelMedium,
    fontWeight: 'bold',
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
