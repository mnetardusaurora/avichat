import { useEffect, useCallback } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymbolGrid } from '../../../src/components/SymbolGrid';
import { useCurrentGrid } from '../../../src/hooks/useCurrentGrid';
import { useSpeakWord } from '../../../src/hooks/useSpeakWord';
import { useAppStore, useSettings } from '../../../src/stores/appStore';
import { useLockStore } from '../../../src/stores/lockStore';
import { VocabularyItem, Category } from '../../../src/types';
import { COLORS } from '../../../src/utils/constants';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const settings = useSettings();
  const { speakWord } = useSpeakWord();
  const navigateToCategory = useAppStore((state) => state.navigateToCategory);
  const navigateBack = useAppStore((state) => state.navigateBack);
  const currentCategoryId = useAppStore((state) => state.currentCategoryId);
  const { isSettingsLocked, unlockSettings } = useLockStore();

  // Sync route param with store
  useEffect(() => {
    if (id && id !== currentCategoryId) {
      navigateToCategory(id);
    }
  }, [id, currentCategoryId, navigateToCategory]);

  const { allItems, isLoading, currentCategory } = useCurrentGrid();

  const handleItemPress = useCallback(
    (item: VocabularyItem) => {
      speakWord(item);
    },
    [speakWord]
  );

  const handleCategoryPress = useCallback(
    (category: Category) => {
      router.push(`/(main)/category/${category.id}`);
    },
    [router]
  );

  const handleBackPress = useCallback(() => {
    navigateBack();
    router.back();
  }, [navigateBack, router]);

  const handleSettingsPress = useCallback(() => {
    if (settings.isPinEnabled && isSettingsLocked) {
      router.push('/lock');
    } else {
      unlockSettings();
      router.push('/(settings)');
    }
  }, [router, settings.isPinEnabled, isSettingsLocked, unlockSettings]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Category title */}
      {currentCategory && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{currentCategory.label}</Text>
        </View>
      )}

      {/* Settings button in corner */}
      <Pressable
        style={styles.settingsButton}
        onPress={handleSettingsPress}
        accessibilityLabel="Settings"
        accessibilityRole="button"
        accessibilityHint="Tap to open settings"
      >
        <Text style={styles.settingsIcon}>⚙️</Text>
      </Pressable>

      {/* Main grid */}
      <SymbolGrid
        items={allItems}
        gridRows={settings.gridRows}
        gridColumns={settings.gridColumns}
        onItemPress={handleItemPress}
        onCategoryPress={handleCategoryPress}
        onBackPress={handleBackPress}
        showLabels={settings.showLabels}
        labelSize={settings.labelSize}
        padding={settings.buttonPadding}
        showBackButton={true}
        speakOnPress={settings.speakOnPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.surface,
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 100,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    opacity: 0.7,
  },
  settingsIcon: {
    fontSize: 20,
  },
});
