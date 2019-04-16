import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, StyleSheet } from 'react-native';
import PhoneButton from './phoneButton';
import WhatsButton from './whatsButton';
import LayoutStyle from '../../styles/layoutStyle';

export default class ContactModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                isVisible       = { this.props.isVisible }
                onBackDropPress = { this.props.hideModal }
                onBackButtonPress = { this.props.hideModal }>
                <View style = { styles.modalBackground }>
                    <View style = { styles.box }>
                        <Text style = { styles.nameText }>
                            { this.props.contact.name  }
                        </Text>
                        <Text style = { styles.phoneText }>
                            { this.props.contact.phone  }
                        </Text>
                        <PhoneButton 
                            hideFn = { this.props.hideModal }
                            phone  = { this.props.contact.phone }/>
                        <WhatsButton
                            hideFn = { this.props.hideModal }
                            phone  = { this.props.contact.phone }/>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    box: {
        width:  LayoutStyle.modalWidth,
        borderRadius: LayoutStyle.borderRadius,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop    : LayoutStyle.verticalUnits10*1.5,
        paddingBottom : LayoutStyle.verticalUnits10*2.5,
        paddingRight  : LayoutStyle.horizontalUnits10*1.5,
        paddingLeft   : LayoutStyle.horizontalUnits10*1.5,
        backgroundColor: "white"
    },

    nameText: {
        fontFamily: "montserrat-extra-bold",
        color: "#1b7128",
        textAlign: "center",
        fontSize: LayoutStyle.hugeFontSize,
        marginBottom: LayoutStyle.verticalUnits10
    },

    phoneText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.primaryFontSize,
        color: '#2db842',
        textAlign: 'left',
    },
})