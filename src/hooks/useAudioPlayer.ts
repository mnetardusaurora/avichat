import { useState, useCallback, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

interface UseAudioPlayerResult {
  playAudio: (filePath: string) => Promise<void>;
  stopAudio: () => void;
  isPlaying: boolean;
}

export function useAudioPlayer(): UseAudioPlayerResult {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const playAudio = useCallback(async (filePath: string): Promise<void> => {
    try {
      // Stop and unload any current sound
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      setIsPlaying(true);

      // Set audio mode for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      // Load and play the sound
      const { sound } = await Audio.Sound.createAsync(
        { uri: filePath },
        { shouldPlay: true },
        (status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
            sound.unloadAsync();
            soundRef.current = null;
          }
        }
      );

      soundRef.current = sound;
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.stopAsync();
      soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  return {
    playAudio,
    stopAudio,
    isPlaying,
  };
}
