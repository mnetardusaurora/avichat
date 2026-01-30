import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useAppStore, useSettings } from '../../src/stores/appStore';
import { COLORS, GRID_SIZE_OPTIONS } from '../../src/utils/constants';

export default function GridLayoutScreen() {
  const settings = useSettings();
  const setSettings = useAppStore((state) => state.setSettings);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.description}>
        Choose a grid size. Larger grids show more words at once, but buttons
        will be smaller.
      </Text>

      <View style={styles.optionsContainer}>
        {GRID_SIZE_OPTIONS.map((option) => {
          const isSelected =
            settings.gridRows === option.rows &&
            settings.gridColumns === option.columns;

          return (
            <Pressable
              key={option.label}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected,
              ]}
              onPress={() =>
                setSettings({
                  gridRows: option.rows,
                  gridColumns: option.columns,
                })
              }
            >
              <View style={styles.gridPreview}>
                {Array.from({ length: option.rows }).map((_, rowIndex) => (
                  <View key={rowIndex} style={styles.gridRow}>
                    {Array.from({ length: option.columns }).map((_, colIndex) => (
                      <View
                        key={colIndex}
                        style={[
                          styles.gridCell,
                          isSelected && styles.gridCellSelected,
                        ]}
                      />
                    ))}
                  </View>
                ))}
              </View>
              <Text
                style={[
                  styles.optionLabel,
                  isSelected && styles.optionLabelSelected,
                ]}
              >
                {option.label}
              </Text>
              {isSelected && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Tip</Text>
        <Text style={styles.infoText}>
          Start with a smaller grid (3×3 or 4×4) for young children. You can
          always increase the size as they become more comfortable.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 24,
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  optionButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.categoryOverlay,
  },
  gridPreview: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
  },
  gridCell: {
    flex: 1,
    margin: 1,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },
  gridCellSelected: {
    backgroundColor: COLORS.primary,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  optionLabelSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '700',
  },
  infoBox: {
    marginTop: 32,
    backgroundColor: COLORS.categoryOverlay,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
