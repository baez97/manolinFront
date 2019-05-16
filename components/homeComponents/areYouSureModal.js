import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, StyleSheet } from 'react-native';
import ModalButton from './buttons/modalButton';
import LayoutStyle from '../../styles/layoutStyle'

export default class AreYouSureModal extends React.Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        this.props.onPressFn(this.props.change);
    }

    render() {
        return (
            <Modal
                isVisible         = { this.props.visible }
                onBackDropPress   = { this.props.closeModal }
                onBackButtonPress = { this.props.closeModal }>
                <View style={styles.modalBackground}>
                    <View style={styles.box}>
                        <Text style={styles.labelText} allowFontScaling={false}>
                            { this.props.text }
                        </Text>
                        <ModalButton 
                            onPressFn = { this.handlePress }
                            color     = "green"
                            text      = "Confirmar"/>
                        
                        <ModalButton 
                            onPressFn = { this.props.closeModal }
                            color     = "blue"
                            text      = "Cancelar"/>
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
        color: "#2990f7",
        textAlign: "center",
        fontSize: LayoutStyle.hugeFontSize,
        marginBottom: LayoutStyle.verticalUnits10
    },
});