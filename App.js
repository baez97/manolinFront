import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient, Font } from 'expo';
import LoginScreen from './screens/loginScreen';
import HomeScreen  from './screens/homeScreen'; 
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppContainer></AppContainer>
    )
  }
}

const AppNavigator = createStackNavigator({
  LoginScreen : { screen: LoginScreen },
  HomeScreen  : { screen: HomeScreen  }
}, {
  initialRouteName: "LoginScreen",
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#bee6ef',
      alignItems: 'center',
      justifyContent: 'center',
  }
});

