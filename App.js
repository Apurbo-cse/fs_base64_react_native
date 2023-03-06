import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const App = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnStyle}>
        <Text style={styles.textStyle}>Upload Imgae</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: 'blue',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
});
