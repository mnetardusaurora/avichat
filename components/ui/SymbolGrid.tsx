// 3x3 grid layout for symbol buttons

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Symbol } from '@/data/symbols';
import { SymbolButton } from './SymbolButton';

export interface SymbolGridProps {
  symbols: Symbol[];
  getImageForSymbol: (symbolId: string, defaultIcon: string) => { type: 'emoji' | 'image'; value: string };
  onSymbolPress: (symbol: Symbol) => void;
  onSymbolLongPress?: (symbol: Symbol) => void;
}

export const SymbolGrid: React.FC<SymbolGridProps> = ({
  symbols,
  getImageForSymbol,
  onSymbolPress,
  onSymbolLongPress,
}) => {
  // Ensure we have exactly 9 symbols (3x3 grid)
  const gridSymbols = symbols.slice(0, 9);

  // Split into rows of 3
  const rows: Symbol[][] = [];
  for (let i = 0; i < gridSymbols.length; i += 3) {
    rows.push(gridSymbols.slice(i, i + 3));
  }

  return (
    <View style={styles.container} testID="symbol-grid">
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((symbol) => (
            <SymbolButton
              key={symbol.id}
              symbol={symbol}
              imageInfo={getImageForSymbol(symbol.id, symbol.icon)}
              onPress={onSymbolPress}
              onLongPress={onSymbolLongPress}
              testID={`symbol-${symbol.id}`}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
