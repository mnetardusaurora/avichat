// TTS hook for easy speech integration

import { useCallback, useEffect } from 'react';
import { speak, stopSpeech, initSpeech } from '@/lib/speech';

export interface UseSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
}

/**
 * Hook for text-to-speech functionality
 */
export const useSpeech = (): UseSpeechReturn => {
  // Initialize speech synthesis on mount (needed for some browsers)
  useEffect(() => {
    initSpeech();
  }, []);

  const speakText = useCallback((text: string) => {
    speak(text);
  }, []);

  const stop = useCallback(() => {
    stopSpeech();
  }, []);

  return {
    speak: speakText,
    stop,
  };
};
