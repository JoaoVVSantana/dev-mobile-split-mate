import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Easing,
} from 'react-native';

interface EventCardProps {
  eventName: string;
  color: string;
  onPress?: () => void;
  isEditing?: boolean;
  onDelete?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  eventName,
  color,
  onPress,
  isEditing = false,
  onDelete,
}) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isEditing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(shakeAnim, {
            toValue: -1,
            duration: 50,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ])
      ).start();
    } else {
      shakeAnim.stopAnimation();
      shakeAnim.setValue(0);
    }
  }, [isEditing]);

  const shakeStyle = {
    transform: [
      {
        rotate: shakeAnim.interpolate({
          inputRange: [-1, 1],
          outputRange: ['-1deg', '1deg'],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.eventButton, { backgroundColor: color }, isEditing && shakeStyle]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={isEditing}
        style={StyleSheet.absoluteFill}
      />
      <Text style={styles.eventText}>{eventName}</Text>

      {isEditing && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  eventButton: {
    fontWeight: 'bold',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    height: 80,
    position: 'relative',
  },
  eventText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 12,
    zIndex: 10,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EventCard;
