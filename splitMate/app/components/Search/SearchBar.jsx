import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ placeholder, onChangeText }) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder={placeholder}
      placeholderTextColor="white"
      placeholderStyle={{ fontWeight: 'bold' }}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    textAlign: 'center',
    height: 50,
    borderColor: '#ccc',
    backgroundColor: 'rgba(56, 163, 127, 0.45)',
    borderWidth: 1,
    borderRadius: 100,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default SearchBar;
