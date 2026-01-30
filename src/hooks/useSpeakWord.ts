import { useCallback } from 'react';
import { VocabularyItem } from '../types';
import { useSpeech } from './useSpeech';
import { useAudioPlayer } from './useAudioPlayer';

interface UseSpeakWordResult {
  speakWord: (item: VocabularyItem) => Promise<void>;
  stop: () => void;
  isSpeaking: boolean;
}

export function useSpeakWord(): UseSpeakWordResult {
  const { speak, stop: stopSpeech, isSpeaking: isTTSSpeaking } = useSpeech();
  const { playAudio, stopAudio, isPlaying: isAudioPlaying } = useAudioPlayer();

  const speakWord = useCallback(
    async (item: VocabularyItem): Promise<void> => {
      if (item.audioType === 'custom' && item.audioPath) {
        // Play custom recording
        await playAudio(item.audioPath);
      } else {
        // Use TTS
        await speak(item.label);
      }
    },
    [speak, playAudio]
  );

  const stop = useCallback(() => {
    stopSpeech();
    stopAudio();
  }, [stopSpeech, stopAudio]);

  const isSpeaking = isTTSSpeaking || isAudioPlaying;

  return {
    speakWord,
    stop,
    isSpeaking,
  };
}
