import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface DataRowProps {
  label: string;
  value: string | number;
  isVertical?: boolean; // Used for lists like "Abilities"
}

const DataRow = ({label, value, isVertical = false}: DataRowProps) => {
  return (
    <View style={[styles.rowContainer, isVertical && styles.verticalContainer]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, isVertical && styles.valueRight]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  verticalContainer: {
    alignItems: 'flex-start', // Labels on top for multi-line data
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
    color: '#4A4A4A',
    fontWeight: '600',
    width: 120, // Fixed width helps align values in a straight vertical line
  },
  value: {
    fontSize: 16,
    color: '#747474',
    flex: 1,
  },
  valueRight: {
    textAlign: 'right',
    width: '100%',
    marginTop: 4,
  },
});

export default DataRow;
