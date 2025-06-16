import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    fontSize: 15,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#2D5D74',
    borderRadius: 24,
    padding: 10,
  },
});
