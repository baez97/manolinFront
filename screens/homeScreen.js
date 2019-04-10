import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SocketIOClient from 'socket.io-client';

import GlobalButton    from '../components/homeComponents/buttons/globalButton';
import MidYellowButton from '../components/homeComponents/buttons/midYellowButton';
import MidBlueButton   from '../components/homeComponents/buttons/midBlueButton';
import TurnDeck        from '../components/homeComponents/turnDeck';
import ChangesQueue    from '../components/homeComponents/changes/changesQueue';
import AskChangeModal  from '../components/homeComponents/askChangeModal';
import ConfirmModal    from '../components/homeComponents/confirmModal';
import { BACKEND_IP }  from '../config';
import layoutStyle from '../styles/layoutStyle';


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoaded: false,
            error: false,
            isModalVisible: false,
            confirmDisplayed: false
        }
        this.token             = this.getNavigationParam("token");
        this.selectedTurn      = {};
        this.selectTurn        = this.selectTurn.bind(this);
        this.toggleModal       = this.toggleModal.bind(this);
        this.addChange         = this.addChange.bind(this);
        this.addFree           = this.addFree.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.socket            = SocketIOClient(BACKEND_IP);
        this.socket.on("turnsUpdate", () => {
            this.loadTurns();
        });
    }

    loadTurns() {
        this.fetchToAPI('/auth/me', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.token
            }
        })
        .then(response => response.json())
        .then(user => {
            this.setState({
                user: user,
                userLoaded: true
            });
        })
        .catch(err => {
            this.setState({
                error: true
            })
        });
    }

    async componentDidMount() {
        return this.loadTurns();
    }

    fetchToAPI(urlString, options) {
        return fetch(BACKEND_IP + urlString, options);
    }

    addFree({day, weekday, month, year, turn}) {
        const free = {
            day,
            weekday,
            month,
            year,
            turn,
            owner: this.state.user.name,
            type: "free",
            accepted: false,
            purposes: [],
        }

        this.socket.emit("insertFree", free);
        this.toggleModal();
        this.showConfirmation();
    }

    addChange({day, weekday, month, year, turn}) {
        const change = {
            day,
            weekday,
            month,
            year,
            turn,
            owner: this.state.user.name,
            type: "change",
            accepted: false,
            purposes: [],
        }

        this.socket.emit("insertChange", change);
        this.toggleModal();
        this.showConfirmation();
    }

    showConfirmation() {
        this.setState({
            confirmDisplayed: true
        })
    }

    closeConfirmModal() {
        this.setState({
            confirmDisplayed: false
        })
    }

    toggleModal() {
        this.setState({ 
            isModalVisible: !this.state.isModalVisible 
        });
    }

    selectTurn(turn) {
        this.selectedTurn = turn;
        this.toggleModal();
    }

    getNavigationParam(key, defValue) {
        return this.props.navigation.getParam(key, defValue);
    }

    globalButtonPressed() {
        this.props.navigation.navigate(
            "GlobalScreen", 
            {token: this.token}
        );
    }

    myChangesButtonPressed() {
        this.showConfirmation();
    }

    contactsButtonPressed() {
        // NOT IMPLEMENTED YET
    }

    


    render() {
        if ( this.state.error ) {
            return ( 
                <View style={styles.container}>
                    <Text> Se ha producido un error </Text>
                </View>
            )
        } else if ( !this.state.userLoaded ) {
            return (
                <View style={styles.container}>
                    <Text> Cargando... </Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <TurnDeck selectTurn={this.selectTurn} turnWithDates={this.state.user.turnWithDates}/>

                    <GlobalButton text="VER TURNO GLOBAL" onPressFn={() => {
                        this.globalButtonPressed();
                    }}/>
                    <View style={{ width: layoutStyle.maxWidth, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MidYellowButton text="MIS CAMBIOS" onPressFn={() => {
                            this.myChangesButtonPressed();
                        }}/>
                        <MidBlueButton text="CONTACTOS" onPressFn={()=>{
                            this.contactsButtonPressed();
                        }}/>
                    </View>

                    <Text style={styles.labelText}>Peticiones de cambio</Text>
                    <ChangesQueue socket={this.socket} token={this.token}/>
                    <AskChangeModal 
                        selectedTurn   = { this.selectedTurn }
                        toggleModal    = { this.toggleModal  }
                        isModalVisible = { this.state.isModalVisible }
                        addFree        = { this.addFree      }
                        addChange      = { this.addChange    }/>
                    <ConfirmModal
                        visible        = { this.state.confirmDisplayed  } 
                        closeModal     = { this.closeConfirmModal       }/>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#bee6ef',
        paddingTop:layoutStyle.verticalUnits10
    },

    labelText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: layoutStyle.primaryFontSize,
        color: '#3b2868',
        textAlign: 'left',
        width: layoutStyle.maxWidth,
        marginTop: layoutStyle.verticalUnits10*3
    },
});