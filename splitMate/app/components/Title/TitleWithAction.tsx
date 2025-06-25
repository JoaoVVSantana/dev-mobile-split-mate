import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import TitleComponent from './TitleComponent';
import FloatingButton from '../Buttons/FloatingButton';

interface Props {
  title: string;
  onPress: () => void;
  color?: string;
}

const TitleWithActionButton = ({ title, onPress, color = '#38a37f' }: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.sideSpacer} />
      <View style={styles.centerTitle}>
        <TitleComponent title={title} color={color} />
      </View>
      <FloatingButton onPress={onPress} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sideSpacer: {
    width: 40,
  },
  centerTitle: {
    flex: 1,
    alignItems: 'center',
  },
});

export default TitleWithActionButton;
