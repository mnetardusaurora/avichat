// Avocado theme colors for AviChat

export const COLORS = {
  // Primary avocado greens
  primary: '#568203',        // Avocado skin green
  primaryLight: '#87A96B',   // Avocado flesh green
  primaryDark: '#3D5C1B',    // Dark avocado green

  // Accent colors
  accent: '#C4D69A',         // Light sage green
  accentDark: '#8FBC8F',     // Dark sea green

  // Background colors
  background: '#F5FFF5',     // Very light mint
  backgroundAlt: '#E8F5E9',  // Light green tint
  surface: '#FFFFFF',        // White surface

  // Text colors
  text: '#1B4D1B',           // Dark green text
  textLight: '#FFFFFF',      // White text
  textMuted: '#5D7A5D',      // Muted green text

  // Button category colors (keeping variety but with green undertones)
  categoryCore: '#4CAF50',     // Green - core words
  categoryPeople: '#E91E63',   // Pink - people
  categoryFood: '#FF9800',     // Orange - food
  categoryDrinks: '#2196F3',   // Blue - drinks
  categoryFeelings: '#9C27B0', // Purple - feelings
  categoryActions: '#FF5722',  // Deep orange - actions
  categoryPlaces: '#795548',   // Brown - places
  categoryThings: '#607D8B',   // Blue grey - things
  categoryAnimals: '#8BC34A',  // Light green - animals

  // Core word colors (green-tinted palette)
  want: '#66BB6A',      // Green
  more: '#81C784',      // Light green
  help: '#EF5350',      // Red (important/urgent)
  stop: '#F44336',      // Bright red
  go: '#4CAF50',        // Green
  allDone: '#26A69A',   // Teal
  yes: '#66BB6A',       // Green
  no: '#EF5350',        // Red
  categories: '#7E57C2', // Purple
  back: '#78909C',      // Blue grey

  // UI elements
  border: '#C8E6C9',         // Light green border
  shadow: '#1B5E20',         // Dark green shadow
  overlay: 'rgba(27, 94, 32, 0.1)', // Green overlay

  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};

// Symbol background colors optimized for AAC visibility
export const SYMBOL_COLORS = {
  // Core vocabulary (Fitzgerald Key inspired - standard AAC color coding)
  verbs: '#4CAF50',          // Green - actions/verbs
  nouns: '#FF9800',          // Orange - nouns/things
  descriptors: '#2196F3',    // Blue - adjectives/descriptors
  social: '#E91E63',         // Pink - social words
  questions: '#9C27B0',      // Purple - questions
  prepositions: '#4DB6AC',   // Teal - prepositions
  pronouns: '#FFD54F',       // Yellow - pronouns
  negation: '#F44336',       // Red - no/stop/negation
  affirmation: '#66BB6A',    // Green - yes/go/affirmation
  misc: '#78909C',           // Grey - miscellaneous
};

// Font sizes
export const FONTS = {
  labelSmall: 14,
  labelMedium: 18,
  labelLarge: 22,
  title: 28,
  emoji: 56,
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

// Border radius
export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};
