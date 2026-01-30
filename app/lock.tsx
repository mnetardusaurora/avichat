import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PinPad } from '../src/components/PinPad';
import { useAppLock } from '../src/hooks/useAppLock';
import { COLORS } from '../src/utils/constants';

type Mode = 'verify' | 'set' | 'confirm';

export default function LockScreen() {
  const router = useRouter();
  const { isPinSet, verifyPin, setPin } = useAppLock();
  const [mode, setMode] = useState<Mode>(isPinSet ? 'verify' : 'set');
  const [error, setError] = useState<string | undefined>();
  const [newPin, setNewPin] = useState<string>('');

  const handlePinComplete = useCallback(
    async (pin: string) => {
      setError(undefined);

      if (mode === 'verify') {
        const isValid = await verifyPin(pin);
        if (isValid) {
          router.replace('/(settings)');
        } else {
          setError('Incorrect PIN. Try again.');
        }
      } else if (mode === 'set') {
        setNewPin(pin);
        setMode('confirm');
      } else if (mode === 'confirm') {
        if (pin === newPin) {
          await setPin(pin);
          router.replace('/(settings)');
        } else {
          setError('PINs do not match. Try again.');
          setNewPin('');
          setMode('set');
        }
      }
    },
    [mode, verifyPin, setPin, newPin, router]
  );

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const getTitle = () => {
    switch (mode) {
      case 'verify':
        return 'Enter PIN to access settings';
      case 'set':
        return 'Create a new PIN';
      case 'confirm':
        return 'Confirm your PIN';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {mode === 'verify' ? 'Settings Lock' : 'Set PIN'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <PinPad
        title={getTitle()}
        onComplete={handlePinComplete}
        error={error}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  placeholder: {
    width: 60,
  },
});
