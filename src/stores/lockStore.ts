import { create } from 'zustand';

// Lock state interface
interface LockState {
  isLocked: boolean;
  isSettingsLocked: boolean;
  lastActivityTime: number;
}

// Lock actions interface
interface LockActions {
  unlock: () => void;
  lock: () => void;
  lockSettings: () => void;
  unlockSettings: () => void;
  updateActivity: () => void;
}

// Combined store type
type LockStore = LockState & LockActions;

// Create the lock store (not persisted - always starts locked)
export const useLockStore = create<LockStore>((set) => ({
  // Initial state - app is unlocked, settings are locked
  isLocked: false,
  isSettingsLocked: true,
  lastActivityTime: Date.now(),

  // Actions
  unlock: () =>
    set({
      isLocked: false,
      lastActivityTime: Date.now(),
    }),

  lock: () =>
    set({
      isLocked: true,
    }),

  lockSettings: () =>
    set({
      isSettingsLocked: true,
    }),

  unlockSettings: () =>
    set({
      isSettingsLocked: false,
      lastActivityTime: Date.now(),
    }),

  updateActivity: () =>
    set({
      lastActivityTime: Date.now(),
    }),
}));

// Selector hooks
export const useIsLocked = () => useLockStore((state) => state.isLocked);
export const useIsSettingsLocked = () => useLockStore((state) => state.isSettingsLocked);
export const useLastActivity = () => useLockStore((state) => state.lastActivityTime);
