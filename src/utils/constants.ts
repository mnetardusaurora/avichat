import { AppSettings } from '../types';

// Default app settings
export const DEFAULT_SETTINGS: AppSettings = {
  gridRows: 3,
  gridColumns: 3,
  speakOnPress: true,
  speechRate: 0.8, // Slightly slower for learning
  showLabels: true,
  labelSize: 'medium',
  buttonPadding: 'normal',
  pinCode: '',
  isPinEnabled: false,
};

// Grid size options (2x2 through 6x6)
export const GRID_SIZE_OPTIONS = [
  { rows: 2, columns: 2, label: '2 x 2 (4 items)' },
  { rows: 2, columns: 3, label: '2 x 3 (6 items)' },
  { rows: 3, columns: 3, label: '3 x 3 (9 items)' },
  { rows: 3, columns: 4, label: '3 x 4 (12 items)' },
  { rows: 4, columns: 4, label: '4 x 4 (16 items)' },
  { rows: 4, columns: 5, label: '4 x 5 (20 items)' },
  { rows: 5, columns: 5, label: '5 x 5 (25 items)' },
  { rows: 5, columns: 6, label: '5 x 6 (30 items)' },
  { rows: 6, columns: 6, label: '6 x 6 (36 items)' },
];

// Speech rate options (0.5 to 1.5)
export const SPEECH_RATE_OPTIONS = [
  { value: 0.5, label: 'Very Slow' },
  { value: 0.6, label: 'Slower' },
  { value: 0.7, label: 'Slow' },
  { value: 0.8, label: 'Normal (Recommended)' },
  { value: 0.9, label: 'Slightly Fast' },
  { value: 1.0, label: 'Fast' },
  { value: 1.1, label: 'Faster' },
  { value: 1.2, label: 'Very Fast' },
  { value: 1.3, label: 'Extra Fast' },
  { value: 1.4, label: 'Maximum' },
  { value: 1.5, label: 'Super Fast' },
];

// Predefined category IDs
export const CATEGORY_IDS = {
  ROOT: 'root',
  CORE: 'core-words',
  FOOD: 'food',
  DRINKS: 'drinks',
  PEOPLE: 'people',
  ACTIONS: 'actions',
  FEELINGS: 'feelings',
  OBJECTS: 'objects',
} as const;

// File path constants
export const CUSTOM_IMAGES_DIR = 'custom-images';
export const CUSTOM_AUDIO_DIR = 'custom-audio';
export const BUNDLED_SYMBOLS_DIR = 'assets/symbols';

// Label size values in pixels
export const LABEL_SIZES = {
  small: 12,
  medium: 16,
  large: 20,
} as const;

// Padding values for grid
export const PADDING_VALUES = {
  compact: { container: 8, gap: 4 },
  normal: { container: 16, gap: 8 },
  spacious: { container: 24, gap: 12 },
} as const;

// PIN configuration
export const PIN_LENGTH = 4;

// Touch target minimums (Apple HIG)
export const MIN_TOUCH_TARGET = 44;
export const CHILD_TOUCH_TARGET = 60; // Larger for young children

// Database name
export const DATABASE_NAME = 'avitalk.db';

// Settings keys for database
export const SETTINGS_KEYS = {
  GRID_ROWS: 'gridRows',
  GRID_COLUMNS: 'gridColumns',
  SPEAK_ON_PRESS: 'speakOnPress',
  SPEECH_RATE: 'speechRate',
  SHOW_LABELS: 'showLabels',
  LABEL_SIZE: 'labelSize',
  BUTTON_PADDING: 'buttonPadding',
  PIN_CODE: 'pinCode',
  IS_PIN_ENABLED: 'isPinEnabled',
  SCHEMA_VERSION: 'schemaVersion',
  IS_SEEDED: 'isSeeded',
} as const;

// App theme colors
export const COLORS = {
  primary: '#4A90D9',
  primaryDark: '#3A7BC8',
  secondary: '#5CB85C',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  error: '#D9534F',
  warning: '#F0AD4E',
  success: '#5CB85C',
  categoryOverlay: 'rgba(74, 144, 217, 0.1)',
} as const;

// Core vocabulary order based on AAC research
// Most frequently used words first (Banajee, Dicarlo, & Stricklin, 2003)
export const CORE_WORD_ORDER = [
  'more',
  'help',
  'stop',
  'go',
  'want',
  'that',
  'mine',
  'you',
  'I',
  'it',
  'yes',
  'no',
  'please',
  'thank you',
  'sorry',
  'eat',
  'drink',
  'play',
  'read',
  'sleep',
  'come',
  'look',
  'give',
  'take',
  'open',
  'close',
  'up',
  'down',
  'in',
  'out',
  'on',
  'off',
  'here',
  'there',
  'what',
  'where',
  'who',
  'why',
  'when',
  'how',
];

// Category labels
export const CATEGORY_LABELS = {
  [CATEGORY_IDS.CORE]: 'Core Words',
  [CATEGORY_IDS.FOOD]: 'Food',
  [CATEGORY_IDS.DRINKS]: 'Drinks',
  [CATEGORY_IDS.PEOPLE]: 'People',
  [CATEGORY_IDS.ACTIONS]: 'Actions',
  [CATEGORY_IDS.FEELINGS]: 'Feelings',
  [CATEGORY_IDS.OBJECTS]: 'Objects',
} as const;

// Animation durations
export const ANIMATION = {
  buttonPress: 100,
  screenTransition: 300,
  fadeIn: 200,
} as const;
