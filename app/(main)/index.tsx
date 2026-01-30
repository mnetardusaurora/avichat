import { useCallback } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymbolGrid } from '../../src/components/SymbolGrid';
import { useCurrentGrid } from '../../src/hooks/useCurrentGrid';
import { useSpeakWord } from '../../src/hooks/useSpeakWord';
import { useAppStore, useSettings } from '../../src/stores/appStore';
import { useLockStore } from '../../src/stores/lockStore';
import { VocabularyItem, Category } from '../../src/types';
import { COLORS } from '../../src/utils/constants';

export default function HomeScreen() {
  const router = useRouter();
  const settings = useSettings();
  const { allItems, isLoading, isRoot } = useCurrentGrid();
  const { speakWord } = useSpeakWord();
  const navigateToCategory = useAppStore((state) => state.navigateToCategory);
  const navigateBack = useAppStore((state) => state.navigateBack);
  const { isSettingsLocked, unlockSettings } = useLockStore();

  const handleItemPress = useCallback(
    (item: VocabularyItem) => {
      speakWord(item);
    },
    [speakWord]
  );

  const handleCategoryPress = useCallback(
    (category: Category) => {
      navigateToCategory(category.id);
    },
    [navigateToCategory]
  );

  const handleBackPress = useCallback(() => {
    navigateBack();
  }, [navigateBack]);

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
        showBackButton={!isRoot}
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
