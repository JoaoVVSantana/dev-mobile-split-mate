// app/index.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { InteractionManager } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      router.replace('./tabs/HomeScreen');
    });

    return () => task.cancel();
  }, []);

  return null;
}
