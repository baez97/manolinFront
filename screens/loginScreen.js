import React         from 'react';
import styles        from '../styles/loginBoxStyle';
import PrimaryButton from '../components/loginComponents/primaryButtonComponent';
import RoundedInput  from '../components/loginComponents/inputComponent';
import deviceStorage from '../components/deviceStorage';

import { Text, View, KeyboardAvoidingView  } from 'react-native';
import { LinearGradient, Font              } from 'expo';
import { SCLAlert, SCLAlertButton          } from 'react-native-scl-alert';
import { StackActions, NavigationActions   } from 'react-navigation';
import { BACKEND_IP } from '../config';

const FONT_PATH  = "../assets/fonts/Montserrat-ExtraBold.otf";

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            error: false, 
            errorType: "danger", 
            errorTitle: "", 
            errorMessage: "", 
            fontLoaded: false };
    }

    async componentDidMount() {
        await this.checkToken();
        await Font.loadAsync({
            'montserrat-extra-bold': require(FONT_PATH),
        });

        this.setState({ fontLoaded: true });
    }

    async loginPressed() {
        // Continue only if both (username and password) are fulfilled.
        // testInput method will show the corresponding error if they
        // are not.
        if ( !this.testInput() ) {
            return;
        }

        var savedToken;

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

        .then( response => response.json())

        .then( responseJson => {
            if ( responseJson.userError ) {
                this.showError({
                    title   : "Usuario incorrecto", 
                    message : "La usuario que has introducido no es correcto"
                });
                throw "The username is not correct";
            } else if ( responseJson.passwordError ) {
                this.showError({
                    title   : "Contraseña incorrecta", 
                    message : "La contraseña que has introducido no es correcta"
                });
                throw "The password is not correct";
            }

            token = responseJson.token;

            // Everything was correct, so save the token in the device
            return deviceStorage.saveJWT(token, 
                    this.state.username);
        })

        .then(() => {
            // If the login was correct, navigate to the Home Screen, but
            // remove the LoginScreen from the stack of navigation so if
            // the user presses the "BACK" button, the application will
            // exit instead of going back to the login screen. This is done
            // in the goToHomeScreen custom method.
            this.goToHomeScreen(token);
        })

        .catch( err => {
            // Any login error will be shown to the user with an Alert.
            this.showError(err.message);
        });
    }

    checkToken() {
        var savedToken;

        deviceStorage.loadJWT()        
        .then( token => {
            if ( token ) {
                savedToken = token;
                return fetch(BACKEND_IP + '/auth/me', {
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
                this.goToHomeScreen(savedToken);
            }
        })

        .catch((err) => {
            console.log(err.message);
        });
    }

    goToHomeScreen(savedToken) {
        const action = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName : "HomeScreen", 
                    params    : {
                        token: savedToken
                    }
                })
            ]
        });

        this.props.navigation.dispatch(action);
    }

    testInput() {
        var { username, password } = this.state;

        if ( username == undefined || username.length === 0 ) {
            this.showWarning({
                title   : "Nombre vacío",
                message : "Debes introducir el nombre para continuar"
            });
            return false;
        } else if ( password == undefined || password.length === 0 ) {
            this.showWarning({
                title   : "Contraseña vacía", 
                message : "Debes introducir la contraseña para continuar"
            });
            return false;
        }

        return true;
    }

    render() {
        if (this.state.fontLoaded) {
            return (
                <KeyboardAvoidingView style={ styles.container } 
                    behavior="padding">

                    <LinearGradient colors={['#10bad2', '#2685e4']} 
                        style = {{ justifyContent: 'center' }}
                        start = { [0, 0] }
                        end   = { [1, 1] }
                        style = { styles.blueBox }>

                        <RoundedInput text   = "Usuario"
                            secureTextEntry  = { false }
                            onChangeFunction = { inputText => { 
                                this.setState({ username: inputText }) 
                            }} />

                        <RoundedInput text   = "Contraseña"
                            secureTextEntry  = { true }
                            onChangeFunction = { inputText => { 
                                this.setState({ password: inputText }) 
                            }} />

                        <PrimaryButton text = "Iniciar sesión"
                            onPressFunction = { () => { 
                                this.loginPressed() 
                            }} />

                    </LinearGradient>

                    <SCLAlert
                        them     = { this.state.errorType    }
                        show     = { this.state.error        }
                        title    = { this.state.errorTitle   }
                        subtitle = { this.state.errorMessage }
                        onRequestClose = { () => {} }
                        cancellable    = { true     }>

                        <SCLAlertButton 
                            theme   = { this.state.errorType       } 
                            onPress = { () => { this.hideError() } }>
                            Vale
                        </SCLAlertButton>

                    </SCLAlert>
                </KeyboardAvoidingView>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text>Cargando...</Text>
                </View>
            )
        }
    }

    showError({title, message}) {
        this.setState({
            error        : true,
            errorType    : "danger",
            errorTitle   : title,
            errorMessage : message
        });
    }

    showWarning({title, message}) {
        this.setState({
            error        : true,
            errorType    : "warning",
            errorTitle   : title,
            errorMessage : message
        });
    }

    hideError() {
        this.setState({
            error        : false,
            errorTitle   : "",
            errorMessage : ""
        });
    }
}
