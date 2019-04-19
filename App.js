import React from 'react';
import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import GlobalScreen from './screens/globalScreen';
import ChooseChangeScreen from './screens/chooseChangeScreen';
import MyChangesScreen from './screens/myChangesScreen';
import ContactsScreen from './screens/contactsScreen';
import deviceStorage from './components/deviceStorage';
import { Font } from 'expo';
import fetchToAPI from './components/fetchToAPI'

import { createStackNavigator, createAppContainer } from 'react-navigation';

const FONT_PATH_MAINTYPO  = "./assets/fonts/Montserrat-ExtraBold.otf";
const FONT_PATH_NAMETYPO  = "./assets/fonts/big_noodle_titling.ttf";


console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox, View } from 'react-native';
import { PulseIndicator  } from 'react-native-indicators';

import layoutStyle from './styles/layoutStyle';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { fontLoaded: false, tokenLoaded: false }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'montserrat-extra-bold': require(FONT_PATH_MAINTYPO),
            'big-noodle-titling': require(FONT_PATH_NAMETYPO),
        });

        await this.checkToken();

        this.setState({ fontLoaded: true });
    }

    async checkToken() {
        var savedToken;

        deviceStorage.loadJWT()        
        .then( token => {
            if ( token ) {
                savedToken = token;
                return fetchToAPI('/auth/me', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                });
            } else {
                throw "Could not find the token";
            }
        })

        .then(response => response.json())

        .then(responseJSON => {
            if (responseJSON.name != undefined) {
                this.initialRouteName = "HomeScreen";
                this.savedToken = savedToken;
                this.setState({
                    tokenLoaded: true
                });
            }
        })

        .catch((err) => {
            this.initialRouteName = "LoginScreen";
            this.setState({
                tokenLoaded: true
            });
            // Nothing should happen if this method fails,
            // simply continue the execution as if the token
            // was not found
        });
    }

    render() {
        if ( this.state.fontLoaded && this.state.tokenLoaded ) {
            var AppNavigator = createStackNavigator({
                LoginScreen: { screen: LoginScreen },
                HomeScreen: { screen: HomeScreen },
                GlobalScreen: { screen: GlobalScreen },
                ChooseChangeScreen: { screen: ChooseChangeScreen },
                MyChangesScreen: { screen: MyChangesScreen },
                ContactsScreen: { screen: ContactsScreen }
            }, {
                initialRouteName: this.initialRouteName,
                headerMode: 'none',
                navigationOptions: {
                    headerVisible: false,
                },
                initialRouteParams: {
                    token: this.savedToken
                }
            });

            const AppContainer = createAppContainer(AppNavigator);

            return (
                <AppContainer></AppContainer>
            )
        } else {
            return (
                <View style={containerStyle}>
                    <PulseIndicator size={layoutStyle.horizontalUnits10*15} color="#067bdb" />
                </View>
            )
        }
    }
}

const containerStyle = {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#bee6ef"
}

