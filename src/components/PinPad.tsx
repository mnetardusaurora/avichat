import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';
import { COLORS, PIN_LENGTH } from '../utils/constants';

interface PinPadProps {
  onComplete: (pin: string) => void;
  pinLength?: number;
  title: string;
  error?: string;
}

export function PinPad({
  onComplete,
  pinLength = PIN_LENGTH,
  title,
  error,
}: PinPadProps) {
  const [pin, setPin] = useState('');
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Shake animation on error
  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      setPin('');
    }
  }, [error, shakeAnimation]);

  const handleDigitPress = useCallback(
    (digit: string) => {
      if (pin.length < pinLength) {
        const newPin = pin + digit;
        setPin(newPin);
        if (newPin.length === pinLength) {
          onComplete(newPin);
        }
      }
    },
    [pin, pinLength, onComplete]
  );

  const handleBackspace = useCallback(() => {
    setPin((prev) => prev.slice(0, -1));
  }, []);

  const handleClear = useCallback(() => {
    setPin('');
  }, []);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < pinLength; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            i < pin.length ? styles.dotFilled : styles.dotEmpty,
          ]}
        />
      );
    }
    return dots;
  };

  const renderDigitButton = (digit: string) => (
    <Pressable
      key={digit}
      style={({ pressed }) => [
        styles.digitButton,
        pressed && styles.digitButtonPressed,
      ]}
      onPress={() => handleDigitPress(digit)}
    >
      <Text style={styles.digitText}>{digit}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Animated.View
        style={[
          styles.dotsContainer,
          { transform: [{ translateX: shakeAnimation }] },
        ]}
      >
        {renderDots()}
      </Animated.View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.padContainer}>
        <View style={styles.row}>
          {renderDigitButton('1')}
          {renderDigitButton('2')}
          {renderDigitButton('3')}
        </View>
        <View style={styles.row}>
          {renderDigitButton('4')}
          {renderDigitButton('5')}
          {renderDigitButton('6')}
        </View>
        <View style={styles.row}>
          {renderDigitButton('7')}
          {renderDigitButton('8')}
          {renderDigitButton('9')}
        </View>
        <View style={styles.row}>
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
            onPress={handleClear}
          >
            <Text style={styles.actionText}>Clear</Text>
          </Pressable>
          {renderDigitButton('0')}
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
            onPress={handleBackspace}
          >
            <Text style={styles.actionText}>⌫</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 8,
    borderWidth: 2,
  },
  dotEmpty: {
    borderColor: COLORS.border,
    backgroundColor: 'transparent',
  },
  dotFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  padContainer: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  digitButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  digitButtonPressed: {
    backgroundColor: COLORS.primary,
  },
  digitText: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.text,
  },
  actionButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  actionButtonPressed: {
    backgroundColor: COLORS.border,
  },
  actionText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});
