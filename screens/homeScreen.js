import React from 'react';
import { LinearGradient } from 'expo';
import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import GlobalButton    from '../components/homeComponents/globalButton';
import MidYellowButton from '../components/homeComponents/midYellowButton';
import MidBlueButton   from '../components/homeComponents/midBlueButton';
import TurnDeck        from '../components/homeComponents/turnDeck';
import ChangesQueue    from '../components/homeComponents/changes/changesQueue';
import { BACKEND_IP } from '../config';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoaded: false,
            error: false
        }
    }

    async componentDidMount() {
        const token = this.getNavigationParam("token");
        return fetch(BACKEND_IP + '/auth/me', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
            .then(response => response.json())
            .then(user => {
                this.setState({
                    user: user,
                    userLoaded: true
                });
            })
            .catch(err => {
                this.setState({
                    error: true
                })
            });
    }

    getNavigationParam(key, defValue) {
        return this.props.navigation.getParam(key, defValue);
    }

    globalButtonPressed() {
        this.props.navigation.navigate(
            "GlobalScreen", 
            {token: this.getNavigationParam("token")}
        );
    }

    myChangesButtonPressed() {
        // NOT IMPLEMENTED YET!
    }

    contactsButtonPressed() {
        // NOT IMPLEMENTED YET!
    }


    render() {
        if ( this.state.error ) {
            return ( 
                <View style={styles.container}>
                    <Text> Se ha producido un error </Text>
                </View>
            )
        } else if ( !this.state.userLoaded ) {
            return (
                <View style={styles.container}>
                    <Text> Cargando... </Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <TurnDeck turnWithDates={this.state.user.turnWithDates}/>

                    <GlobalButton text="VER TURNO GLOBAL" onPressFn={() => {
                        this.globalButtonPressed();
                    }}/>
                    <View style={{ width: 400, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MidYellowButton text="MIS CAMBIOS" onPressFn={() => {
                            this.myChangesButtonPressed();
                        }}/>
                        <MidBlueButton text="CONTACTOS" onPressFn={()=>{
                            this.contactsButtonPressed();
                        }}/>
                    </View>

                    <Text style={styles.labelText}>Peticiones de cambio</Text>
                    <ChangesQueue token={this.getNavigationParam("token")}/>

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#bee6ef',
        paddingTop:10
    },

    labelText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: 22,
        color: '#3b2868',
        textAlign: 'left',
        width: 390,
        marginTop: 30
    },
});