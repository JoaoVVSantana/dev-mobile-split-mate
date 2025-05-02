import { StyleSheet } from 'react-native';

const NewEventStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a139a',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  participantList: {
    marginTop: 10,
    paddingLeft: 10,
  },
  participant: {
    color: 'white',
    fontSize: 16,
    marginVertical: 2,
  },
});

export const {
  container,
  scrollContainer,
  participantList,
  participant,
} = NewEventStyles;

export default NewEventStyles;
