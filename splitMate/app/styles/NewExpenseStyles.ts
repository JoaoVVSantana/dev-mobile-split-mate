import { StyleSheet } from 'react-native';

const NewExpenseScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a139a',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  createButtonContainer: {
    position: 'absolute',
    bottom: 118,
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
