import { TextStyle, StyleSheet } from 'react-native';

const text: TextStyle = {
  fontWeight: 'bold' as TextStyle['fontWeight'],
  textAlign: 'center',
  color: '#333',
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
    backgroundColor: '#fff',
  },
  title: {
    ...text,
    fontSize: 24,
  },
  paragraph: {
    ...text,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default style;