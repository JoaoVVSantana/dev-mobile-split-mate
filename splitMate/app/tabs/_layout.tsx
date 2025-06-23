import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import 'react-native-reanimated';
import React from 'react';
import { useColorScheme } from '../hooks/Color/useColorScheme';
import LoadingScreen from '~/views/LoadingScreen';
import { View } from 'react-native';
import CustomTabBar from '../components/TabBar/CustomTabBar';
import { ToastProvider } from '~/components/Toast/ToastFeedback';
import { useFirebaseUser } from '~/hooks/Data/useFirebaseUser';
import { useCommunityStore } from '~/store/useCommunityStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFirebaseUser();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const hasLoadedRef = useRef(false);
  const [isFontReady, setIsFontReady] = useState(false);
  const isAuthenticated = useCommunityStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (loaded && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      setIsFontReady(true);
    }
  }, [loaded]);

  const readyToRender = isFontReady && isAuthenticated;

  useEffect(() => {
    if (readyToRender) {
      SplashScreen.hideAsync();
    }
  }, [readyToRender]);

  if (!readyToRender) {
    return <LoadingScreen onFinish={() => {}} />;
  }

  return (
    <ToastProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
          <CustomTabBar />
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ToastProvider>
  );
}
