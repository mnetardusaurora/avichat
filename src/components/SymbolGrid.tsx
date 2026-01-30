import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  ListRenderItem,
} from 'react-native';
import { VocabularyItem, Category, isVocabularyItem, isCategory } from '../types';
import { PADDING_VALUES, COLORS } from '../utils/constants';
import { SymbolButton } from './SymbolButton';
import { CategoryButton } from './CategoryButton';
import { BackButton } from './BackButton';

type GridItem = VocabularyItem | Category | { type: 'back' } | { type: 'empty'; position: number };

interface SymbolGridProps {
  items: (VocabularyItem | Category)[];
  gridRows: number;
  gridColumns: number;
  onItemPress: (item: VocabularyItem) => void;
  onCategoryPress: (category: Category) => void;
  onBackPress?: () => void;
  showLabels: boolean;
  labelSize: 'small' | 'medium' | 'large';
  padding: 'compact' | 'normal' | 'spacious';
  showBackButton?: boolean;
  speakOnPress?: boolean;
}

function SymbolGridComponent({
  items,
  gridRows,
  gridColumns,
  onItemPress,
  onCategoryPress,
  onBackPress,
  showLabels,
  labelSize,
  padding,
  showBackButton = false,
  speakOnPress = true,
}: SymbolGridProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const paddingValues = PADDING_VALUES[padding];

  // Calculate button size based on screen dimensions
  const availableWidth = screenWidth - paddingValues.container * 2;
  const availableHeight = screenHeight - paddingValues.container * 2 - 100; // Account for safe area
  const totalGapWidth = paddingValues.gap * (gridColumns - 1);
  const totalGapHeight = paddingValues.gap * (gridRows - 1);

  const buttonWidth = (availableWidth - totalGapWidth) / gridColumns;
  const buttonHeight = (availableHeight - totalGapHeight) / gridRows;
  const buttonSize = Math.min(buttonWidth, buttonHeight);

  // Prepare grid data with back button and empty cells
  const gridData = useMemo((): GridItem[] => {
    const totalCells = gridRows * gridColumns;
    const data: GridItem[] = [];

    // Add back button at position 0 if needed
    if (showBackButton) {
      data.push({ type: 'back' });
    }

    // Sort items by grid position
    const sortedItems = [...items].sort((a, b) => a.gridPosition - b.gridPosition);

    // Add items
    for (const item of sortedItems) {
      data.push(item);
    }

    // Fill remaining cells with empty placeholders
    const startPosition = data.length;
    for (let i = startPosition; i < totalCells; i++) {
      data.push({ type: 'empty', position: i });
    }

    return data.slice(0, totalCells);
  }, [items, gridRows, gridColumns, showBackButton]);

  const renderItem: ListRenderItem<GridItem> = useCallback(
    ({ item }) => {
      // Back button
      if ('type' in item && item.type === 'back') {
        return (
          <View style={[styles.cellContainer, { margin: paddingValues.gap / 2 }]}>
            <BackButton
              size={buttonSize}
              onPress={onBackPress || (() => {})}
              showLabel={showLabels}
              labelSize={labelSize}
            />
          </View>
        );
      }

      // Empty cell
      if ('type' in item && item.type === 'empty') {
        return (
          <View style={[styles.cellContainer, { margin: paddingValues.gap / 2 }]}>
            <View
              style={[
                styles.emptyCell,
                {
                  width: buttonSize,
                  height: buttonSize,
                },
              ]}
            />
          </View>
        );
      }

      // Category button
      if (isCategory(item)) {
        return (
          <View style={[styles.cellContainer, { margin: paddingValues.gap / 2 }]}>
            <CategoryButton
              category={item}
              size={buttonSize}
              onPress={() => onCategoryPress(item)}
              showLabel={showLabels}
              labelSize={labelSize}
            />
          </View>
        );
      }

      // Vocabulary button
      if (isVocabularyItem(item)) {
        return (
          <View style={[styles.cellContainer, { margin: paddingValues.gap / 2 }]}>
            <SymbolButton
              item={item}
              size={buttonSize}
              onPress={() => onItemPress(item)}
              showLabel={showLabels}
              labelSize={labelSize}
              speakOnPress={speakOnPress}
            />
          </View>
        );
      }

      return null;
    },
    [
      buttonSize,
      paddingValues.gap,
      showLabels,
      labelSize,
      onItemPress,
      onCategoryPress,
      onBackPress,
      speakOnPress,
    ]
  );

  const keyExtractor = useCallback((item: GridItem, index: number) => {
    if ('type' in item) {
      return item.type === 'empty' ? `empty-${item.position}` : 'back';
    }
    return item.id;
  }, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: buttonSize + paddingValues.gap,
      offset: (buttonSize + paddingValues.gap) * Math.floor(index / gridColumns),
      index,
    }),
    [buttonSize, paddingValues.gap, gridColumns]
  );

  return (
    <View style={[styles.container, { padding: paddingValues.container }]}>
      <FlatList
        data={gridData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={gridColumns}
        key={`grid-${gridColumns}`} // Force re-render when columns change
        scrollEnabled={false}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gridContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCell: {
    backgroundColor: COLORS.borderLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    opacity: 0.3,
  },
});

export const SymbolGrid = memo(SymbolGridComponent);
