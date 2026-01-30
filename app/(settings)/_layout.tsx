import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useLockStore } from '../../src/stores/lockStore';
import { COLORS } from '../../src/utils/constants';

export default function SettingsLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { lockSettings } = useLockStore();

  // Re-lock settings when leaving
  useEffect(() => {
    return () => {
      lockSettings();
    };
  }, [lockSettings]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.surface,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="grid-layout"
        options={{
          title: 'Grid Layout',
        }}
      />
      <Stack.Screen
        name="appearance"
        options={{
          title: 'Appearance',
        }}
      />
      <Stack.Screen
        name="speech"
        options={{
          title: 'Speech',
        }}
      />
      <Stack.Screen
        name="security"
        options={{
          title: 'Security',
        }}
      />
      <Stack.Screen
        name="vocabulary"
        options={{
          title: 'Vocabulary',
        }}
      />
      <Stack.Screen
        name="add-word"
        options={{
          title: 'Add Word',
        }}
      />
      <Stack.Screen
        name="edit-word/[id]"
        options={{
          title: 'Edit Word',
        }}
      />
      <Stack.Screen
        name="categories"
        options={{
          title: 'Categories',
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: 'About',
        }}
      />
      <Stack.Screen
        name="guided-access"
        options={{
          title: 'Guided Access Help',
        }}
      />
    </Stack>
  );
}
