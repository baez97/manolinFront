import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient, Font } from 'expo';
import styles from '../styles/loginBoxStyle';
import PrimaryButton from '../components/primaryButtonComponent';
import RoundedInput from '../components/inputComponent';

const BACKEND_IP = "http://192.168.43.205"


export default class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { foo: "bar", fontLoaded: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'montserrat-extra-bold': require('../assets/fonts/Montserrat-ExtraBold.otf'),
    });

    this.setState({ fontLoaded: true });
  }

  loginPressed = async () => {
    fetch(BACKEND_IP + ':5000/auth/login', {
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
        this.setState({
          token: responseJson.token
        });
        return fetch(BACKEND_IP + ':5000/auth/me', {
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
        console.log(error);
      })
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

module.exports = LoginBox;
