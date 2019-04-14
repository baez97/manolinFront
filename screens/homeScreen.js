import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SocketIOClient from 'socket.io-client';

import registerForPush from '../components/registerForPush';
import GlobalButton    from '../components/homeComponents/buttons/globalButton';
import MidYellowButton from '../components/homeComponents/buttons/midYellowButton';
import MidBlueButton   from '../components/homeComponents/buttons/midBlueButton';
import TurnDeck        from '../components/homeComponents/turnDeck';
import ChangesQueue    from '../components/homeComponents/changes/changesQueue';
import AskChangeModal  from '../components/homeComponents/askChangeModal';
import ConfirmModal    from '../components/homeComponents/confirmModal';
import { BACKEND_IP }  from '../config';
import layoutStyle from '../styles/layoutStyle';
import AreYouSureModal from '../components/homeComponents/areYouSureModal';


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changes             : undefined,
            userLoaded          : false,
            error               : false,
            isModalVisible      : false,

            confirmDisplayed    : false,
            confirmMessage      : "",

            areYouSureDisplayed : false,
            areYouSureMessage   : "",
            areYouSureChange    : undefined,
        }

        this.token             = this.getNavigationParam("token");
        this.selectedTurn      = {};
        this.bindMethods();
        this.socket            = SocketIOClient(BACKEND_IP);
        this.socket.on("turnsUpdate", () => {
            this.loadTurns();
        });
    }

    bindMethods() {
        this.selectTurn         = this.selectTurn        .bind( this );
        this.toggleModal        = this.toggleModal       .bind( this );
        this.addChange          = this.addChange         .bind( this );
        this.addFree            = this.addFree           .bind( this );
        this.closeConfirmModal  = this.closeConfirmModal .bind( this );
        this.showAreYouSureFree = this.showAreYouSureFree.bind( this );
        this.acceptAreYouSure   = this.acceptAreYouSure  .bind( this );
        this.hideAreYouSure     = this.hideAreYouSure    .bind( this );
        this.goToChooseChange   = this.goToChooseChange  .bind( this );
        this.setChanges         = this.setChanges        .bind( this );
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
            if ( user.token == undefined ) {
                registerForPush(user.name, this.socket)
                .catch(() => {});
            }
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
            purposals: [],
        }

        this.socket.emit("insertFree", free);
        this.toggleModal();
        this.showConfirmation("Petición enviada");
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
            purposals: [],
        }

        this.socket.emit("insertChange", change);
        this.toggleModal();
        this.showConfirmation("Petición enviada");
    }

    setChanges(changes) {
        this.setState({
            changes: changes
        })
    }
    acceptFree(free) {
        this.socket.emit("acceptFree", change, this.user.name);
        this.showConfirmation("Cambio realizado");
    }

    showConfirmation(message) {
        this.setState({
            confirmDisplayed : true,
            confirmMessage   : message
        })
    }

    showAreYouSureFree(change) {
        const message = 
            `${this.state.user.name}, ¿quieres trabajar ` +
            `el ${change.day} ${this.getTurnString(change.turn)} `+
            `para que ${change.owner} pueda librar ese día?`;

        this.setState({
            areYouSureDisplayed : true,
            areYouSureMessage   : message,
            areYouSureChange    : change
        });
    }

    acceptAreYouSure(change) {
        this.socket.emit("changeAccepted", change, this.state.user.name);

        this.hideAreYouSure()
        this.showConfirmation("Cambio realizado");
    }

    hideAreYouSure() {
        this.setState({
            areYouSureDisplayed: false,
            areYouSureMessage: "",
            areYouSureChange: undefined
        });
    }

    goToChooseChange(change) {
        this.props.navigation.navigate(
            "ChooseChangeScreen",
            {
                change       : change,
                changerNurse : this.state.user,
                token        : this.token,
                socket       : this.socket 
            });
    }

    getTurnString(character) {
        switch(character) {
            case 'M':
                return "por la mañana";
            case 'T':
                return "por la tarde";
            case 'N':
                return "por la noche";
            case 'L':
                return "(LIBRE)";
            case '-':
                return "(SALIDA DE NOCHE)";
        }
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
        if( this.state.changes != undefined )
            this.props.navigation.navigate(
                "MyChangesScreen", 
                { changes: this.state.changes,
                  name: this.state.user.name,
                  socket: this.socket,
                  token: this.token }
            );
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
                    <ChangesQueue 
                        socket  ={ this.socket } 
                        token   ={ this.token  } 
                        onLoaded       = { this.setChanges           }
                        freeOnPress    = { this.showAreYouSureFree   }
                        changeOnPress  = { this.goToChooseChange     } />
                    <AskChangeModal 
                        selectedTurn   = { this.selectedTurn }
                        toggleModal    = { this.toggleModal  }
                        isModalVisible = { this.state.isModalVisible }
                        addFree        = { this.addFree      }
                        addChange      = { this.addChange    }/>
                    <ConfirmModal
                        visible        = { this.state.confirmDisplayed  } 
                        closeModal     = { this.closeConfirmModal       }
                        text           = { this.state.confirmMessage    }/>
                    <AreYouSureModal
                        visible        = { this.state.areYouSureDisplayed }
                        change         = { this.state.areYouSureChange    }
                        text           = { this.state.areYouSureMessage   }
                        closeModal     = { this.hideAreYouSure   }
                        onPressFn      = { this.acceptAreYouSure } />
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