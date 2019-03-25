import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';

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
        .then( response => response.json())
        .then( user     => {
            this.setState({
                user: user,
                userLoaded: true
            });
        })
        .catch( err => console.log(err) )
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
                <View style={ styles.container }>
                    <Text>Mi turno</Text>
                    <Text>{this.state.user.name}</Text>
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
        backgroundColor: '#bee6ef',
        alignItems: 'center',
        justifyContent: 'center',
    }
})