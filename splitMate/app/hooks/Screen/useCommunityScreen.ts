import { useEffect, useState } from "react";
import { useCommunityStore } from "~/store/useCommunityStore";
import {
  EToastVariants,
  useToastFeedback,
} from "~/components/Toast/ToastFeedback";
import { TFriend } from "~/types/TFriend";

export function useCommunityScreen() {
  const [friendName, setFriendName] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const friendsList = useCommunityStore((state) => state.friends);
  const addFriend = useCommunityStore((state) => state.addFriend);
  const toastFeedback = useToastFeedback();

  const loadFriends = useCommunityStore((state) => state.loadFriends);

  useEffect(() => {
    loadFriends();
  }, []);

  const handleConfirm = () => {
    if (!friendName.trim()) {
      toastFeedback.showToast({
        message: "Por favor, preencha o nome do amigo.",
        variant: EToastVariants.ERROR,
      });
      return;
    }

    const newFriend: TFriend = {
      name: friendName.trim(),
      email: friendEmail.trim() || "",
      debts: [],
    };

    addFriend(newFriend);

    toastFeedback.showToast({
      message: `${friendName} foi adicionado com sucesso!`,
      variant: EToastVariants.SUCCESS,
    });

    setFriendName("");
    setFriendEmail("");
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
