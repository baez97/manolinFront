import React from 'react';
import { TouchableOpacity, Text, Image, Linking } from 'react-native';
import { LinearGradient } from 'expo';
import LayoutStyle from '../../styles/layoutStyle';

export default class ContactButton extends React.Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        Linking.openURL(this.urlString + this.props.phone)
    }

    text="abstractButton";
    urlString = "abstractUrl";

    getColors() {
        return [];
    }

    getImage() {
        return undefined;
    }

    getImageStyle() {
        return {
            height : LayoutStyle.verticalUnits10   * 8,
            width  : LayoutStyle.horizontalUnits10 * 8
        }
    }
    
    getButtonStyle() {
        return {
            borderRadius   : LayoutStyle.borderRadius,
            marginTop      : LayoutStyle.verticalUnits10*2,
            elevation      : 15,
            flexDirection  : 'row',
            alignItems     : 'center',
            justifyContent : 'space-between',
            width          : LayoutStyle.modalButtonWidth * 1.2,
            paddingLeft    : LayoutStyle.horizontalUnits10 * 2,
            paddingRight   : LayoutStyle.horizontalUnits10 * 2,
            paddingTop     : LayoutStyle.verticalUnits10,
            paddingBottom  : LayoutStyle.verticalUnits10,
            // margin         : LayoutStyle.verticalUnits10*3.5
        }
    }

    getTextStyle() {
        return {
            fontFamily : 'montserrat-extra-bold',
            fontSize   : LayoutStyle.primaryFontSize,
            color      : 'white',
            textAlign  : 'center'
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <LinearGradient
                    style  = { this.getButtonStyle() }
                    colors = { this.getColors() }
                    start  = { [0.55, 0] }
                    end    = { [0.65, 1] }>
                    <Text style={ this.getTextStyle() } allowFontScaling={false}>
                        { this.text }
                    </Text>
                    <Image 
                        source = { this.getImage() }
                        style  = { this.getImageStyle() }
                        resizeMode = "contain"/>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}