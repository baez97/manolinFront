import React from 'react';
import { LinearGradient } from 'expo';
import { StyleSheet, Image, Text, View, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
// const BACKEND_IP = "https://manolin-backend.herokuapp.com";
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
                    <Text style={styles.labelText}>Mi turno</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <LinearGradient
                            style={{ ...styles.primaryButton, ...styles.fullWidth }}
                            colors={['#10bad2', '#0470dc']}
                            start={[0.55, 0]}
                            end={[0.65, 1]}>
                            <Text style={styles.primaryButtonText}>
                                VER TURNO GLOBAL
                            </Text>
                            <Image source={require('../assets/calendar.png')} style={styles.calendarImage}></Image>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{ width: 400, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => { }}>
                            <LinearGradient
                                style={{ ...styles.secondaryButton, ...styles.midWidth }}
                                colors={['#ffcc33', '#f2994a']}
                                start={[0.55, 0]}
                                end={[0.65, 1]}>
                                <Text style={{ ...styles.buttonText, color: '#3f2606' }}>
                                    MIS CAMBIOS
                            </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}>
                            <LinearGradient
                                style={{ ...styles.secondaryButton, ...styles.midWidth }}
                                colors={['#10bad2', '#0470dc']}
                                start={[0.55, 0]}
                                end={[0.65, 1]}>
                                <Text style={styles.buttonText}>
                                    OPCIONES
                            </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.labelText}>Peticiones de cambio</Text>

                </View>
            )
        }
    }
    // render() {
    //   return (
    //     <View style={styles.container}>
    //       <ScrollView>
    //         <FlatList
    //           data={this.state.hello.turnWithDates}
    //           horizontal={true}
    //           renderItem={({ item }) => {
    //             return (<Text> {item.turn} </Text>)
    //           }}
    //         />
    //       </ScrollView>
    //     </View>
    //   )
    // }
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

    primaryButton: {
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // marginLeft: 40,
        // marginRight: 40,
        marginTop: 20,
        // marginBottom: 20,
        elevation: 15,
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    secondaryButton: {
        borderRadius: 20,
        // marginLeft: 40,
        // marginRight: 40,
        marginTop: 25,
        // marginBottom: 20,
        elevation: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    fullWidth: {
        width: 400,
        height: 120
    },

    midWidth: {
        width: 190,
        height: 80
    },

    buttonText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'left'
    },

    primaryButtonText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: 21,
        color: 'white',
        textAlign: 'left',
        marginTop: 10,
    },

    labelText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: 22,
        color: '#332554',
        textAlign: 'left',
        width: 390,
        marginTop: 30
    },

    calendarImage: {
        height: 100,
        width: 100,
        marginTop: 0
    }
});