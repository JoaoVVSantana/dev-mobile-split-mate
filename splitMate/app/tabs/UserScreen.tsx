import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import BackArrowButton from '../components/Buttons/BackArrowButton';
import TitleComponent from '../components/Title/TitleComponent';
import { useUserInformationScreen } from '~/hooks/Screen/useUserInformationScreen';


export default function UserInformationScreen() {
  const router = useRouter();
  const { userName, userEmail, userDebt } = useUserInformationScreen();

  return (
    <View style={styles.container}>
      <TitleComponent title="Minha Conta" color="#38a37f" />

      <View style={styles.userInfoContainer}>
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.avatar}
        />
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push('/EditUserInfoScreen')}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userEmail}</Text>

        <Text style={[styles.label, { marginTop: 20 }]}>Total de dívida</Text>
        <Text style={styles.value}>{userDebt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  userNameContainer: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5a139a',
  },
  editButton: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#38a37f',
    borderRadius: 50,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a139a',
  },
  value: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
});
