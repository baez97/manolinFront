import React from 'react';

import { LinearGradient } from 'expo';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import DateUtils from '../../dateUtils';
const dateUtils = new DateUtils();
import LayoutStyle from '../../../styles/layoutStyle';
import FreeBox from '../changes/freeBox';
import ChangeBox from '../changes/changeBox';

export default class ChangeView extends React.Component {
    constructor(props) {
        super(props);
        this.handleLongPress = this.handleLongPress.bind(this);
    }

    getType(change) {
        const { type } = change;
        if ( type === "change" )
            return "Cambio";
        else if ( type === "free" )
            return "Librar";
        return "";
    }

    handleLongPress() {
        this.props.onPressFn(this.props.change);
    }

    render() {
        if ( this.props.change.type === "free") {
            return (
                <FreeBox 
                    change        = { this.props.change        }
                    freeOnPress   = { this.props.freeOnPress   }
                    changeOnPress = { this.props.changeOnPress } />
            )
        } else if ( this.props.change.type === "change" ) {
            return (
                <ChangeBox 
                    change        = { this.props.change        }
                    freeOnPress   = { this.props.freeOnPress   }
                    changeOnPress = { this.props.changeOnPress } />
            )
        } else {
            return null;
        }
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

    // changeImage: {
    //     height: 100,
    //     width: 100,
    // }
})