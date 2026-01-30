import { getOne, runQuery } from './database';
import { SETTINGS_KEYS } from '../utils/constants';

// Current schema version
export const SCHEMA_VERSION = 1;

// Migration definitions
interface Migration {
  version: number;
  description: string;
  sql: string[];
}

const migrations: Migration[] = [
  {
    version: 1,
    description: 'Initial schema',
    sql: [
      // Schema is created in initDatabase, this is just for tracking
      `SELECT 1`,
    ],
  },
  // Future migrations would go here:
  // {
  //   version: 2,
  //   description: 'Add new column',
  //   sql: ['ALTER TABLE vocabulary ADD COLUMN new_column TEXT'],
  // },
];

// Get current schema version from database
async function getCurrentVersion(): Promise<number> {
  try {
    const result = await getOne<{ value: string }>(
      'SELECT value FROM settings WHERE key = ?',
      [SETTINGS_KEYS.SCHEMA_VERSION]
    );
    return result ? parseInt(result.value, 10) : 0;
  } catch {
    return 0;
  }
}

// Set schema version in database
async function setVersion(version: number): Promise<void> {
  await runQuery(
    `INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`,
    [SETTINGS_KEYS.SCHEMA_VERSION, version.toString()]
  );
}

// Run all pending migrations
export async function runMigrations(): Promise<void> {
  const currentVersion = await getCurrentVersion();

  if (currentVersion >= SCHEMA_VERSION) {
    console.log(`Database is up to date (version ${currentVersion})`);
    return;
  }

  console.log(`Running migrations from version ${currentVersion} to ${SCHEMA_VERSION}`);

  for (const migration of migrations) {
    if (migration.version > currentVersion) {
      console.log(`Running migration ${migration.version}: ${migration.description}`);

      for (const sql of migration.sql) {
        try {
          await runQuery(sql);
        } catch (error) {
          console.error(`Migration ${migration.version} failed:`, error);
          throw error;
        }
      }
    }
  }

  await setVersion(SCHEMA_VERSION);
  console.log(`Migrations complete. Database is now at version ${SCHEMA_VERSION}`);
}
