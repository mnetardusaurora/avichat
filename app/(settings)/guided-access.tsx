import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../../src/utils/constants';

export default function GuidedAccessScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Introduction */}
      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What is Guided Access?</Text>
          <Text style={styles.cardText}>
            Guided Access is an iOS feature that locks your iPad to a single app.
            This prevents your child from accidentally switching apps, going to the
            home screen, or changing settings.
          </Text>
        </View>
      </View>

      {/* Benefits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Benefits</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🔒</Text>
            <Text style={styles.benefitText}>
              Keeps your child focused on AviTalk
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🛡️</Text>
            <Text style={styles.benefitText}>
              Prevents accidental app switches
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>👆</Text>
            <Text style={styles.benefitText}>
              Disables hardware buttons
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>⏰</Text>
            <Text style={styles.benefitText}>
              Optional time limits for sessions
            </Text>
          </View>
        </View>
      </View>

      {/* Setup Instructions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to Enable Guided Access</Text>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Open iPad Settings</Text>
            <Text style={styles.stepDescription}>
              Go to the Settings app on your iPad
            </Text>
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Navigate to Accessibility</Text>
            <Text style={styles.stepDescription}>
              Tap Accessibility → Guided Access
            </Text>
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Turn On Guided Access</Text>
            <Text style={styles.stepDescription}>
              Toggle Guided Access to ON
            </Text>
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Set a Passcode</Text>
            <Text style={styles.stepDescription}>
              Tap Passcode Settings and set a passcode (different from your device passcode)
            </Text>
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>5</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Enable Accessibility Shortcut</Text>
            <Text style={styles.stepDescription}>
              Go to Accessibility → Accessibility Shortcut and select Guided Access
            </Text>
          </View>
        </View>
      </View>

      {/* Usage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Using Guided Access</Text>

        <View style={styles.usageCard}>
          <Text style={styles.usageTitle}>To Start a Session:</Text>
          <Text style={styles.usageText}>
            1. Open AviTalk{'\n'}
            2. Triple-click the side button (or home button){'\n'}
            3. Tap Start in the top right
          </Text>
        </View>

        <View style={[styles.usageCard, { marginTop: 12 }]}>
          <Text style={styles.usageTitle}>To End a Session:</Text>
          <Text style={styles.usageText}>
            1. Triple-click the side button (or home button){'\n'}
            2. Enter your Guided Access passcode{'\n'}
            3. Tap End in the top left
          </Text>
        </View>
      </View>

      {/* Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips</Text>
        <View style={styles.tipsCard}>
          <Text style={styles.tipsText}>
            • Use Face ID or Touch ID for faster unlocking{'\n'}
            • Set up different Guided Access profiles for different situations{'\n'}
            • You can also use Screen Time for app limits{'\n'}
            • Consider using a rugged case for extra protection
          </Text>
        </View>
      </View>

      <View style={styles.footer} />
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
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  benefitsList: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  benefitText: {
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  step: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  stepDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  usageCard: {
    backgroundColor: COLORS.categoryOverlay,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  usageTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 8,
  },
  usageText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  tipsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
  },
  tipsText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  footer: {
    height: 40,
  },
});
