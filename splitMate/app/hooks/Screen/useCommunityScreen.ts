import { useEffect, useState } from 'react';
import { TFriend } from '~/types/TFriend';
import { useCommunityStore } from '~/store/useCommunityStore';
import { EToastVariants, useToastFeedback } from '~/components/Toast/ToastFeedback';
import { FriendService } from '~/core/Friend/FriendService';


export function useCommunityScreen() {
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');

  const friendsList = useCommunityStore((s) => s.friends);
  const setFriends = useCommunityStore((s) => s.loadFriends);
  const addFriendStore = useCommunityStore((s) => s.addFriend);

  const toast = useToastFeedback();

  useEffect(() => {
    FriendService.getAll()
      .then(setFriends)
      .catch(() =>
        toast.showToast({
          message: 'Não foi possível carregar seus amigos',
          variant: EToastVariants.ERROR,
        }),
      );
  }, []);

  const handleConfirm = async () => {
    if (!friendName.trim()) {
      toast.showToast({
        message: 'Por favor, preencha o nome do amigo.',
        variant: EToastVariants.ERROR,
      });
      return;
    }

    try {
      const newFriend: TFriend = await FriendService.create({
        name: friendName.trim(),
        email: friendEmail.trim(),
      });

      addFriendStore(newFriend);

      toast.showToast({
        message: `${newFriend.name} foi adicionado com sucesso!`,
        variant: EToastVariants.SUCCESS,
      });

      setFriendName('');
      setFriendEmail('');
    } catch (err) {
      toast.showToast({
        message: 'Erro ao salvar amigo no Firebase',
        variant: EToastVariants.ERROR,
      });
    }
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
