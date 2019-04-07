import React from 'react';

import { LinearGradient } from 'expo';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import DateUtils from '../../dateUtils';
const { weekdays, months } = new DateUtils();

export default class ChangeView extends React.Component {
    constructor(props) {
        super(props);
    }

    getDateString(change) {
        const { day, month, weekday } = change;
        const weekdayString = weekdays[weekday -1];
        const monthString   = months[month -1];

        return `${weekdayString} ${day} de ${monthString}`;
    }

    getType(change) {
        const { type } = change;
        if ( type === "change" )
            return "Cambio";
        else if ( type === "free" )
            return "Librar";
        return "";
    }

    render() {
        const change = this.props.change;

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPressFn}>
                <LinearGradient
                    style={styles.changeBox}
                    colors={['#884ec5', '#3425af']}
                    start={[0.7, 0]}
                    end={[0.8, 1]}>
                        <View>
                            <Text style={styles.primaryText}>
                                {this.getDateString(change)}
                            </Text>
                            <View style={styles.changeDataContainer}>
                                <Text style={styles.secondaryText}>
                                    { change.owner }
                                </Text>
                                <Text style={styles.secondaryText}>
                                    { this.getType(change) }
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.turnText}>
                            T
                        </Text>
                </LinearGradient>
            </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    container: {
        elevation: 15
    },

    changeBox: {
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingLeft:  30,
        paddingRight: 40,
        elevation: 15,
        width: 400,
        height: 100
    },

    changeDataContainer: {
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-between'
    },

    turnText: {
        marginTop: -5,
        fontFamily: 'montserrat-extra-bold',
        fontSize: 60,
        color: 'white',
        textAlign: 'center',
    },

    primaryText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: 21,
        color: 'white',
        textAlign: 'left',
    },

    secondaryText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: 18,
        color: '#cfbcf9',
        textAlign: 'left',
        marginTop: 8
    },

    changeImage: {
        height: 100,
        width: 100,
    }
})