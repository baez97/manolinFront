import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import LayoutStyle from '../../../styles/layoutStyle';
const gradientProps = {
    blue : {
        colors : ['#10bad2', '#0470dc'],
        start  : [0.55, 0],
        end    : [0.65, 1],
        margin : LayoutStyle.verticalUnits10*3.5
    },
    purple : {
        colors : ['#884ec5', '#3425af'],
        start  : [0.7, 0],
        end    : [0.8, 1],
        margin : LayoutStyle.verticalUnits10*1.5
    }
}

export default class ModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.gradientProps = gradientProps[this.props.color];
    }

    render() {
        const { colors, start, end, margin } = this.gradientProps;
        const buttonStyle = { 
            ...styles.gradient, 
            marginTop: margin 
        };
        
        return (
            <TouchableOpacity onPress={this.props.onPressFn}>
                <LinearGradient
                    style  ={ buttonStyle }
                    colors ={ colors }
                    start  ={ start  }
                    end    ={ end    }>
                    <Text style={ styles.buttonText }>
                        { this.props.text }
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.primaryFontSize,
        color: 'white',
        textAlign: 'center'
    },

    gradient: {
        borderRadius: LayoutStyle.borderRadius,
        marginTop: LayoutStyle.verticalUnits10*2,
        elevation: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: LayoutStyle.modalButtonWidth,
        height: LayoutStyle.modalButtonHeight
    }
})