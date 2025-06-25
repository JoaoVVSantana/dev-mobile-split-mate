import { StyleSheet } from 'react-native';

const EventScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
    position: 'relative',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
});

export const {
  container,
  cardsContainer,
} = EventScreenStyles;

export default EventScreenStyles;
