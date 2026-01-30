// Home screen board layout with core words

import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Symbol } from '@/data/symbols';
import { homeBoard } from '@/data/boards';
import { SymbolGrid } from '@/components/ui/SymbolGrid';
import { CategoryHeader } from '@/components/ui/CategoryHeader';
import { useSpeech } from '@/hooks/useSpeech';
import { useSymbolImage } from '@/hooks/useSymbolImage';

export const HomeBoard: React.FC = () => {
  const router = useRouter();
  const { speak } = useSpeech();
  const { getImageForSymbol, pickImage } = useSymbolImage();

  const handleSymbolPress = useCallback(
    (symbol: Symbol) => {
      // Check if it's the categories button
      if (symbol.id === 'categories') {
        router.push('/category/categorySelector');
      } else {
        // Speak the label
        speak(symbol.label);
      }
    },
    [router, speak]
  );

  const handleSymbolLongPress = useCallback(
    (symbol: Symbol) => {
      // Don't allow customizing the categories button
      if (symbol.id !== 'categories') {
        pickImage(symbol.id);
      }
    },
    [pickImage]
  );

  return (
    <View style={styles.container}>
      <CategoryHeader title="AviChat" onBackPress={() => {}} showBack={false} />
      <SymbolGrid
        symbols={homeBoard.symbols}
        getImageForSymbol={getImageForSymbol}
        onSymbolPress={handleSymbolPress}
        onSymbolLongPress={handleSymbolLongPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
});
