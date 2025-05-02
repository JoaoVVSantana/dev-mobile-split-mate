import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FriendItemProps {
  name: string;
  email?: string;
}

export default function FriendItem({ name, email }: FriendItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {email ? `${name} - ${email}` : name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5a139a",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
