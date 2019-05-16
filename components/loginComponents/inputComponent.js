import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import LayoutStyle from '../../styles/layoutStyle';
export default class RoundedInput extends React.Component {
    constructor ( props ) {
        super(props);
    }

    render() {
        return (
            <View>
              <Text style={styles.label} allowFontScaling={false}>{this.props.text}</Text>
              <TextInput style={styles.userInput} onChangeText={(text) => this.props.onChangeFunction(text)}
                secureTextEntry={this.props.secureTextEntry}></TextInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        marginBottom : LayoutStyle.verticalUnits10,
        marginTop    : LayoutStyle.verticalUnits10*2,
        marginLeft   : LayoutStyle.horizontalUnits10,
        fontFamily   : 'montserrat-extra-bold',
        color        : 'white',
        fontSize     : LayoutStyle.smallFontSize
    },
    userInput: {
        paddingTop      : LayoutStyle.verticalUnits10*2,
        paddingBottom   : LayoutStyle.verticalUnits10*2,
        paddingRight    : LayoutStyle.horizontalUnits10*2,
        paddingLeft     : LayoutStyle.horizontalUnits10*2,
        backgroundColor : 'white',
        borderRadius    : LayoutStyle.borderRadius,
        width           : LayoutStyle.inputWidth,
        fontFamily      : 'montserrat-extra-bold',
        color           : 'black',
        fontSize        : LayoutStyle.smallFontSize
    },
})