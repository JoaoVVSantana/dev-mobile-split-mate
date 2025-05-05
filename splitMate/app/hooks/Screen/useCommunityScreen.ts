import { useState } from 'react';
import { Alert } from 'react-native';
import { TFriend } from '~/types/TFriend';

export function useCommunityScreen() {
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [friendsList, setFriendsList] = useState<TFriend[]>([]);

  const handleConfirm = () => {
    if (!friendName.trim()) {
      Alert.alert('Nome obrigatório', 'Por favor, preencha o nome do amigo.');
      return;
    }

    const newFriend: TFriend = { name: friendName.trim(), email: friendEmail.trim() || '' };

    setFriendsList((prev) => [...prev, newFriend]);

    Alert.alert('Amigo adicionado', `${friendName} foi adicionado com sucesso!`);

    setFriendName('');
    setFriendEmail('');
  };

  return {
    friendName,
    friendEmail,
    friendsList,
    setFriendName,
    setFriendEmail,
    handleConfirm,
  };
}
