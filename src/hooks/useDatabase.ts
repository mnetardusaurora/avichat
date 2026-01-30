import { useState, useEffect } from 'react';
import { initDatabase } from '../db/database';
import { runMigrations } from '../db/migrations';
import { seedInitialData } from '../db/seed';

interface UseDatabaseResult {
  isReady: boolean;
  error: Error | null;
  retry: () => void;
}

export function useDatabase(): UseDatabaseResult {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      try {
        setError(null);
        setIsReady(false);

        console.log('Initializing database...');

        // Step 1: Initialize database schema
        await initDatabase();
        console.log('Database schema initialized');

        // Step 2: Run any pending migrations
        await runMigrations();
        console.log('Migrations complete');

        // Step 3: Seed initial data if needed
        await seedInitialData();
        console.log('Seed data complete');

        if (isMounted) {
          setIsReady(true);
          console.log('Database ready!');
        }
      } catch (err) {
        console.error('Database initialization error:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown database error'));
        }
      }
    }

    initialize();

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  const retry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return { isReady, error, retry };
}
