import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient, Font } from 'expo';


export default class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { foo: "bar", fontLoaded: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'montserrat-extra-bold': require('../assets/fonts/Montserrat-ExtraBold.otf'),
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
    if ( this.state.fontLoaded ) {
      return (
        <KeyboardAvoidingView behavior="position">
          <LinearGradient colors={['#10bad2', '#2685e4']} style={{justifyContent: 'center'}}
            start={[0,0]}
            end={[1,1]}
            style={styles.blueBox}>
              <Text style={styles.label}>Usuario</Text>
              <TextInput style={styles.userInput}></TextInput>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput type='password' style={styles.userInput}></TextInput>
            <TouchableOpacity>
              <LinearGradient style={styles.loginButton} colors={['#0470dc', '#23538a']} start={[0,0]} end={[1,1]}>
                { this.state.fontLoaded ? ( <Text style={styles.buttonText}>Iniciar sesión</Text> ) : null }
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </KeyboardAvoidingView>
      )
    } else {
      return ( 
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bee6ef',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
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

module.exports = LoginBox;
