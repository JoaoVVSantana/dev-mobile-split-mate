import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
      router.replace('/ScreenMeusEventos');
    }, 0);

    return () => clearTimeout(timeout);
  }, [router]);

  if (!isReady) {
    return null; 
  }

  return null;
}