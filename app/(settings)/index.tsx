import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettings } from '../../src/stores/appStore';
import { COLORS } from '../../src/utils/constants';

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
}

function SettingsItem({ title, subtitle, onPress }: SettingsItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.settingsItem,
        pressed && styles.settingsItemPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.settingsItemContent}>
        <Text style={styles.settingsItemTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>
        )}
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const settings = useSettings();

  return (
    <ScrollView style={styles.container}>
      <SettingsSection title="Display">
        <SettingsItem
          title="Grid Layout"
          subtitle={`${settings.gridRows} × ${settings.gridColumns} grid`}
          onPress={() => router.push('/(settings)/grid-layout')}
        />
        <SettingsItem
          title="Appearance"
          subtitle={settings.showLabels ? 'Labels shown' : 'Labels hidden'}
          onPress={() => router.push('/(settings)/appearance')}
        />
      </SettingsSection>

      <SettingsSection title="Audio">
        <SettingsItem
          title="Speech Settings"
          subtitle={`Speed: ${Math.round(settings.speechRate * 100)}%`}
          onPress={() => router.push('/(settings)/speech')}
        />
      </SettingsSection>

      <SettingsSection title="Content">
        <SettingsItem
          title="Vocabulary"
          subtitle="Add, edit, or remove words"
          onPress={() => router.push('/(settings)/vocabulary')}
        />
        <SettingsItem
          title="Categories"
          subtitle="Manage word categories"
          onPress={() => router.push('/(settings)/categories')}
        />
      </SettingsSection>

      <SettingsSection title="Security">
        <SettingsItem
          title="PIN Lock"
          subtitle={settings.isPinEnabled ? 'Enabled' : 'Disabled'}
          onPress={() => router.push('/(settings)/security')}
        />
        <SettingsItem
          title="Guided Access Help"
          subtitle="Lock iPad to this app"
          onPress={() => router.push('/(settings)/guided-access')}
        />
      </SettingsSection>

      <SettingsSection title="About">
        <SettingsItem
          title="About AviTalk"
          subtitle="Version, credits, and licenses"
          onPress={() => router.push('/(settings)/about')}
        />
      </SettingsSection>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap on any item to customize settings
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
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    marginLeft: 16,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  settingsItemPressed: {
    backgroundColor: COLORS.borderLight,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    color: COLORS.text,
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.textLight,
    marginLeft: 8,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
