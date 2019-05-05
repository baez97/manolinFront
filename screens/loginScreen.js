import React         from 'react';
import styles        from '../styles/loginBoxStyle';
import PrimaryButton from '../components/loginComponents/primaryButtonComponent';
import HelpButton    from '../components/helpButton';
import RoundedInput  from '../components/loginComponents/inputComponent';
import deviceStorage from '../components/deviceStorage';
import fetchToAPI    from '../components/fetchToAPI';

import { Text, View, Image, KeyboardAvoidingView } from 'react-native';
import { LinearGradient, Font              } from 'expo';
import { SCLAlert, SCLAlertButton          } from 'react-native-scl-alert';
import { StackActions, NavigationActions   } from 'react-navigation';
import layoutStyle from '../styles/layoutStyle';
const FONT_PATH_MAINTYPO  = "../assets/fonts/Montserrat-ExtraBold.otf";
const FONT_PATH_NAMETYPO  = "../assets/fonts/big_noodle_titling.ttf";

// const FAQ_URL = "https://baezsoriano97.wixsite.com/manolin/soporte";

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            error: false, 
            errorType: "danger", 
            errorTitle: "", 
            errorMessage: "", 
            fontLoaded: false };
        this.showError    = this.showError.bind(this);
        this.hideError    = this.hideError.bind(this);
        this.setUsername  = this.setUsername.bind(this);
        this.setPassword  = this.setPassword.bind(this);
        this.loginPressed = this.loginPressed.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
            'montserrat-extra-bold' : require(FONT_PATH_MAINTYPO),
            'big-noodle-titling'    : require(FONT_PATH_NAMETYPO),
        });
        // await this.checkToken();

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

        return fetchToAPI('/auth/login', {
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
            if ( err.message === "Network request failed" ) {
                this.showError({
                    title: "Ha habido un error",
                    message: "No hay Internet"
                });
            } else {
                // Any login error will be shown to the user with an Alert.
                this.showError({
                    title: "Ha habido un error",
                    message: err
                });
            }
        });
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
                this.goToHomeScreen(savedToken);
            }
        })

        .catch((err) => {
            // Nothing should happen if this method fails,
            // simply continue the execution as if the token
            // was not found
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

    setUsername(input) {
        this.setState({username: input});
    }

    setPassword(input) {
        this.setState({password: input});
    }

    render() {
        if (this.state.fontLoaded) {
            return (
            <View style={ styles.container }>
                <KeyboardAvoidingView 
                    behavior="position">
                    <View style={{alignItems: "center"}}>
                        <Image source={require('../assets/icon.png')} style={styles.image} />
                    </View>

                    <LinearGradient colors={['#10bad2', '#2685e4']} 
                        style = {{ justifyContent: 'center' }}
                        start = { [0, 0] }
                        end   = { [1, 1] }
                        style = { styles.blueBox }>

                        <RoundedInput text   = "Usuario"
                            secureTextEntry  = { false }
                            onChangeFunction = { this.setUsername }
                            />

                        <RoundedInput text   = "Contraseña"
                            secureTextEntry  = { true }
                            onChangeFunction = { this.setPassword } 
                            />

                        <PrimaryButton text = "Iniciar sesión"
                            onPressFunction = { this.loginPressed }/>

                    </LinearGradient>

                </KeyboardAvoidingView>
                <View style={{
                    height: layoutStyle.globalHeight, 
                    justifyContent: "space-around", 
                    marginTop: layoutStyle.verticalUnits10*2}
                    }>
                    <HelpButton text="No tengo cuenta"/>
                    <HelpButton text="Ayuda"/>
                </View>

                <SCLAlert
                    them     = { this.state.errorType    }
                    show     = { this.state.error        }
                    title    = { this.state.errorTitle   }
                    subtitle = { this.state.errorMessage }
                    onRequestClose = { () => {} }
                    cancellable    = { true     }>

                    <SCLAlertButton 
                        theme   = { this.state.errorType } 
                        onPress = { this.hideError       }>
                        Vale
                    </SCLAlertButton>

                </SCLAlert>
            </View>
            
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.loadingText}>Cargando...</Text>
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
