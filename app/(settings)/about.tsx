import { useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Alert, Linking } from 'react-native';
import Constants from 'expo-constants';
import { resetToDefaults } from '../../src/db/seed';
import { COLORS } from '../../src/utils/constants';

export default function AboutScreen() {
  const version = Constants.expoConfig?.version || '1.0.0';

  const handleOpenArasaac = useCallback(() => {
    Linking.openURL('https://arasaac.org');
  }, []);

  const handleResetToDefaults = useCallback(() => {
    Alert.alert(
      'Reset to Defaults?',
      'This will reset all settings and vocabulary to their original state. Your custom words and recordings will be deleted. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await resetToDefaults();
              Alert.alert('Success', 'App has been reset to defaults.');
            } catch (error) {
              console.error('Error resetting:', error);
              Alert.alert('Error', 'Failed to reset. Please try again.');
            }
          },
        },
      ]
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* App Info */}
      <View style={styles.section}>
        <View style={styles.appInfo}>
          <View style={styles.appIcon}>
            <Text style={styles.appIconText}>🗣️</Text>
          </View>
          <Text style={styles.appName}>AviTalk</Text>
          <Text style={styles.appVersion}>Version {version}</Text>
          <Text style={styles.appDescription}>
            AAC Speech Therapy App
          </Text>
        </View>
      </View>

      {/* Purpose */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            AviTalk is an Augmentative and Alternative Communication (AAC) app
            designed to help young children with speech delays communicate through
            symbols and speech.
          </Text>
          <Text style={[styles.cardText, { marginTop: 12 }]}>
            Tap on a symbol to hear it spoken aloud. Categories help organize
            vocabulary into groups. Words always stay in the same position to
            support motor planning.
          </Text>
        </View>
      </View>

      {/* ARASAAC Attribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Symbol Credits</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            The pictographic symbols used are the property of the Government of
            Aragón and have been created by Sergio Palao for ARASAAC
            (https://arasaac.org), that distributes them under Creative Commons
            License BY-NC-SA.
          </Text>
          <Pressable style={styles.linkButton} onPress={handleOpenArasaac}>
            <Text style={styles.linkButtonText}>Visit ARASAAC →</Text>
          </Pressable>
        </View>
      </View>

      {/* Privacy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            AviTalk stores all data locally on your device. No data is ever sent
            to external servers. There are no accounts, no tracking, and no
            analytics.
          </Text>
        </View>
      </View>

      {/* Reset */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Maintenance</Text>
        <Pressable
          style={styles.resetButton}
          onPress={handleResetToDefaults}
        >
          <Text style={styles.resetButtonText}>Reset to Defaults</Text>
          <Text style={styles.resetButtonSubtext}>
            Restore original vocabulary and settings
          </Text>
        </Pressable>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ for children everywhere
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  appInfo: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 32,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appIconText: {
    fontSize: 40,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  appVersion: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  appDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  linkButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  linkButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  resetButtonText: {
    fontSize: 16,
    color: COLORS.error,
    fontWeight: '500',
  },
  resetButtonSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  footer: {
    padding: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
});
