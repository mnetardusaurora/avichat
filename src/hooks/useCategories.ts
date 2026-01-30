import { useState, useEffect, useCallback } from 'react';
import { Category, CategoryRow, rowToCategory } from '../types';
import { getAll, runQuery } from '../db/database';
import { generateId } from '../utils/uuid';

interface UseCategoriesResult {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
  getRootCategories: () => Category[];
  getSubcategories: (parentId: string) => Category[];
  getById: (id: string) => Category | undefined;
  addCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load all categories
  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const rows = await getAll<CategoryRow>(
        'SELECT * FROM categories WHERE is_visible = 1 ORDER BY grid_position ASC'
      );

      const items = rows.map(rowToCategory);
      setCategories(items);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError(err instanceof Error ? err : new Error('Failed to load categories'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load on mount
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Get root categories (no parent)
  const getRootCategories = useCallback((): Category[] => {
    return categories.filter((cat) => cat.parentId === null);
  }, [categories]);

  // Get subcategories of a parent
  const getSubcategories = useCallback(
    (parentId: string): Category[] => {
      return categories.filter((cat) => cat.parentId === parentId);
    },
    [categories]
  );

  // Get category by ID
  const getById = useCallback(
    (id: string): Category | undefined => {
      return categories.find((cat) => cat.id === id);
    },
    [categories]
  );

  // Add new category
  const addCategory = useCallback(
    async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
      const id = generateId();
      const now = Date.now();

      await runQuery(
        `INSERT INTO categories
         (id, label, image_path, parent_id, grid_position, is_visible, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          category.label,
          category.imagePath,
          category.parentId,
          category.gridPosition,
          category.isVisible ? 1 : 0,
          now,
          now,
        ]
      );

      await loadCategories();
      return id;
    },
    [loadCategories]
  );

  // Update existing category
  const updateCategory = useCallback(
    async (id: string, updates: Partial<Category>): Promise<void> => {
      const now = Date.now();
      const setClauses: string[] = ['updated_at = ?'];
      const params: (string | number | null)[] = [now];

      if (updates.label !== undefined) {
        setClauses.push('label = ?');
        params.push(updates.label);
      }
      if (updates.imagePath !== undefined) {
        setClauses.push('image_path = ?');
        params.push(updates.imagePath);
      }
      if (updates.parentId !== undefined) {
        setClauses.push('parent_id = ?');
        params.push(updates.parentId);
      }
      if (updates.gridPosition !== undefined) {
        setClauses.push('grid_position = ?');
        params.push(updates.gridPosition);
      }
      if (updates.isVisible !== undefined) {
        setClauses.push('is_visible = ?');
        params.push(updates.isVisible ? 1 : 0);
      }

      params.push(id);

      await runQuery(
        `UPDATE categories SET ${setClauses.join(', ')} WHERE id = ?`,
        params
      );

      await loadCategories();
    },
    [loadCategories]
  );

  // Delete category
  const deleteCategory = useCallback(
    async (id: string): Promise<void> => {
      // Move all vocabulary items in this category to root (null category)
      await runQuery(
        'UPDATE vocabulary SET category_id = NULL, updated_at = ? WHERE category_id = ?',
        [Date.now(), id]
      );

      // Delete the category
      await runQuery('DELETE FROM categories WHERE id = ?', [id]);

      await loadCategories();
    },
    [loadCategories]
  );

  return {
    categories,
    isLoading,
    error,
    getRootCategories,
    getSubcategories,
    getById,
    addCategory,
    updateCategory,
    deleteCategory,
    refresh: loadCategories,
  };
}
