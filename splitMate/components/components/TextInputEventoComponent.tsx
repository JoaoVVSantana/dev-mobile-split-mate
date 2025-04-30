import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface TextInputEventoComponentProps {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  onSubmitEditing?: () => void;
}

const TextInputEventoComponent: React.FC<TextInputEventoComponentProps> = ({
  value,
  onChangeText,
  keyboardType = 'default',
  placeholder = '',
  onSubmitEditing,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="grey"
        onSubmitEditing={onSubmitEditing} 
        returnKeyType="done" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent',
    width: 300,
  },
});

export default TextInputEventoComponent;