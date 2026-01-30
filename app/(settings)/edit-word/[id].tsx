import { useState, useCallback, useEffect } from 'react';
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useVocabulary } from '../../../src/hooks/useVocabulary';
import { useCategories } from '../../../src/hooks/useCategories';
import { COLORS } from '../../../src/utils/constants';

export default function EditWordScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { vocabulary, updateItem, deleteItem } = useVocabulary();
  const { categories } = useCategories();

  const item = vocabulary.find((v) => v.id === id);

  const [label, setLabel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [useCustomAudio, setUseCustomAudio] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load item data
  useEffect(() => {
    if (item) {
      setLabel(item.label);
      setSelectedCategory(item.categoryId);
      setUseCustomAudio(item.audioType === 'custom');
    }
  }, [item]);

  const handleSave = useCallback(async () => {
    if (!id) return;
    if (!label.trim()) {
      Alert.alert('Error', 'Please enter a word');
      return;
    }

    setIsSaving(true);
    try {
      await updateItem(id, {
        label: label.trim(),
        categoryId: selectedCategory,
        audioType: useCustomAudio ? 'custom' : 'tts',
      });

      Alert.alert('Success', 'Word updated successfully', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Error updating word:', error);
      Alert.alert('Error', 'Failed to update word. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [id, label, selectedCategory, useCustomAudio, updateItem, router]);

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Word?',
      `Are you sure you want to delete "${item?.label}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (!id) return;
            try {
              await deleteItem(id);
              router.back();
            } catch (error) {
              console.error('Error deleting word:', error);
              Alert.alert('Error', 'Failed to delete word. Please try again.');
            }
          },
        },
      ]
    );
  }, [id, item, deleteItem, router]);

  if (!item) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Word not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Word Label */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Word</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter word"
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
                ? 'Using custom recording'
                : 'Using text-to-speech'}
            </Text>
          </View>
          <Switch
            value={useCustomAudio}
            onValueChange={setUseCustomAudio}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
      </View>

      {/* Position Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Grid Position</Text>
        <Text style={styles.infoValue}>{item.gridPosition + 1}</Text>
        <Text style={styles.infoDescription}>
          Words maintain their positions for motor planning consistency
        </Text>
      </View>

      {/* Save Button */}
      <Pressable
        style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Text>
      </Pressable>

      {/* Delete Button */}
      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Word</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
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
  infoBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.primary,
  },
  infoDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
  deleteButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.error,
  },
});
