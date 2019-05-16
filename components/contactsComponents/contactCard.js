import React from 'react';
import { LinearGradient } from 'expo';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import LayoutStyle from '../../styles/layoutStyle';

export default class ContactCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleLongPress = this.handleLongPress.bind(this);
        this.handlePress     = this.handlePress.bind(this);
    }

    handleLongPress() {
        Linking.openURL("https://wa.me/34"+this.props.contact.phone);
    }

    handlePress() {
        this.props.onPressFn(this.props.contact);
    }
    
    render() {
        return (
            <TouchableOpacity 
                onPress={this.handlePress}
                onLongPress={this.handleLongPress}>
                <LinearGradient
                    style={styles.contactCard}
                    colors={['#fff', '#eeeeee']}
                    start={[0.55, 0]}
                    end={[0.65, 1]}>
                    <View style={styles.column}>
                        <Text style={styles.buttonText} allowFontScaling={false}>
                            {this.props.contact.name}
                        </Text>
                        <Text style={styles.phoneText} allowFontScaling={false}>
                            {this.props.contact.phone}
                        </Text>
                    </View>
                    <Image 
                        source={require('../../assets/whatsapp.png')} 
                        style={styles.whatsappImage}
                        resizeMode="contain"/>
                </LinearGradient>
            </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        paddingTop:   LayoutStyle.verticalUnits10 * 0.5,
        paddingBottom: LayoutStyle.verticalUnits10 * 0.5,
        paddingLeft:  LayoutStyle.horizontalUnits10 * 3
    },

    contactCard: {
        paddingRight: LayoutStyle.horizontalUnits10,
        borderRadius: LayoutStyle.borderRadius,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: LayoutStyle.verticalUnits10,
        elevation: 5,
        width: LayoutStyle.maxWidth * 0.9,
        height: LayoutStyle.mediumHeight * 1.2
    },

    buttonText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.primaryFontSize,
        color: '#1b7128',
        textAlign: 'left',
        // marginTop: LayoutStyle.verticalUnits10,
    },

    phoneText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.tinyFontSize,
        color: '#2db842',
        textAlign: 'left',
        // marginTop: LayoutStyle.verticalUnits10,
    },

    whatsappImage: {
        height: LayoutStyle.imageHeight,
        width: LayoutStyle.imageWidth
    }
});