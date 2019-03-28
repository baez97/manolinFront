import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';

export default class RoundedInput extends React.Component {
    constructor ( props ) {
        super(props);
    }

    render() {
        return (
            <View>
              <Text style={styles.label}>{this.props.text}</Text>
              <TextInput style={styles.userInput} onChangeText={(text) => this.props.onChangeFunction(text)}
                secureTextEntry={this.props.secureTextEntry}></TextInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 10,
        fontFamily: 'montserrat-extra-bold',
        color: 'white',
        fontSize: 20
    },
    userInput: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: 360,
        fontFamily: 'montserrat-extra-bold',
        color: 'black',
        fontSize: 20
    },
})