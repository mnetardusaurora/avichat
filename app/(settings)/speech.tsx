import { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { useAppStore, useSettings } from '../../src/stores/appStore';
import { useSpeech } from '../../src/hooks/useSpeech';
import { COLORS, SPEECH_RATE_OPTIONS } from '../../src/utils/constants';

export default function SpeechScreen() {
  const settings = useSettings();
  const setSettings = useAppStore((state) => state.setSettings);
  const { speak, isSpeaking } = useSpeech();
  const [localRate, setLocalRate] = useState(settings.speechRate);

  const handleRateChange = useCallback((value: number) => {
    const rounded = Math.round(value * 10) / 10;
    setLocalRate(rounded);
  }, []);

  const handleRateChangeComplete = useCallback((value: number) => {
    const rounded = Math.round(value * 10) / 10;
    setSettings({ speechRate: rounded });
  }, [setSettings]);

  const handleTestSpeech = useCallback(() => {
    speak('Hello! This is how AviTalk will sound.', { rate: localRate });
  }, [speak, localRate]);

  const getRateLabel = (rate: number): string => {
    const option = SPEECH_RATE_OPTIONS.find((o) => o.value === rate);
    return option?.label || `${Math.round(rate * 100)}%`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Speech Rate */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Speech Speed</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Slower</Text>
          <View style={styles.sliderWrapper}>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={1.5}
              step={0.1}
              value={localRate}
              onValueChange={handleRateChange}
              onSlidingComplete={handleRateChangeComplete}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor={COLORS.border}
              thumbTintColor={COLORS.primary}
            />
          </View>
          <Text style={styles.sliderLabel}>Faster</Text>
        </View>
        <Text style={styles.rateValue}>{getRateLabel(localRate)}</Text>
      </View>

      {/* Test Button */}
      <View style={styles.section}>
        <Pressable
          style={[styles.testButton, isSpeaking && styles.testButtonDisabled]}
          onPress={handleTestSpeech}
          disabled={isSpeaking}
        >
          <Text style={styles.testButtonText}>
            {isSpeaking ? 'Speaking...' : 'Test Speech'}
          </Text>
        </Pressable>
      </View>

      {/* Speak on Press vs Release */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activation</Text>
        <View style={styles.toggleRow}>
          <View style={styles.toggleContent}>
            <Text style={styles.toggleLabel}>Speak Immediately on Press</Text>
            <Text style={styles.toggleDescription}>
              {settings.speakOnPress
                ? 'Word is spoken as soon as the button is pressed'
                : 'Word is spoken when finger is lifted'}
            </Text>
          </View>
          <Switch
            value={settings.speakOnPress}
            onValueChange={(value) => setSettings({ speakOnPress: value })}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Tip</Text>
        <Text style={styles.infoText}>
          A slower speech rate (0.7-0.8) is recommended for young children
          learning to communicate. You can gradually increase the speed as they
          become more comfortable.
        </Text>
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
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
  },
  sliderWrapper: {
    flex: 1,
    marginHorizontal: 12,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  rateValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 12,
  },
  testButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  testButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
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
  infoBox: {
    marginTop: 8,
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
});
