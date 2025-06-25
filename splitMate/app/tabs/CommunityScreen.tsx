import React from "react";
import { View, ScrollView } from "react-native";
import TitleComponent from "../components/Title/TitleComponent";
import TextInputBase from "../components/Text/TextInputBase";
import CreateButton from "../components/Buttons/CreateButton";
import { useCommunityScreen } from "~/hooks/Screen/useCommunityScreen";
import {
  container,
  scrollContainer,
  buttonContainer,
} from "~/styles/CommunityStyles";
import NewEventForm from "~/components/Form/NewEventForm";
import FriendItem from "~/components/Community/FriendItem";

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
      <TitleComponent title="Adicionar amigo" color="#38a37f" />

        <NewEventForm>
          <TextInputBase
            label="Nome do amigo"
            value={friendName}
            onChangeText={setFriendName}
            placeholder="Ex: João, Maria..."
            labelColor="#5a139a"
            placeholderTextColor="#a3a3a3"
            backgroundColor="#5a139a"
            style={{ color: "#ffffff" }}
          />

          <TextInputBase
            label="E-mail (opcional)"
            value={friendEmail}
            onChangeText={setFriendEmail}
            placeholder="exemplo@email.com"
            labelColor="#5a139a"
            placeholderTextColor="#a3a3a3"
            backgroundColor="#5a139a"
            style={{ color: "#ffffff" }} 
          />
        </NewEventForm>

        <NewEventForm>
          <ScrollView
            style={{ maxHeight: 300, paddingRight: 10 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            {friendsList.map((friend, index) => (
              <FriendItem key={index} name={friend.name} email={friend.email} />
            ))}
          </ScrollView>
        </NewEventForm>

      <View style={buttonContainer}>
        <CreateButton onPress={handleConfirm} label="Adicionar amigo" />
      </View>
    </View>
  );
}
