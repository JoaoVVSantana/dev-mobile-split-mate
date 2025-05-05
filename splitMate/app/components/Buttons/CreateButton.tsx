import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface CreateButtonProps {
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onPress, backgroundColor = '#5a139a', textColor = 'white' }) => {
  const buttonStyle: StyleProp<ViewStyle> = [styles.button, { backgroundColor }];
  const textStyle: StyleProp<TextStyle> = [styles.buttonText, { color: textColor }];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>Criar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateButton;
