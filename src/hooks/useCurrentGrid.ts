import { useMemo } from 'react';
import { VocabularyItem, Category, GridItem } from '../types';
import { useVocabulary } from './useVocabulary';
import { useCategories } from './useCategories';
import { useCurrentCategory } from '../stores/appStore';

interface UseCurrentGridResult {
  items: VocabularyItem[];
  categories: Category[];
  allItems: GridItem[];
  isLoading: boolean;
  error: Error | null;
  isRoot: boolean;
  currentCategory: Category | undefined;
}

export function useCurrentGrid(): UseCurrentGridResult {
  const currentCategoryId = useCurrentCategory();
  const {
    vocabulary,
    getByCategory,
    isLoading: vocabLoading,
    error: vocabError,
  } = useVocabulary();
  const {
    categories,
    getRootCategories,
    getSubcategories,
    getById: getCategoryById,
    isLoading: catLoading,
    error: catError,
  } = useCategories();

  // Determine if we're at root level
  const isRoot = currentCategoryId === null;

  // Get current category info
  const currentCategory = useMemo(() => {
    if (isRoot) return undefined;
    return getCategoryById(currentCategoryId!);
  }, [isRoot, currentCategoryId, getCategoryById]);

  // Get vocabulary items for current view
  const items = useMemo(() => {
    if (isRoot) {
      // At root, show items without a category
      return getByCategory(null);
    }
    // In a category, show items in that category
    return getByCategory(currentCategoryId);
  }, [isRoot, currentCategoryId, getByCategory]);

  // Get categories for current view
  const visibleCategories = useMemo(() => {
    if (isRoot) {
      // At root, show root categories
      return getRootCategories();
    }
    // In a category, show subcategories
    return getSubcategories(currentCategoryId!);
  }, [isRoot, currentCategoryId, getRootCategories, getSubcategories]);

  // Combine and sort all items by grid position
  const allItems = useMemo((): GridItem[] => {
    const combined: GridItem[] = [...visibleCategories, ...items];
    return combined.sort((a, b) => a.gridPosition - b.gridPosition);
  }, [visibleCategories, items]);

  const isLoading = vocabLoading || catLoading;
  const error = vocabError || catError;

  return {
    items,
    categories: visibleCategories,
    allItems,
    isLoading,
    error,
    isRoot,
    currentCategory,
  };
}
