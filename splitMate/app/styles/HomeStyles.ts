import { StyleSheet } from 'react-native';

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
  },
  eventsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  eventButtonContainer: {
    width: '48%',
    marginBottom: 10,
  },
  horizontalEvent: {
    width: '100%',
    marginBottom: 10,
  },
  secondEvent: {
    marginLeft: '4%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 0,
  },
  optionsContainer: {
    position: 'absolute',
    right: 20,
    top: 100,
    elevation: 5,
    padding: 10,
    width: 160,
    zIndex: 2,
  },
  optionButton: {
    backgroundColor: '#5a139a',
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, 
    marginTop: 20,         
  },
});

export const {
  container,
  eventsContainer,
  horizontal,
  grid,
  eventButtonContainer,
  horizontalEvent,
  secondEvent,
  overlay,
  optionsContainer,
  optionButton,
  optionText,
  titleRow
} = HomeScreenStyles;

export default HomeScreenStyles;
