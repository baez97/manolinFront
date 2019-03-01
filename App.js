import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  handlePress = async() => {
    fetch('')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello friend, that's lame</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
