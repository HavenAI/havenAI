import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function SettingToggle({ label, value, onValueChange }) {
  return (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Switch
        trackColor={{ false: '#ccc', true: '#85C1B9' }}
        thumbColor={value ? '#1C454F' : '#f4f3f4'}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#1C454F',
  },
});
