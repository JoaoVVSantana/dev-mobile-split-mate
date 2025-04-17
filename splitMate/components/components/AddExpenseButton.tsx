import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const AddExpenseButton = ({ title }: { title: string;}) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.button} onPress={() => router.push(router as unknown as "/ScreenNovaDespesa" )}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        textAlign: 'center',
        height: 50,
        borderColor: '#ccc',
        backgroundColor: 'rgba(90, 19, 154, 0.45)', 
        borderWidth: 1,
        borderRadius: 100,
        marginBottom: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddExpenseButton;