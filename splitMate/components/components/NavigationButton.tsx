import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface NavigationButtonProps {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  label,
  onPress,
  backgroundColor = '#38a37f', 
  textColor = 'white', 
  disabled = false,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor }, disabled && styles.disabled]} 
      onPress={onPress} 
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 135, 
    height: 50, 
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NavigationButton;