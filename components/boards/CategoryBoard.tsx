// Category sub-board layout

import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Symbol } from '@/data/symbols';
import { Board, getBoard } from '@/data/boards';
import { SymbolGrid } from '@/components/ui/SymbolGrid';
import { CategoryHeader } from '@/components/ui/CategoryHeader';
import { useSpeech } from '@/hooks/useSpeech';
import { useSymbolImage } from '@/hooks/useSymbolImage';

export interface CategoryBoardProps {
  boardId: string;
}

export const CategoryBoard: React.FC<CategoryBoardProps> = ({ boardId }) => {
  const router = useRouter();
  const { speak } = useSpeech();
  const { getImageForSymbol, pickImage } = useSymbolImage();

  const board = getBoard(boardId);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSymbolPress = useCallback(
    (symbol: Symbol) => {
      // Handle navigation symbols
      if (symbol.id === 'back') {
        router.back();
        return;
      }

      // Handle category navigation from the category selector
      if (boardId === 'categorySelector') {
        const categoryBoards = ['people', 'food', 'drinks', 'feelings', 'actions', 'places', 'things', 'animals'];
        if (categoryBoards.includes(symbol.id)) {
          router.push(`/category/${symbol.id}`);
          return;
        }
      }

      // Otherwise speak the label
      speak(symbol.label);
    },
    [router, speak, boardId]
  );

  const handleSymbolLongPress = useCallback(
    (symbol: Symbol) => {
      // Don't allow customizing navigation buttons
      if (symbol.id !== 'back') {
        pickImage(symbol.id);
      }
    },
    [pickImage]
  );

  if (!board) {
    return (
      <View style={styles.container}>
        <CategoryHeader title="Not Found" onBackPress={handleBack} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Board not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategoryHeader title={board.title} onBackPress={handleBack} />
      <SymbolGrid
        symbols={board.symbols}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 24,
    color: '#DC143C',
  },
});
