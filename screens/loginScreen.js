import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient, Font } from 'expo';
import styles from '../styles/loginBoxStyle';
import PrimaryButton from '../components/primaryButtonComponent';
import RoundedInput from '../components/inputComponent';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';

const BACKEND_IP = "https://manolin-backend.herokuapp.com";
// const BACKEND_IP = "http://192.168.43.205:5000";


export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { error: false, errorType: "danger", errorTitle: "", errorMessage: "", fontLoaded: false };
  }

  showError(title, message) {
    this.setState({
      error: true,
      errorType: "danger",
      errorTitle: title,
      errorMessage: message
    });
  }

  showWarning(title, message) {
    this.setState({
      error: true,
      errorType: "warning",
      errorTitle: title,
      errorMessage: message
    });
  }

  hideError() {
    this.setState({
      error: false,
      errorTitle: "",
      errorMessage: ""
    });
  }

  async componentDidMount() {
    await Font.loadAsync({
      'montserrat-extra-bold': require('../assets/fonts/Montserrat-ExtraBold.otf'),
    });

    this.setState({ fontLoaded: true });
  }

  loginPressed = async () => {
    if ( ! this.testInput() ) {
      return;
    }
    fetch(BACKEND_IP + '/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if ( responseJson.userError ) {
          this.showError("Usuario incorrecto", "La usuario que has introducido no es correcto");
          throw "The username is not correct";
        } else if ( responseJson.passwordError ) {
          this.showError("Contraseña incorrecta", "La contraseña que has introducido no es correcta");
          throw "The password is not correct";
        }

        this.setState({
          token: responseJson.token
        });
        return fetch(BACKEND_IP + '/auth/me', {
          method: 'POST',
          headers: {
            'x-access-token': this.state.token
          },
          body: JSON.stringify({
            username: this.state.username
          })
        })
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({ hello: responseJSON });
        this.props.navigation.navigate("HomeScreen", {username: this.state.username});
      })
      .catch((error) => {
        this.setState({ error: true });
      })
  }

  testInput() {
    var { username, password } = this.state;
    if ( username == undefined || username.length === 0 ) {
      this.showWarning("Nombre vacío", "Debes introducir el nombre para continuar");
      return false;
    } else if ( password == undefined || password.length === 0 ) {
      this.showWarning("Contraseña vacía", "Debes introducir la contraseña para continuar");
      return false;
    }
    return true;
  }

  render() {
    // if (this.state.hello) {
    //   return (
    //     <View style={styles.container}>
    //       <ScrollView>
    //         <FlatList
    //           data={this.state.hello.turnWithDates}
    //           horizontal={true}
    //           renderItem={({ item }) => {
    //             return ( <Text> {item.turn} </Text> )
    //           }}
    //         />
    //       </ScrollView>
    //     </View>
    //   )
    // }
    if (this.state.fontLoaded) {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <LinearGradient colors={['#10bad2', '#2685e4']} style={{ justifyContent: 'center' }}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.blueBox}>
            <RoundedInput text="Usuario" 
              secureTextEntry={false} 
              onChangeFunction={ (inputText) => { this.setState({ username: inputText }) } }/>
            <RoundedInput text="Contraseña" 
              secureTextEntry={true} 
              onChangeFunction={ (inputText) => { this.setState({ password: inputText }) } }/>
            <PrimaryButton 
              text="Iniciar sesión"
              onPressFunction={() => {this.loginPressed()}}>
            </PrimaryButton>
          </LinearGradient>
          <SCLAlert
            theme={this.state.errorType}
            show={this.state.error}
            title={this.state.errorTitle}
            subtitle={this.state.errorMessage}
            onRequestClose={ () => {} }
            cancellable={true}
          >
          <SCLAlertButton theme={this.state.errorType} onPress={() => { this.hideError() }}>Vale</SCLAlertButton>
        </SCLAlert>
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
