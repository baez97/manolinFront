import React from 'react';
import { TouchableOpacity, Text, Linking, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import layoutStyle from '../styles/layoutStyle'

export default class HelpButton extends React.Component {
    handlePress() {
        Linking.openURL("https://baezsoriano97.wixsite.com/manolin/soporte");
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
                    <LinearGradient
                        style  = { styles.buttonStyle }
                        colors = { ["#fff", "#f2f2f2"] }
                        start  = { [0.55, 0] }
                        end    = { [0.65, 1] }>
                        <Text style={ styles.textStyle }>
                            { this.props.text }
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: layoutStyle.borderRadius*1.5,
        height: layoutStyle.mediumHeight*0.6,
        alignItems:"center",
        justifyContent: "center",
        paddingLeft: layoutStyle.horizontalUnits10*3,
        paddingRight: layoutStyle.horizontalUnits10*3,
        elevation: 3
    },

    textStyle: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: layoutStyle.tinyFontSize*0.8,
        color: "#23538a"
    }
})