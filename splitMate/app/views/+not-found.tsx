import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import React from 'react';
import { ThemedView } from '~/core-ui/ThemedView';
import { ThemedText } from '~/core-ui/ThemedText';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Erro ao carregar a tela!</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Vá para a tela inicial</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
