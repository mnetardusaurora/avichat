import { View, Text, ScrollView, StyleSheet, Switch, Pressable } from 'react-native';
import { useAppStore, useSettings } from '../../src/stores/appStore';
import { COLORS, PADDING_VALUES } from '../../src/utils/constants';

export default function AppearanceScreen() {
  const settings = useSettings();
  const setSettings = useAppStore((state) => state.setSettings);

  const labelSizeOptions: { value: 'small' | 'medium' | 'large'; label: string }[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const paddingOptions: { value: 'compact' | 'normal' | 'spacious'; label: string }[] = [
    { value: 'compact', label: 'Compact' },
    { value: 'normal', label: 'Normal' },
    { value: 'spacious', label: 'Spacious' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Show Labels Toggle */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Labels</Text>
        <View style={styles.toggleRow}>
          <View style={styles.toggleContent}>
            <Text style={styles.toggleLabel}>Show Word Labels</Text>
            <Text style={styles.toggleDescription}>
              Display the word below each symbol
            </Text>
          </View>
          <Switch
            value={settings.showLabels}
            onValueChange={(value) => setSettings({ showLabels: value })}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
      </View>

      {/* Label Size */}
      {settings.showLabels && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Label Size</Text>
          <View style={styles.optionsRow}>
            {labelSizeOptions.map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.optionButton,
                  settings.labelSize === option.value && styles.optionButtonSelected,
                ]}
                onPress={() => setSettings({ labelSize: option.value })}
              >
                <Text
                  style={[
                    styles.optionText,
                    settings.labelSize === option.value && styles.optionTextSelected,
                    { fontSize: option.value === 'small' ? 12 : option.value === 'medium' ? 16 : 20 },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Button Spacing */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button Spacing</Text>
        <Text style={styles.sectionDescription}>
          Adjust the space between buttons
        </Text>
        <View style={styles.optionsRow}>
          {paddingOptions.map((option) => (
            <Pressable
              key={option.value}
              style={[
                styles.optionButton,
                settings.buttonPadding === option.value && styles.optionButtonSelected,
              ]}
              onPress={() => setSettings({ buttonPadding: option.value })}
            >
              <Text
                style={[
                  styles.optionText,
                  settings.buttonPadding === option.value && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preview</Text>
        <View style={styles.previewContainer}>
          <View
            style={[
              styles.previewButton,
              { margin: PADDING_VALUES[settings.buttonPadding].gap / 2 },
            ]}
          >
            <View style={styles.previewImage} />
            {settings.showLabels && (
              <Text
                style={[
                  styles.previewLabel,
                  { fontSize: settings.labelSize === 'small' ? 12 : settings.labelSize === 'medium' ? 16 : 20 },
                ]}
              >
                word
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
  },
  toggleContent: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  toggleDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  optionButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.categoryOverlay,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  previewContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  previewButton: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewImage: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.borderLight,
    borderRadius: 8,
    marginBottom: 4,
  },
  previewLabel: {
    fontWeight: '600',
    color: COLORS.text,
  },
});
