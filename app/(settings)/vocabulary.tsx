import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useVocabulary } from '../../src/hooks/useVocabulary';
import { useCategories } from '../../src/hooks/useCategories';
import { VocabularyItem } from '../../src/types';
import { COLORS, CATEGORY_IDS } from '../../src/utils/constants';

export default function VocabularyScreen() {
  const router = useRouter();
  const { vocabulary, isLoading } = useVocabulary();
  const { categories, getById: getCategoryById } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter vocabulary
  const filteredVocabulary = vocabulary.filter((item) => {
    const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || item.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by category
  const groupedVocabulary = filteredVocabulary.reduce((groups, item) => {
    const categoryId = item.categoryId || 'uncategorized';
    if (!groups[categoryId]) {
      groups[categoryId] = [];
    }
    groups[categoryId].push(item);
    return groups;
  }, {} as Record<string, VocabularyItem[]>);

  const handleAddWord = useCallback(() => {
    router.push('/(settings)/add-word');
  }, [router]);

  const handleEditWord = useCallback((item: VocabularyItem) => {
    router.push(`/(settings)/edit-word/${item.id}`);
  }, [router]);

  const getCategoryLabel = (categoryId: string): string => {
    if (categoryId === 'uncategorized') return 'Uncategorized';
    const category = getCategoryById(categoryId);
    return category?.label || categoryId;
  };

  const renderItem = useCallback(
    ({ item }: { item: VocabularyItem }) => (
      <Pressable
        style={({ pressed }) => [
          styles.wordItem,
          pressed && styles.wordItemPressed,
        ]}
        onPress={() => handleEditWord(item)}
      >
        <View style={styles.wordIcon}>
          <Text style={styles.wordIconText}>
            {item.label.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.wordContent}>
          <Text style={styles.wordLabel}>{item.label}</Text>
          <Text style={styles.wordMeta}>
            {item.audioType === 'custom' ? 'Custom audio' : 'Text-to-speech'}
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    ),
    [handleEditWord]
  );

  const renderSectionHeader = (categoryId: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>
        {getCategoryLabel(categoryId)} ({groupedVocabulary[categoryId].length})
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading vocabulary...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search words..."
          placeholderTextColor={COLORS.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: null, label: 'All' }, ...categories]}
          keyExtractor={(item) => item.id || 'all'}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.filterChip,
                (selectedCategory === item.id || (selectedCategory === null && item.id === null)) &&
                  styles.filterChipSelected,
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  (selectedCategory === item.id || (selectedCategory === null && item.id === null)) &&
                    styles.filterChipTextSelected,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          )}
          contentContainerStyle={styles.filterContent}
        />
      </View>

      {/* Vocabulary List */}
      <FlatList
        data={Object.keys(groupedVocabulary)}
        keyExtractor={(categoryId) => categoryId}
        renderItem={({ item: categoryId }) => (
          <View>
            {renderSectionHeader(categoryId)}
            {groupedVocabulary[categoryId].map((vocabItem) => (
              <View key={vocabItem.id}>
                {renderItem({ item: vocabItem })}
              </View>
            ))}
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No words found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery ? 'Try a different search term' : 'Add your first word'}
            </Text>
          </View>
        }
      />

      {/* Add Button */}
      <Pressable style={styles.addButton} onPress={handleAddWord}>
        <Text style={styles.addButtonText}>+ Add Word</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  searchContainer: {
    padding: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInput: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  filterContainer: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterContent: {
    padding: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: COLORS.text,
  },
  filterChipTextSelected: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    backgroundColor: COLORS.background,
    padding: 12,
    paddingLeft: 16,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  wordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  wordItemPressed: {
    backgroundColor: COLORS.borderLight,
  },
  wordIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  wordIconText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.surface,
  },
  wordContent: {
    flex: 1,
  },
  wordLabel: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  wordMeta: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.textLight,
  },
  emptyContainer: {
    padding: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
});
