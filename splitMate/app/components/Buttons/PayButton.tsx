import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface PayButtonProps {
  onPress: () => void;
  ownerName: string;
}

export default function PayButton({ onPress, ownerName }: PayButtonProps) {
  return (
    <TouchableOpacity style={styles.payButton} onPress={onPress}>
      <Text style={styles.payButtonText}>Pagar pra {ownerName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    payButton: {
      height: 54,
      backgroundColor: '#38a37f',
      borderRadius: 100,
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginBottom: 20,
      minWidth: 200,
    },
    payButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
      letterSpacing: 0.5,
    },
  });