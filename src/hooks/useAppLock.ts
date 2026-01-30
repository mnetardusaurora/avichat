import { useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useLockStore } from '../stores/lockStore';
import { useAppStore } from '../stores/appStore';

const PIN_STORAGE_KEY = 'avitalk_pin_code';

interface UseAppLockResult {
  isSettingsLocked: boolean;
  isPinSet: boolean;
  verifyPin: (pin: string) => Promise<boolean>;
  setPin: (pin: string) => Promise<void>;
  removePin: () => Promise<void>;
  lockSettings: () => void;
  unlockSettings: () => void;
}

export function useAppLock(): UseAppLockResult {
  const { isSettingsLocked, lockSettings, unlockSettings } = useLockStore();
  const { settings, setSettings } = useAppStore();

  // Verify PIN against stored PIN
  const verifyPin = useCallback(async (pin: string): Promise<boolean> => {
    try {
      const storedPin = await SecureStore.getItemAsync(PIN_STORAGE_KEY);
      if (storedPin === pin) {
        unlockSettings();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error verifying PIN:', error);
      return false;
    }
  }, [unlockSettings]);

  // Set new PIN
  const setPin = useCallback(async (pin: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(PIN_STORAGE_KEY, pin);
      setSettings({ isPinEnabled: true, pinCode: pin });
      unlockSettings();
    } catch (error) {
      console.error('Error setting PIN:', error);
      throw error;
    }
  }, [setSettings, unlockSettings]);

  // Remove PIN
  const removePin = useCallback(async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(PIN_STORAGE_KEY);
      setSettings({ isPinEnabled: false, pinCode: '' });
    } catch (error) {
      console.error('Error removing PIN:', error);
      throw error;
    }
  }, [setSettings]);

  return {
    isSettingsLocked,
    isPinSet: settings.isPinEnabled,
    verifyPin,
    setPin,
    removePin,
    lockSettings,
    unlockSettings,
  };
}
