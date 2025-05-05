import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FloatingButton = ({ onPress, color = '#5a139a' }: { onPress: () => void; color?: string }) => {
  return (
    <TouchableOpacity style={[styles.floatingButton, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.floatingButtonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#38a37f', 
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3, 
    zIndex: 10,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FloatingButton;
