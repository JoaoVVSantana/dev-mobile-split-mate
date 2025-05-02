import { StyleSheet } from 'react-native';

const CommunityStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 160,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    zIndex: 1,
  },
});

export const {
  container,
  scrollContainer,
  buttonContainer,
} = CommunityStyles;

export default CommunityStyles;
