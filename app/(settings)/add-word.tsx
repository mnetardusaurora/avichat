import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useVocabulary } from '../../src/hooks/useVocabulary';
import { useCategories } from '../../src/hooks/useCategories';
import { COLORS } from '../../src/utils/constants';

export default function AddWordScreen() {
  const router = useRouter();
  const { addItem, vocabulary } = useVocabulary();
  const { categories } = useCategories();

  const [label, setLabel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [useCustomAudio, setUseCustomAudio] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Calculate next available position in category
  const getNextPosition = (): number => {
    const categoryItems = vocabulary.filter(
      (item) => item.categoryId === selectedCategory
    );
    if (categoryItems.length === 0) return 0;
    return Math.max(...categoryItems.map((item) => item.gridPosition)) + 1;
  };

  const handleSave = useCallback(async () => {
    if (!label.trim()) {
      Alert.alert('Error', 'Please enter a word');
      return;
    }

    setIsSaving(true);
    try {
      await addItem({
        label: label.trim(),
        imageType: 'bundled',
        imagePath: 'placeholder', // Will use placeholder image
        audioType: useCustomAudio ? 'custom' : 'tts',
        audioPath: null,
        categoryId: selectedCategory,
        gridPosition: getNextPosition(),
        isVisible: true,
      });

      Alert.alert('Success', 'Word added successfully', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Error adding word:', error);
      Alert.alert('Error', 'Failed to add word. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [label, selectedCategory, useCustomAudio, addItem, router, getNextPosition]);

  return (
    <ScrollView style={styles.container}>
      {/* Word Label */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Word</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter word (e.g., 'ball')"
          placeholderTextColor={COLORS.textLight}
          value={label}
          onChangeText={setLabel}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Category Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.categoryList}>
          <Pressable
            style={[
              styles.categoryChip,
              selectedCategory === null && styles.categoryChipSelected,
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === null && styles.categoryChipTextSelected,
              ]}
            >
              No Category
            </Text>
          </Pressable>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipSelected,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category.id && styles.categoryChipTextSelected,
                ]}
              >
                {category.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Audio Type */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audio</Text>
        <View style={styles.toggleRow}>
          <View style={styles.toggleContent}>
            <Text style={styles.toggleLabel}>Use Custom Recording</Text>
            <Text style={styles.toggleDescription}>
              {useCustomAudio
                ? 'Record your own audio for this word'
                : 'Use text-to-speech for this word'}
            </Text>
          </View>
          <Switch
            value={useCustomAudio}
            onValueChange={setUseCustomAudio}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
        {useCustomAudio && (
          <View style={styles.recordingNote}>
            <Text style={styles.recordingNoteText}>
              Custom audio recording will be available after saving. Edit the word
              to record audio.
            </Text>
          </View>
        )}
      </View>

      {/* Position Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          This word will appear in position {getNextPosition() + 1} of the{' '}
          {selectedCategory
            ? categories.find((c) => c.id === selectedCategory)?.label || 'selected'
            : 'main'}{' '}
          grid.
        </Text>
      </View>

      {/* Save Button */}
      <Pressable
        style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? 'Saving...' : 'Save Word'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryChipText: {
    fontSize: 14,
    color: COLORS.text,
  },
  categoryChipTextSelected: {
    color: COLORS.surface,
    fontWeight: '600',
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
  recordingNote: {
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.categoryOverlay,
    borderRadius: 8,
  },
  recordingNoteText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  infoBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
});
