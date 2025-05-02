import { StyleSheet } from 'react-native';

const NewExpenseScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  createButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    zIndex: 1,
  },
});

export const {
  container,
  scrollContainer,
  createButtonContainer,
} = NewExpenseScreenStyles;

export default NewExpenseScreenStyles;
