import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

interface TextInputComponentProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  placeholder?: string;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({ label, value, onChangeText, keyboardType = 'default', placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#5a139a',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 5,
  },
  
  input: {
    height: 55,
    borderColor: '#5a139a',
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: 'rgba(56, 163, 127, 0.45)',
  },
});

export default TextInputComponent;