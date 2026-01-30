// Main tappable symbol component for AAC communication

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

export interface SymbolButtonProps {
  symbol: Symbol;
  imageInfo: { type: 'emoji' | 'image'; value: string };
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
      // Trigger haptic feedback
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
        { backgroundColor: symbol.backgroundColor || '#E5E5E5' },
      ]}
    >
      <View style={styles.iconContainer}>
        {imageInfo.type === 'image' ? (
          <Image
            source={{ uri: imageInfo.value }}
            style={styles.customImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.emoji}>{imageInfo.value}</Text>
        )}
      </View>
      <Text style={styles.label} numberOfLines={2} adjustsFontSizeToFit>
        {symbol.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    aspectRatio: 1,
    margin: 6,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
  },
  customImage: {
    width: '80%',
    height: '80%',
    borderRadius: 12,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 4,
  },
});
