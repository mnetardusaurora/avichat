import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDatabase } from '../src/hooks/useDatabase';
import { COLORS } from '../src/utils/constants';

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>Loading AviTalk...</Text>
    </View>
  );
}

function ErrorScreen({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Oops!</Text>
      <Text style={styles.errorText}>Something went wrong while loading the app.</Text>
      <Text style={styles.errorDetail}>{error.message}</Text>
      <Text style={styles.retryButton} onPress={onRetry}>
        Tap to Retry
      </Text>
    </View>
  );
}

export default function RootLayout() {
  const { isReady, error, retry } = useDatabase();

  if (error) {
    return (
      <SafeAreaProvider>
        <ErrorScreen error={error} onRetry={retry} />
        <StatusBar style="dark" />
      </SafeAreaProvider>
    );
  }

  if (!isReady) {
    return (
      <SafeAreaProvider>
        <LoadingScreen />
        <StatusBar style="dark" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="(main)" />
        <Stack.Screen
          name="(settings)"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="lock"
          options={{
            presentation: 'modal',
            animation: 'fade',
            gestureEnabled: false,
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 24,
  },
  errorTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.error,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  errorDetail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '600',
    padding: 16,
  },
});
