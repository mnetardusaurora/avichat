import { getOne, runQuery, runTransaction } from './database';
import { CATEGORY_IDS, CATEGORY_LABELS, SETTINGS_KEYS, DEFAULT_SETTINGS } from '../utils/constants';
import { generateId } from '../utils/uuid';
import { BUNDLED_SYMBOLS, BundledSymbol } from '../data/bundledSymbols';

// Check if database has been seeded
async function isSeeded(): Promise<boolean> {
  try {
    const result = await getOne<{ value: string }>(
      'SELECT value FROM settings WHERE key = ?',
      [SETTINGS_KEYS.IS_SEEDED]
    );
    return result?.value === 'true';
  } catch {
    return false;
  }
}

// Mark database as seeded
async function markAsSeeded(): Promise<void> {
  await runQuery(
    `INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`,
    [SETTINGS_KEYS.IS_SEEDED, 'true']
  );
}

// Seed default settings
async function seedSettings(): Promise<void> {
  const settings = [
    { key: SETTINGS_KEYS.GRID_ROWS, value: DEFAULT_SETTINGS.gridRows.toString() },
    { key: SETTINGS_KEYS.GRID_COLUMNS, value: DEFAULT_SETTINGS.gridColumns.toString() },
    { key: SETTINGS_KEYS.SPEAK_ON_PRESS, value: DEFAULT_SETTINGS.speakOnPress.toString() },
    { key: SETTINGS_KEYS.SPEECH_RATE, value: DEFAULT_SETTINGS.speechRate.toString() },
    { key: SETTINGS_KEYS.SHOW_LABELS, value: DEFAULT_SETTINGS.showLabels.toString() },
    { key: SETTINGS_KEYS.LABEL_SIZE, value: DEFAULT_SETTINGS.labelSize },
    { key: SETTINGS_KEYS.BUTTON_PADDING, value: DEFAULT_SETTINGS.buttonPadding },
    { key: SETTINGS_KEYS.IS_PIN_ENABLED, value: DEFAULT_SETTINGS.isPinEnabled.toString() },
  ];

  for (const setting of settings) {
    await runQuery(
      `INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`,
      [setting.key, setting.value]
    );
  }
}

// Seed default categories
async function seedCategories(): Promise<void> {
  const now = Date.now();
  const categories = [
    { id: CATEGORY_IDS.CORE, label: CATEGORY_LABELS[CATEGORY_IDS.CORE], position: 0 },
    { id: CATEGORY_IDS.FOOD, label: CATEGORY_LABELS[CATEGORY_IDS.FOOD], position: 1 },
    { id: CATEGORY_IDS.DRINKS, label: CATEGORY_LABELS[CATEGORY_IDS.DRINKS], position: 2 },
    { id: CATEGORY_IDS.PEOPLE, label: CATEGORY_LABELS[CATEGORY_IDS.PEOPLE], position: 3 },
    { id: CATEGORY_IDS.ACTIONS, label: CATEGORY_LABELS[CATEGORY_IDS.ACTIONS], position: 4 },
    { id: CATEGORY_IDS.FEELINGS, label: CATEGORY_LABELS[CATEGORY_IDS.FEELINGS], position: 5 },
    { id: CATEGORY_IDS.OBJECTS, label: CATEGORY_LABELS[CATEGORY_IDS.OBJECTS], position: 6 },
  ];

  for (const category of categories) {
    await runQuery(
      `INSERT OR IGNORE INTO categories (id, label, image_path, parent_id, grid_position, is_visible, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        category.id,
        category.label,
        `category_${category.id}`, // Placeholder, will use category icon
        null,
        category.position,
        1,
        now,
        now,
      ]
    );
  }
}

// Seed default grid configuration
async function seedGridConfig(): Promise<void> {
  const now = Date.now();
  await runQuery(
    `INSERT OR IGNORE INTO grids (id, name, rows, columns, is_active, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [generateId(), 'Default Grid', 3, 3, 1, now]
  );
}

// Seed vocabulary items from bundled symbols
async function seedVocabulary(): Promise<void> {
  const now = Date.now();

  // Group symbols by category and track position within each
  const categoryPositions: Record<string, number> = {};

  const queries: { sql: string; params: (string | number | null)[] }[] = [];

  for (const symbol of BUNDLED_SYMBOLS) {
    // Get or initialize position for this category
    const categoryId = symbol.categoryId || CATEGORY_IDS.CORE;
    if (!(categoryId in categoryPositions)) {
      categoryPositions[categoryId] = 0;
    }
    const position = categoryPositions[categoryId]++;

    queries.push({
      sql: `INSERT OR IGNORE INTO vocabulary
            (id, label, image_type, image_path, audio_type, audio_path, category_id, grid_position, is_visible, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      params: [
        symbol.id,
        symbol.label,
        'bundled',
        symbol.imagePath,
        'tts',
        null,
        categoryId,
        position,
        1,
        now,
        now,
      ],
    });
  }

  // Run all inserts in a transaction for atomicity
  if (queries.length > 0) {
    await runTransaction(queries);
  }
}

// Main seed function
export async function seedInitialData(): Promise<void> {
  // Check if already seeded
  if (await isSeeded()) {
    console.log('Database already seeded, skipping...');
    return;
  }

  console.log('Seeding initial data...');

  try {
    // Seed in order: settings, categories, grid, vocabulary
    await seedSettings();
    console.log('Settings seeded');

    await seedCategories();
    console.log('Categories seeded');

    await seedGridConfig();
    console.log('Grid config seeded');

    await seedVocabulary();
    console.log('Vocabulary seeded');

    // Mark as seeded
    await markAsSeeded();
    console.log('Database seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Reset database to defaults (keeps structure, clears data)
export async function resetToDefaults(): Promise<void> {
  console.log('Resetting database to defaults...');

  // Clear all tables
  await runQuery('DELETE FROM vocabulary');
  await runQuery('DELETE FROM categories');
  await runQuery('DELETE FROM grids');
  await runQuery('DELETE FROM settings');

  // Re-seed
  await seedInitialData();

  console.log('Database reset complete!');
}
