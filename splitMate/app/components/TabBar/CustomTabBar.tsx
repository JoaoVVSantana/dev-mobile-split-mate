import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '~/tabs/IconSymbol';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CustomTabBar() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push('../../tabs/HomeScreen')}
        style={styles.iconButton}
      >
        <IconSymbol name="house.fill" size={28} color="#5a139a" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('../../tabs/UserScreen')}
        style={styles.iconButton}
      >
        <AntDesign name="user" size={24} color="#5a139a" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('../../tabs/CommunityScreen')}
        style={styles.iconButton}
      >
        <AntDesign name="addusergroup" size={24} color="#5a139a" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
    pointerEvents: 'box-none',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  iconButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 50,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
});
