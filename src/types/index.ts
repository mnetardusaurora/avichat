// Vocabulary item representing a symbol/word in the AAC grid
export interface VocabularyItem {
  id: string;
  label: string;
  imageType: 'bundled' | 'custom';
  imagePath: string;
  audioType: 'tts' | 'custom';
  audioPath: string | null;
  categoryId: string | null;
  gridPosition: number;
  isVisible: boolean;
  createdAt: number;
  updatedAt: number;
}

// Category (folder) for organizing vocabulary items
export interface Category {
  id: string;
  label: string;
  imagePath: string;
  parentId: string | null;
  gridPosition: number;
  isVisible: boolean;
  createdAt: number;
  updatedAt: number;
}

// Grid configuration
export interface GridConfig {
  id: string;
  name: string;
  rows: number;
  columns: number;
  isActive: boolean;
  createdAt: number;
}

// App settings
export interface AppSettings {
  gridRows: number;
  gridColumns: number;
  speakOnPress: boolean;
  speechRate: number;
  showLabels: boolean;
  labelSize: 'small' | 'medium' | 'large';
  buttonPadding: 'compact' | 'normal' | 'spacious';
  pinCode: string;
  isPinEnabled: boolean;
}

// Type guard to check if an item is a VocabularyItem
export function isVocabularyItem(item: VocabularyItem | Category): item is VocabularyItem {
  return 'audioType' in item;
}

// Type guard to check if an item is a Category
export function isCategory(item: VocabularyItem | Category): item is Category {
  return !('audioType' in item);
}

// Grid item type (can be either vocabulary or category)
export type GridItem = VocabularyItem | Category;

// Speech options for TTS
export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  language?: string;
}

// Image source type for React Native Image component
export type ImageSourceType =
  | { uri: string }
  | number; // For bundled images via require()

// Database row types (snake_case from SQLite)
export interface VocabularyRow {
  id: string;
  label: string;
  image_type: string;
  image_path: string;
  audio_type: string;
  audio_path: string | null;
  category_id: string | null;
  grid_position: number;
  is_visible: number;
  created_at: number;
  updated_at: number;
}

export interface CategoryRow {
  id: string;
  label: string;
  image_path: string;
  parent_id: string | null;
  grid_position: number;
  is_visible: number;
  created_at: number;
  updated_at: number;
}

export interface SettingsRow {
  key: string;
  value: string;
}

export interface GridRow {
  id: string;
  name: string;
  rows: number;
  columns: number;
  is_active: number;
  created_at: number;
}

// Conversion functions from database rows to app types
export function rowToVocabularyItem(row: VocabularyRow): VocabularyItem {
  return {
    id: row.id,
    label: row.label,
    imageType: row.image_type as 'bundled' | 'custom',
    imagePath: row.image_path,
    audioType: row.audio_type as 'tts' | 'custom',
    audioPath: row.audio_path,
    categoryId: row.category_id,
    gridPosition: row.grid_position,
    isVisible: row.is_visible === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function rowToCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    label: row.label,
    imagePath: row.image_path,
    parentId: row.parent_id,
    gridPosition: row.grid_position,
    isVisible: row.is_visible === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function rowToGridConfig(row: GridRow): GridConfig {
  return {
    id: row.id,
    name: row.name,
    rows: row.rows,
    columns: row.columns,
    isActive: row.is_active === 1,
    createdAt: row.created_at,
  };
}
