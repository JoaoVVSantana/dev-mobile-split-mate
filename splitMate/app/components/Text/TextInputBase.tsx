import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { EFormatTypes } from '~/types/EFormatTypes';
interface TextInputBaseProps extends TextInputProps {
  label?: string;
  labelColor?: string;
  backgroundColor?: string;
  placeholderTextColor?: string;
  formatType?: EFormatTypes;

}

const TextInputBase = ({
  label,
  labelColor = 'white',
  backgroundColor = 'transparent',
  placeholderTextColor = 'white',
  style,
  formatType,
  onChangeText,
  value,
  ...rest
}: TextInputBaseProps) => {

  const handleChange = (text: string) => {
    switch (formatType) {
      case EFormatTypes.Currency:
        onChangeText?.(formatCurrency(text));
        break;
      case EFormatTypes.Date:
        onChangeText?.(formatDate(text));
        break;
      default:
        onChangeText?.(text);
    }
  };

  return (
    <View style={{ marginBottom: 30 }}>
      {label && <Text style={[styles.label, { color: labelColor }]}>{label}</Text>}
      <TextInput
        value={value}
        style={[
          {
            backgroundColor,
            color: 'white',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 25,
            paddingHorizontal: 15,
            fontSize: 16,
            height: 50,
            width: 300,
          },
          style,
        ]}
        placeholderTextColor={placeholderTextColor}
        onChangeText={handleChange}
        keyboardType={formatType === EFormatTypes.Currency ? 'numeric' : rest.keyboardType}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 2,
  },
});

export default TextInputBase;
