import React from 'react';
import Modal from 'react-native-modal';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import ModalButton from './buttons/modalButton';
import DateUtils from '../dateUtils';
const dateUtils = new DateUtils();
import LayoutStyle from '../../styles/layoutStyle';

export default class AskChangeModal extends React.Component {
    constructor(props) {
        super(props);
        this.askChangePressed = this.askChangePressed.bind(this);
    }

    askChangePressed() {
        this.props.addChange(this.props.selectedTurn, "change");
    }

    render() {
        return (
            <Modal
                isVisible={this.props.isModalVisible}
                onBackdropPress={this.props.toggleModal}>
                <View style={styles.modalBackground}>
                    <View style={styles.box}>
                        <Text style={styles.labelText}>
                            { dateUtils.getDateString(this.props.selectedTurn) }
                        </Text>
                        <ModalButton 
                            onPressFn = { this.askChangePressed }
                            color     = "purple"
                            text      = "Pedir cambio"/>
                        <ModalButton 
                            onPressFn = { this.props.toggleModal }
                            color     = "purple"
                            text      = "Pedir libre"/>
                        <ModalButton 
                            onPressFn = { this.props.toggleModal }
                            color     = "blue"
                            text      = "Cancelar"/>
                        {/* <TouchableOpacity 
                            style={{
                                width: 300, 
                                height:100, 
                                backgroundColor:'black'
                            }} 
                            onPress={this.props.toggleModal}>
                            <Text style={{color:"white"}}>Hide!</Text>
                        </TouchableOpacity> */}
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
        color: "#0470dc",
        textAlign: "center",
        fontSize: LayoutStyle.hugeFontSize,
        marginBottom: LayoutStyle.verticalUnits10
    },

});