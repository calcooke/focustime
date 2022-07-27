import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../utils/colors';
import { fontsizes, spacing } from '../utils/sizes';

export const FocusHistory = ({ history }) => {
  if (!history || !history.length) return  <Text style={styles.title}>We haven't focused on anything yet</Text>;

  const renderItem = ({ item }) => <Text style={styles.item}>- {item}</Text>;

  //https://digisoft.udemy.com/course/complete-react-native-mobile-development-zero-to-mastery-with-hooks/learn/lecture/31080548#overview
  //https://reactnative.dev/docs/flatlist
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we've focused on</Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  item: {
    color: colors.white,
    fontSize: fontsizes.md,
    paddingTop: spacing.sm
  },
  title: {
    color: colors.white,
    fontSize: fontsizes.md,
    padding: spacing.md,
    fontWeight: 'bold',
  },
});
