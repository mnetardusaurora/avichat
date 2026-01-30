import { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useCategories } from '../../src/hooks/useCategories';
import { useVocabulary } from '../../src/hooks/useVocabulary';
import { Category } from '../../src/types';
import { COLORS } from '../../src/utils/constants';

export default function CategoriesScreen() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { vocabulary } = useVocabulary();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');

  // Count items in each category
  const getCategoryItemCount = (categoryId: string): number => {
    return vocabulary.filter((item) => item.categoryId === categoryId).length;
  };

  const handleAddCategory = useCallback(() => {
    setEditingCategory(null);
    setCategoryName('');
    setShowModal(true);
  }, []);

  const handleEditCategory = useCallback((category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.label);
    setShowModal(true);
  }, []);

  const handleSaveCategory = useCallback(async () => {
    if (!categoryName.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, { label: categoryName.trim() });
      } else {
        const nextPosition = categories.length;
        await addCategory({
          label: categoryName.trim(),
          imagePath: 'category_custom',
          parentId: null,
          gridPosition: nextPosition,
          isVisible: true,
        });
      }
      setShowModal(false);
      setCategoryName('');
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      Alert.alert('Error', 'Failed to save category. Please try again.');
    }
  }, [categoryName, editingCategory, categories, addCategory, updateCategory]);

  const handleDeleteCategory = useCallback(
    (category: Category) => {
      const itemCount = getCategoryItemCount(category.id);
      Alert.alert(
        'Delete Category?',
        itemCount > 0
          ? `This category has ${itemCount} word${itemCount > 1 ? 's' : ''}. They will be moved to the main grid. This cannot be undone.`
          : `Are you sure you want to delete "${category.label}"? This cannot be undone.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteCategory(category.id);
              } catch (error) {
                console.error('Error deleting category:', error);
                Alert.alert('Error', 'Failed to delete category. Please try again.');
              }
            },
          },
        ]
      );
    },
    [deleteCategory, getCategoryItemCount]
  );

  const renderCategory = useCallback(
    ({ item }: { item: Category }) => {
      const itemCount = getCategoryItemCount(item.id);
      return (
        <View style={styles.categoryItem}>
          <Pressable
            style={styles.categoryContent}
            onPress={() => handleEditCategory(item)}
          >
            <View style={styles.categoryIcon}>
              <Text style={styles.categoryIconText}>
                {item.label.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryLabel}>{item.label}</Text>
              <Text style={styles.categoryMeta}>
                {itemCount} word{itemCount !== 1 ? 's' : ''} · Position {item.gridPosition + 1}
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.deleteIconButton}
            onPress={() => handleDeleteCategory(item)}
          >
            <Text style={styles.deleteIcon}>×</Text>
          </Pressable>
        </View>
      );
    },
    [handleEditCategory, handleDeleteCategory, getCategoryItemCount]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No categories</Text>
            <Text style={styles.emptySubtext}>
              Create categories to organize your vocabulary
            </Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Categories help organize vocabulary into groups. Words inside a category
              appear when you tap on the category button.
            </Text>
          </View>
        }
      />

      <Pressable style={styles.addButton} onPress={handleAddCategory}>
        <Text style={styles.addButtonText}>+ Add Category</Text>
      </Pressable>

      {/* Add/Edit Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Category name"
              placeholderTextColor={COLORS.textLight}
              value={categoryName}
              onChangeText={setCategoryName}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalCancelButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalSaveButton} onPress={handleSaveCategory}>
                <Text style={styles.modalSaveText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  infoBox: {
    backgroundColor: COLORS.categoryOverlay,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  categoryContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIconText: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.surface,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  categoryMeta: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  deleteIconButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    fontSize: 24,
    color: COLORS.error,
    fontWeight: '300',
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
    textAlign: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  modalSaveButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  modalSaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
});
