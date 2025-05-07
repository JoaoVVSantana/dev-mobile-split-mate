import { StyleSheet } from 'react-native';

const NewEventStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a139a', 
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 100, 
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
  buttonContainer: {
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
  participantList,
  participant,
  buttonContainer,
} = NewEventStyles;

export default NewEventStyles;
