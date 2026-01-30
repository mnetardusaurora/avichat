import { useState, useCallback, useEffect } from 'react';
import * as Speech from 'expo-speech';
import { SpeechOptions } from '../types';
import { useSpeechSettings } from '../stores/appStore';

interface UseSpeechResult {
  speak: (text: string, options?: SpeechOptions) => Promise<void>;
  stop: () => void;
  isSpeaking: boolean;
  getAvailableVoices: () => Promise<Speech.Voice[]>;
}

export function useSpeech(): UseSpeechResult {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { speechRate } = useSpeechSettings();

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const speak = useCallback(
    async (text: string, options?: SpeechOptions): Promise<void> => {
      try {
        // Stop any current speech
        await Speech.stop();

        setIsSpeaking(true);

        await Speech.speak(text, {
          rate: options?.rate ?? speechRate,
          pitch: options?.pitch ?? 1.0,
          language: options?.language ?? 'en-US',
          onStart: () => setIsSpeaking(true),
          onDone: () => setIsSpeaking(false),
          onStopped: () => setIsSpeaking(false),
          onError: (error) => {
            console.error('Speech error:', error);
            setIsSpeaking(false);
          },
        });
      } catch (error) {
        console.error('Error speaking:', error);
        setIsSpeaking(false);
      }
    },
    [speechRate]
  );

  const stop = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  const getAvailableVoices = useCallback(async (): Promise<Speech.Voice[]> => {
    try {
      return await Speech.getAvailableVoicesAsync();
    } catch (error) {
      console.error('Error getting voices:', error);
      return [];
    }
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    getAvailableVoices,
  };
}
