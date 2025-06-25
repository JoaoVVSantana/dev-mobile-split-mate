import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface CreateButtonProps {
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  label?: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({
  onPress,
  backgroundColor = "#38a37f",
  textColor = "white",
  label = "Criar",
}) => {
  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    { backgroundColor },
  ];
  const textStyle: StyleProp<TextStyle> = [
    styles.buttonText,
    { color: textColor },
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 54,
    backgroundColor: "#38a37f",
    borderRadius: 100,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    minWidth: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default CreateButton;
