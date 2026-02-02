// Home board screen (core words + category button)

import { SafeAreaView, StyleSheet } from 'react-native';
import { HomeBoard } from '@/components/boards/HomeBoard';
import { COLORS } from '@/lib/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeBoard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
