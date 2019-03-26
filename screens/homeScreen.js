import React from 'react';
import { LinearGradient } from 'expo';
import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import GlobalButton from '../components/homeComponents/globalButton';
import MidYellowButton from '../components/homeComponents/midYellowButton';
import MidBlueButton from '../components/homeComponents/midBlueButton';
import TurnDeck from '../components/homeComponents/turnDeck';
// const BACKEND_IP = "https://manolin-backend.herokuapp.com";
// const BACKEND_IP = "http://192.168.1.35:5000";
const BACKEND_IP = "http://192.168.43.205:5000";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoaded: false
        }
    }

    async componentDidMount() {
        const token = this.getNavigationParam("token");
        fetch(BACKEND_IP + '/auth/me', {
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
            .catch(err => console.log(err))
    }

    getNavigationParam(key, defValue) {
        return this.props.navigation.getParam(key, defValue);
    }


    render() {
        if (!this.state.userLoaded) {
            return (
                <View style={styles.container}>
                    <Text> Cargando... </Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    {/* <Text style={styles.labelText}>Mi turno</Text> */}

                    <TurnDeck turnWithDates={this.state.user.turnWithDates}/>

                    <GlobalButton text="VER TURNO GLOBAL" onPressFn={() => {
                        console.log("PRESSED")
                    }}/>
                    <View style={{ width: 400, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MidYellowButton text="MIS CAMBIOS" onPressFn={() => {
                            console.log("PRESSED");
                        }}/>
                        <MidBlueButton text="CONTACTOS" onPressFn={()=>{
                            console.log("PRESSED!");
                        }}/>
                    </View>

                    <Text style={styles.labelText}>Peticiones de cambio</Text>

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
        color: '#332554',
        textAlign: 'left',
        width: 390,
        marginTop: 30
    },
});