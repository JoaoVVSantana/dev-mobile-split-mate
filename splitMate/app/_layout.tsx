import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import React from 'react';
import LoadingScreen from '../components/views/UserInterface/LoadingScreen';
import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loaded) {
      console.log('Fonts loaded');
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    console.log('Fonts not loaded yet');
    SplashScreen.hideAsync();
    return null;
  }

  if (isLoading) {
    console.log('Loading layout...');
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ScreenMeusEventos" options={{ headerShown: false }} />
        <Stack.Screen name="ScreenNovoEvento" options={{ title: "Explore" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
