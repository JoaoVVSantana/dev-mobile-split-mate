// app/index.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { InteractionManager } from 'react-native';
import { initDatabase } from '~/persistence/database';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Initialize database when app starts
    initDatabase().catch(console.error);

    const task = InteractionManager.runAfterInteractions(() => {
      router.replace('./tabs/HomeScreen');
    });

    return () => task.cancel();
  }, []);

  return null;
}
