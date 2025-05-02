import React from 'react';
import { View, ScrollView } from 'react-native';
import TitleComponent from '../components/Title/TitleComponent';
import TextInputBase from '../components/Text/TextInputBase';
import CreateButton from '../components/Buttons/CreateButton';
import BackArrowButton from '../components/Buttons/BackArrowButton';
import { useCommunityScreen } from '~/hooks/Screen/useCommunityScreen';
import { container, scrollContainer, buttonContainer } from '~/styles/CommunityStyles';
import NewEventForm from '~/components/Form/NewEventForm';
import FriendItem from '~/components/Community/FriendItem';

export default function CommunityScreen() {
  const {
    friendName,
    friendEmail,
    friendsList,
    setFriendName,
    setFriendEmail,
    handleConfirm,
  } = useCommunityScreen();

  return (
    <View style={container}>
      <BackArrowButton />
      <TitleComponent title="Adicionar amigo" color="#5a139a" />

      <ScrollView contentContainerStyle={scrollContainer} showsVerticalScrollIndicator={false}>
        <NewEventForm>
          <TextInputBase
            label="Nome do amigo"
            value={friendName}
            onChangeText={setFriendName}
            placeholder="Ex: João, Maria..."
            labelColor="#5a139a"
            placeholderTextColor="#ccc"
            backgroundColor="#5a139a"
          />

          <TextInputBase
            label="Email (opcional)"
            value={friendEmail}
            onChangeText={setFriendEmail}
            placeholder="exemplo@email.com"
            labelColor="#5a139a"
            placeholderTextColor="#ccc"
            backgroundColor="#5a139a"
          />
        </NewEventForm>

        <ScrollView
      style={{ maxHeight: 300 }} 
      nestedScrollEnabled={true} 
      showsVerticalScrollIndicator={false}
    >
      {friendsList.map((friend, index) => (
        <FriendItem key={index} name={friend.name} email={friend.email} />
      ))}
    </ScrollView>
      </ScrollView>

      <View style={buttonContainer}>
        <CreateButton onPress={handleConfirm} />
      </View>
    </View>
  );
}
