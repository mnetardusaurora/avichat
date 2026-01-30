import React, { memo } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { COLORS, LABEL_SIZES } from '../utils/constants';

interface BackButtonProps {
  size: number;
  onPress: () => void;
  showLabel: boolean;
  labelSize: 'small' | 'medium' | 'large';
}

function BackButtonComponent({
  size,
  onPress,
  showLabel,
  labelSize,
}: BackButtonProps) {
  const fontSize = LABEL_SIZES[labelSize];
  const arrowSize = Math.min(size * 0.4, 60);

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel="Go back"
      accessibilityRole="button"
      accessibilityHint="Tap to return to the previous screen"
      style={({ pressed }) => [
        styles.container,
        {
          width: size,
          height: size,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.arrowContainer, { width: arrowSize, height: arrowSize }]}>
        <Text style={[styles.arrow, { fontSize: arrowSize * 0.6 }]}>←</Text>
      </View>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { fontSize }]}>Back</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: COLORS.borderLight,
    borderColor: COLORS.textSecondary,
  },
  arrowContainer: {
    backgroundColor: COLORS.textSecondary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    color: COLORS.surface,
    fontWeight: '700',
  },
  labelContainer: {
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export const BackButton = memo(BackButtonComponent);
