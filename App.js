import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient, Font } from 'expo';
import LoginBox from './components/loginBox';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { foo: "bar", fontLoaded: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'montserrat-extra-bold': require('./assets/fonts/Montserrat-ExtraBold.otf'),
    });

    this.setState({fontLoaded: true});
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
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <LoginBox></LoginBox>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bee6ef',
    alignItems: 'center',
    justifyContent: 'center',
  },

  userInputContainer: {
    marginTop: 20,
    backgroundColor: '#c2c2c2'
  },

  userInput: {
    padding:20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 360,
    fontFamily: 'montserrat-extra-bold',
    color: 'black',
    fontSize: 20
  },

  label: {
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 10,
    fontFamily: 'montserrat-extra-bold',
    color: 'white',
    fontSize: 20
  },

  blueBox: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
    elevation: 3
  },

  loginButton: {
    padding: 20,
    // backgroundColor: 'black',
    borderRadius: 20,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
    marginBottom: 20,
    // shadowOffset:{  width: 0,  height: 20,  },
    // shadowColor: 'black',
    // shadowOpacity: 1.0,
    elevation: 3,
    // shadowRadius: 10
  },

  buttonText: {
    fontFamily: 'montserrat-extra-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});
