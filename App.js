import React from 'react';
import LoginScreen        from './screens/loginScreen';
import HomeScreen         from './screens/homeScreen'; 
import GlobalScreen       from './screens/globalScreen';
import ChooseChangeScreen from './screens/chooseChangeScreen';
import MyChangesScreen    from './screens/myChangesScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';


console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

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
  LoginScreen        : { screen: LoginScreen        },
  HomeScreen         : { screen: HomeScreen         },
  GlobalScreen       : { screen: GlobalScreen       },
  ChooseChangeScreen : { screen: ChooseChangeScreen },
  MyChangesScreen    : { screen: MyChangesScreen    }
}, {
  initialRouteName: "LoginScreen",
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

const AppContainer = createAppContainer(AppNavigator);


