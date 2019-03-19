import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient, Font } from 'expo';
import styles from '../styles/loginBoxStyle';


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
    fetch('http://192.168.1.35:5000/auth/login', {
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
        return fetch('http://192.168.1.35:5000/auth/me', {
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

    if (this.state.hello) {
      return (
        <View style={styles.container}>
          <ScrollView>
            <FlatList
              data={this.state.hello.turnWithDates}
              horizontal={true}
              renderItem={({ item }) => {
                return ( <Text> {item.turn} </Text> )
              }}
            />
          </ScrollView>
        </View>
      )
    }
    if (this.state.fontLoaded) {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <LinearGradient colors={['#10bad2', '#2685e4']} style={{ justifyContent: 'center' }}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.blueBox}>
            <Text style={styles.label}>Usuario</Text>
            <TextInput style={styles.userInput} onChangeText={(text) => this.setState({ username: text })}></TextInput>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput style={styles.userInput} onChangeText={(text) => this.setState({ password: text })}
              secureTextEntry={true}></TextInput>
            <TouchableOpacity onPress={() => { this.loginPressed() }}>
              <LinearGradient style={styles.loginButton} colors={['#0470dc', '#23538a']} start={[0, 0]} end={[1, 1]}>
                {this.state.fontLoaded ? (<Text style={styles.buttonText}>Iniciar sesión</Text>) : null}
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

module.exports = LoginBox;
