import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleComponent = ({ title, color = '#38a37f' }: { title: string; color?: string }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.header, { color }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default TitleComponent;
