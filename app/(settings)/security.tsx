import { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppLock } from '../../src/hooks/useAppLock';
import { COLORS } from '../../src/utils/constants';

export default function SecurityScreen() {
  const router = useRouter();
  const { isPinSet, removePin } = useAppLock();

  const handleTogglePin = useCallback(async (enabled: boolean) => {
    if (enabled) {
      // Go to lock screen to set PIN
      router.push('/lock');
    } else {
      // Confirm removal
      Alert.alert(
        'Remove PIN?',
        'Anyone will be able to access settings without a PIN.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: async () => {
              await removePin();
            },
          },
        ]
      );
    }
  }, [router, removePin]);

  const handleChangePin = useCallback(() => {
    router.push('/lock');
  }, [router]);

  return (
    <ScrollView style={styles.container}>
      {/* PIN Toggle */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings Protection</Text>
        <View style={styles.toggleRow}>
          <View style={styles.toggleContent}>
            <Text style={styles.toggleLabel}>Require PIN for Settings</Text>
            <Text style={styles.toggleDescription}>
              Prevent accidental changes by requiring a PIN to access settings
            </Text>
          </View>
          <Switch
            value={isPinSet}
            onValueChange={handleTogglePin}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
      </View>

      {/* Change PIN */}
      {isPinSet && (
        <View style={styles.section}>
          <Pressable
            style={styles.changeButton}
            onPress={handleChangePin}
          >
            <Text style={styles.changeButtonText}>Change PIN</Text>
          </Pressable>
        </View>
      )}

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>About PIN Protection</Text>
        <Text style={styles.infoText}>
          The PIN protects the settings area only. The main communication grid
          is always accessible so your child can use the app freely.
        </Text>
      </View>

      {/* Guided Access Link */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Protection</Text>
        <Pressable
          style={styles.linkButton}
          onPress={() => router.push('/(settings)/guided-access')}
        >
          <View style={styles.linkContent}>
            <Text style={styles.linkTitle}>Guided Access</Text>
            <Text style={styles.linkDescription}>
              Lock the iPad to AviTalk to prevent switching apps
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
  },
  toggleContent: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  toggleDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  changeButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  changeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  infoBox: {
    marginBottom: 24,
    backgroundColor: COLORS.categoryOverlay,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
  },
  linkContent: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    color: COLORS.text,
  },
  linkDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.textLight,
    marginLeft: 8,
  },
});
