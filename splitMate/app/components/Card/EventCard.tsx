import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Easing,
  View,
} from "react-native";

interface EventCardProps {
  eventName: string;
  color: string;
  isEditing?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  drag?: () => void;
  isActive?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  eventName,
  color,
  isEditing = false,
  onPress,
  onDelete,
  drag,
  isActive,
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
          outputRange: ["-1deg", "1deg"],
        }),
      },
    ],
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onLongPress={drag}
      delayLongPress={200}
      disabled={isEditing}
    >
      <Animated.View
        style={[
          styles.eventButton,
          { backgroundColor: color },
          isEditing && shakeStyle,
          isActive && styles.activeCard,
        ]}
      >
        <Text style={styles.eventText}>{eventName}</Text>

        {isEditing && (
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventButton: {
    fontWeight: "bold",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    height: 80,
    position: "relative",
  },
  activeCard: {
    opacity: 0.85,
  },
  eventText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
    backgroundColor: "red",
    padding: 5,
    borderRadius: 12,
    zIndex: 10,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EventCard;
