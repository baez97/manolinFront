import React from 'react';
import { LinearGradient } from 'expo';
import { StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

export default class MidBlueButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <TouchableOpacity onPress={this.props.onPressFn}>
            <LinearGradient
                style={styles.midBlueButton}
                colors={['#10bad2', '#0470dc']}
                start={[0.55, 0]}
                end={[0.65, 1]}>
                <Text style={styles.buttonText}>
                    {this.props.text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    midBlueButton: {
        borderRadius: 20,
        marginTop: 20,
        elevation: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 190,
        height: 80
    },

    buttonText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'left'
    },
});