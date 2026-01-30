import { useState, useEffect, useCallback } from 'react';
import { VocabularyItem, VocabularyRow, rowToVocabularyItem } from '../types';
import { getAll, getOne, runQuery } from '../db/database';
import { generateId } from '../utils/uuid';

interface UseVocabularyResult {
  vocabulary: VocabularyItem[];
  isLoading: boolean;
  error: Error | null;
  getByCategory: (categoryId: string | null) => VocabularyItem[];
  getById: (id: string) => VocabularyItem | undefined;
  addItem: (item: Omit<VocabularyItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateItem: (id: string, updates: Partial<VocabularyItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  moveItem: (id: string, newPosition: number) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useVocabulary(): UseVocabularyResult {
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load all vocabulary
  const loadVocabulary = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const rows = await getAll<VocabularyRow>(
        'SELECT * FROM vocabulary WHERE is_visible = 1 ORDER BY grid_position ASC'
      );

      const items = rows.map(rowToVocabularyItem);
      setVocabulary(items);
    } catch (err) {
      console.error('Error loading vocabulary:', err);
      setError(err instanceof Error ? err : new Error('Failed to load vocabulary'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load on mount
  useEffect(() => {
    loadVocabulary();
  }, [loadVocabulary]);

  // Get items by category
  const getByCategory = useCallback(
    (categoryId: string | null): VocabularyItem[] => {
      return vocabulary.filter((item) => item.categoryId === categoryId);
    },
    [vocabulary]
  );

  // Get item by ID
  const getById = useCallback(
    (id: string): VocabularyItem | undefined => {
      return vocabulary.find((item) => item.id === id);
    },
    [vocabulary]
  );

  // Add new item
  const addItem = useCallback(
    async (item: Omit<VocabularyItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
      const id = generateId();
      const now = Date.now();

      await runQuery(
        `INSERT INTO vocabulary
         (id, label, image_type, image_path, audio_type, audio_path, category_id, grid_position, is_visible, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          item.label,
          item.imageType,
          item.imagePath,
          item.audioType,
          item.audioPath,
          item.categoryId,
          item.gridPosition,
          item.isVisible ? 1 : 0,
          now,
          now,
        ]
      );

      await loadVocabulary();
      return id;
    },
    [loadVocabulary]
  );

  // Update existing item
  const updateItem = useCallback(
    async (id: string, updates: Partial<VocabularyItem>): Promise<void> => {
      const now = Date.now();
      const setClauses: string[] = ['updated_at = ?'];
      const params: (string | number | null)[] = [now];

      if (updates.label !== undefined) {
        setClauses.push('label = ?');
        params.push(updates.label);
      }
      if (updates.imageType !== undefined) {
        setClauses.push('image_type = ?');
        params.push(updates.imageType);
      }
      if (updates.imagePath !== undefined) {
        setClauses.push('image_path = ?');
        params.push(updates.imagePath);
      }
      if (updates.audioType !== undefined) {
        setClauses.push('audio_type = ?');
        params.push(updates.audioType);
      }
      if (updates.audioPath !== undefined) {
        setClauses.push('audio_path = ?');
        params.push(updates.audioPath);
      }
      if (updates.categoryId !== undefined) {
        setClauses.push('category_id = ?');
        params.push(updates.categoryId);
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
        `UPDATE vocabulary SET ${setClauses.join(', ')} WHERE id = ?`,
        params
      );

      await loadVocabulary();
    },
    [loadVocabulary]
  );

  // Delete item
  const deleteItem = useCallback(
    async (id: string): Promise<void> => {
      await runQuery('DELETE FROM vocabulary WHERE id = ?', [id]);
      await loadVocabulary();
    },
    [loadVocabulary]
  );

  // Move item to new position
  const moveItem = useCallback(
    async (id: string, newPosition: number): Promise<void> => {
      const item = vocabulary.find((v) => v.id === id);
      if (!item) return;

      // Find item at target position in same category
      const targetItem = vocabulary.find(
        (v) => v.categoryId === item.categoryId && v.gridPosition === newPosition && v.id !== id
      );

      if (targetItem) {
        // Swap positions
        await runQuery(
          'UPDATE vocabulary SET grid_position = ?, updated_at = ? WHERE id = ?',
          [item.gridPosition, Date.now(), targetItem.id]
        );
      }

      await runQuery(
        'UPDATE vocabulary SET grid_position = ?, updated_at = ? WHERE id = ?',
        [newPosition, Date.now(), id]
      );

      await loadVocabulary();
    },
    [vocabulary, loadVocabulary]
  );

  return {
    vocabulary,
    isLoading,
    error,
    getByCategory,
    getById,
    addItem,
    updateItem,
    deleteItem,
    moveItem,
    refresh: loadVocabulary,
  };
}
