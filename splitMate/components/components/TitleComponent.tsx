import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleComponent = ({ title }: { title: string }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.header}>{title}</Text>
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
    color: '#38a37f', 
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default TitleComponent;
