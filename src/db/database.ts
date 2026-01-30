import * as SQLite from 'expo-sqlite';
import { DATABASE_NAME } from '../utils/constants';

let db: SQLite.SQLiteDatabase | null = null;

// Get or create database instance
export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  }
  return db;
}

// Initialize database with all tables
export async function initDatabase(): Promise<void> {
  const database = await getDatabase();

  // Create vocabulary table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS vocabulary (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      image_type TEXT NOT NULL,
      image_path TEXT NOT NULL,
      audio_type TEXT NOT NULL,
      audio_path TEXT,
      category_id TEXT,
      grid_position INTEGER NOT NULL,
      is_visible INTEGER DEFAULT 1,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `);

  // Create categories table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      image_path TEXT NOT NULL,
      parent_id TEXT,
      grid_position INTEGER NOT NULL,
      is_visible INTEGER DEFAULT 1,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (parent_id) REFERENCES categories(id)
    );
  `);

  // Create settings table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Create grids table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS grids (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      rows INTEGER NOT NULL DEFAULT 3,
      columns INTEGER NOT NULL DEFAULT 3,
      is_active INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL
    );
  `);

  // Create indexes for better query performance
  await database.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_vocabulary_category_id ON vocabulary(category_id);
  `);

  await database.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_vocabulary_grid_position ON vocabulary(grid_position);
  `);

  await database.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
  `);

  await database.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_categories_grid_position ON categories(grid_position);
  `);
}

// Run a query that doesn't return results (INSERT/UPDATE/DELETE)
export async function runQuery(
  sql: string,
  params: (string | number | null)[] = []
): Promise<SQLite.SQLiteRunResult> {
  const database = await getDatabase();
  return database.runAsync(sql, params);
}

// Get a single row
export async function getOne<T>(
  sql: string,
  params: (string | number | null)[] = []
): Promise<T | null> {
  const database = await getDatabase();
  const result = await database.getFirstAsync<T>(sql, params);
  return result;
}

// Get multiple rows
export async function getAll<T>(
  sql: string,
  params: (string | number | null)[] = []
): Promise<T[]> {
  const database = await getDatabase();
  const results = await database.getAllAsync<T>(sql, params);
  return results;
}

// Execute multiple statements in a transaction
export async function runTransaction(
  queries: { sql: string; params?: (string | number | null)[] }[]
): Promise<void> {
  const database = await getDatabase();
  await database.withTransactionAsync(async () => {
    for (const query of queries) {
      await database.runAsync(query.sql, query.params || []);
    }
  });
}

// Close database connection
export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}
