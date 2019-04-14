import React from 'react';

import { LinearGradient } from 'expo';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateUtils from '../../dateUtils';
const  dateUtils = new DateUtils();
import LayoutStyle from '../../../styles/layoutStyle';

export default class ChangeBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleLongPress = this.handleLongPress.bind(this);
        this.getColors       = this.getColors.bind(this);
    }

    getType() {
        return "Cambio";
    }

    handleLongPress() {
        this.props.changeOnPress(this.props.change);
    }

    getColors() {
        return ['#884ec5', '#3425af']
    }

    getPrimaryFontColor() {
        return 'white';
    }

    getSecondaryFontColor() {
        return '#cfbcf9'
    }

    render() {
        const change = this.props.change;

        return (
            <TouchableOpacity 
                style       = { styles.container     } 
                onLongPress = { this.handleLongPress }>
                <LinearGradient
                    style  = { styles.changeBox }
                    colors = { this.getColors() }
                    start  = { [0.7, 0] }
                    end    = { [0.8, 1] }>
                        <View>
                            <Text style={{
                                ...styles.primaryText,
                                color: this.getPrimaryFontColor() 
                                }}>
                                { dateUtils.getDateString(change) }
                            </Text>
                            <View style={ styles.changeDataContainer }>
                                <Text style={{
                                    ...styles.secondaryText, 
                                    color: this.getSecondaryFontColor() 
                                    }}>
                                    { change.owner }
                                </Text>
                                <Text style={{
                                    ...styles.secondaryText, 
                                    color: this.getSecondaryFontColor() 
                                    }}>
                                    { this.getType() }
                                </Text>
                            </View>
                        </View>
                        <Text style={{
                            ...styles.turnText, 
                            // color: this.getFontColor() 
                            }}>
                            { change.turn }
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
        paddingTop:    LayoutStyle.verticalUnits10*2,
        paddingBottom: LayoutStyle.verticalUnits10*2,
        paddingRight:  LayoutStyle.horizontalUnits10*2,
        paddingLeft:   LayoutStyle.horizontalUnits10*2,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: LayoutStyle.verticalUnits10,
        marginLeft: LayoutStyle.horizontalUnits10,
        marginRight: LayoutStyle.horizontalUnits10,
        marginBottom: 0,
        paddingLeft:  LayoutStyle.horizontalUnits10*3,
        paddingRight: LayoutStyle.horizontalUnits10*4,
        elevation: 10,
        width: LayoutStyle.maxWidth,
        height: LayoutStyle.imageHeight
    },

    changeDataContainer: {
        flexDirection: 'row',
        width: LayoutStyle.mediumWidth,
        justifyContent: 'space-between'
    },

    turnText: {
        marginTop: -5,
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.largeFontSize,
        color: 'white',
        textAlign: 'center',
    },

    primaryText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.primaryFontSize,
        color: 'white',
        textAlign: 'left',
    },

    secondaryText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.tinyFontSize,
        color: '#cfbcf9',
        textAlign: 'left',
        marginTop: 8
    },
})