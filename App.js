import React from 'react';
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


