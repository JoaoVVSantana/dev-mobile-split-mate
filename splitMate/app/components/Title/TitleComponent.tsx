import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TitleComponentProps {
  title: string;
  color?: string;
  showUnderline?: boolean;
}

const TitleComponent = ({ title, color = '#38a37f', showUnderline = true }: TitleComponentProps) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.header, { color }]}>{title}</Text>
      {showUnderline && <View style={[styles.underline, { backgroundColor: color }]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  underline: {
    marginTop: 2,
    width: 80,
    height: 4,
    borderRadius: 2,
  },
});

export default TitleComponent;
