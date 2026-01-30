// Text-to-speech utilities with web-native fallback

import { Platform } from 'react-native';
import * as ExpoSpeech from 'expo-speech';

export interface SpeechOptions {
  language?: string;
  pitch?: number;
  rate?: number;
}

const defaultOptions: SpeechOptions = {
  language: 'en-US',
  pitch: 1.0,
  rate: 0.9, // Slightly slower for toddlers
};

/**
 * Speak using native Web Speech API (more reliable on web)
 */
const speakWeb = (text: string, options: SpeechOptions): void => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.language || 'en-US';
    utterance.pitch = options.pitch || 1.0;
    utterance.rate = options.rate || 0.9;
    utterance.volume = 1.0;

    // Get voices and try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (voice) => voice.lang.startsWith('en') && voice.localService
    ) || voices.find((voice) => voice.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);

    console.log('Speaking:', text);
  } else {
    console.warn('Web Speech API not supported');
  }
};

/**
 * Speak using Expo Speech (for native platforms)
 */
const speakNative = (text: string, options: SpeechOptions): void => {
  ExpoSpeech.stop();
  ExpoSpeech.speak(text, {
    language: options.language,
    pitch: options.pitch,
    rate: options.rate,
  });
};

/**
 * Speak the given text immediately
 */
export const speak = (text: string, options?: SpeechOptions): void => {
  const mergedOptions = { ...defaultOptions, ...options };

  if (Platform.OS === 'web') {
    speakWeb(text, mergedOptions);
  } else {
    speakNative(text, mergedOptions);
  }
};

/**
 * Stop any current speech
 */
export const stopSpeech = (): void => {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } else {
    ExpoSpeech.stop();
  }
};

/**
 * Check if speech is currently playing
 */
export const isSpeaking = async (): Promise<boolean> => {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis.speaking;
    }
    return false;
  }
  return ExpoSpeech.isSpeakingAsync();
};

/**
 * Initialize voices (needed for some browsers)
 */
export const initSpeech = (): void => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // Load voices - some browsers need this called first
    window.speechSynthesis.getVoices();

    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }
};
