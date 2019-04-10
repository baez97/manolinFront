import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';
import LayoutStyle from '../../styles/layoutStyle'
import ModalButton from './buttons/modalButton'
import layoutStyle from '../../styles/layoutStyle';
export default class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                isVisible         = { this.props.visible }
                onBackDropPress   = { this.props.closeModal }>
                <View style={styles.modalBackground}>
                    <View style={styles.box}>
                        <Text style={styles.labelText}>
                            Petición enviada
                        </Text>
                        <Image 
                            style={styles.confirmationImg}
                            source={ require('../../assets/check.gif')} />
                        <ModalButton 
                            onPressFn = { this.props.closeModal }
                            color     = "green"
                            text      = "Okey"/>
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

    labelText: {
        fontFamily: "montserrat-extra-bold",
        color: "#03a73a",
        textAlign: "center",
        fontSize: LayoutStyle.hugeFontSize,
        marginBottom: LayoutStyle.verticalUnits10
    },

    confirmationImg: {
        height: layoutStyle.verticalUnits10 * 20,
        width:  layoutStyle.horizontalUnits10 * 20
    }

});