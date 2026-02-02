// Category header with back button and title - Avocado Theme

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS, SPACING, RADIUS } from '@/lib/theme';

export interface CategoryHeaderProps {
  title: string;
  onBackPress: () => void;
  showBack?: boolean;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  title,
  onBackPress,
  showBack = true,
}) => {
  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBackPress();
  };

  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
          testID="back-button"
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.title} testID="header-title">
        {title}
      </Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primaryDark,
  },
  backButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: RADIUS.sm,
  },
  backText: {
    fontSize: FONTS.labelMedium,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  title: {
    fontSize: FONTS.title,
    fontWeight: 'bold',
    color: COLORS.textLight,
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 80,
  },
});
