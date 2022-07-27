import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RoundedButton } from '../components/RoundedButton';

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingbutton}>
        <RoundedButton size={75} title="10" onPress={() => onChangeTime(0.1)} />
      </View>
      <View style={styles.timingbutton}>
        <RoundedButton size={75} title="15" onPress={() => onChangeTime(0.5)} />
      </View>
      <View style={styles.timingbutton}>
        <RoundedButton size={75} title="20" onPress={() => onChangeTime(1)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingbutton: {
    flex: 1,
    alignItems: 'center',
  },
});
