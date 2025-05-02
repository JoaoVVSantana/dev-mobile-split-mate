import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

export default function CenteredForm({ children, style, ...rest }: ViewProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
});
