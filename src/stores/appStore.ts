import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings } from '../types';
import { DEFAULT_SETTINGS } from '../utils/constants';

// State interface
interface AppState {
  settings: AppSettings;
  currentCategoryId: string | null;
  navigationStack: string[];
  isLoading: boolean;
}

// Actions interface
interface AppActions {
  setSettings: (settings: Partial<AppSettings>) => void;
  loadSettings: (settings: AppSettings) => void;
  navigateToCategory: (categoryId: string) => void;
  navigateBack: () => void;
  navigateHome: () => void;
  setLoading: (loading: boolean) => void;
}

// Combined store type
type AppStore = AppState & AppActions;

// Create the store with persistence
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      settings: DEFAULT_SETTINGS,
      currentCategoryId: null,
      navigationStack: [],
      isLoading: false,

      // Actions
      setSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      loadSettings: (settings) =>
        set({ settings }),

      navigateToCategory: (categoryId) =>
        set((state) => {
          const newStack = state.currentCategoryId
            ? [...state.navigationStack, state.currentCategoryId]
            : state.navigationStack;
          return {
            currentCategoryId: categoryId,
            navigationStack: newStack,
          };
        }),

      navigateBack: () =>
        set((state) => {
          const newStack = [...state.navigationStack];
          const previousCategory = newStack.pop() || null;
          return {
            currentCategoryId: previousCategory,
            navigationStack: newStack,
          };
        }),

      navigateHome: () =>
        set({
          currentCategoryId: null,
          navigationStack: [],
        }),

      setLoading: (loading) =>
        set({ isLoading: loading }),
    }),
    {
      name: 'avitalk-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist settings, not navigation state
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);

// Selector hooks for common selections
export const useSettings = () => useAppStore((state) => state.settings);
export const useCurrentCategory = () => useAppStore((state) => state.currentCategoryId);
export const useNavigationStack = () => useAppStore((state) => state.navigationStack);
export const useIsLoading = () => useAppStore((state) => state.isLoading);

// Individual setting selectors
export const useGridSize = () =>
  useAppStore((state) => ({
    rows: state.settings.gridRows,
    columns: state.settings.gridColumns,
  }));

export const useSpeechSettings = () =>
  useAppStore((state) => ({
    speakOnPress: state.settings.speakOnPress,
    speechRate: state.settings.speechRate,
  }));

export const useLabelSettings = () =>
  useAppStore((state) => ({
    showLabels: state.settings.showLabels,
    labelSize: state.settings.labelSize,
  }));

export const useButtonPadding = () =>
  useAppStore((state) => state.settings.buttonPadding);

export const usePinSettings = () =>
  useAppStore((state) => ({
    pinCode: state.settings.pinCode,
    isPinEnabled: state.settings.isPinEnabled,
  }));
