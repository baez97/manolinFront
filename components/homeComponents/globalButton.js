import React from 'react';
import { LinearGradient } from 'expo';
import { StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

export default class GlobalButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <TouchableOpacity onPress={this.props.onPressFn}>
            <LinearGradient
                style={styles.globalButton}
                colors={['#10bad2', '#2990f7']}
                start={[0.55, 0]}
                end={[0.65, 1]}>
                <Text style={styles.buttonText}>
                    {this.props.text}
                </Text>
                <Image source={require('../../assets/calendar.png')} style={styles.calendarImage}></Image>
            </LinearGradient>
        </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    globalButton: {
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        elevation: 15,
        width: 400,
        height: 120
    },

    buttonText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: 21,
        color: 'white',
        textAlign: 'left',
        marginTop: 10,
    },

    calendarImage: {
        height: 100,
        width: 100,
    }
});