import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { foo: "bar" };
  }

  handlePress = async() => {
    fetch('https://devops-backend.azurewebsites.net/helloWorld')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        hello: responseJson.hello
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    console.log(this.state.hello);
    if ( this.state.hello === undefined ) {
      console.log('Rendering first');
      return (
        <View style={styles.container}>
          <Text>Hello friend, that's lame</Text>
          <Button onPress={this.handlePress.bind(this)}
                  title="HANDLE!"></Button>
        </View>
      );
    } else {
      console.log('Rendering last');
      return (
        <View style={styles.container}>
          <Text>{this.state.hello}</Text>
        </View>
      )
    }
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
