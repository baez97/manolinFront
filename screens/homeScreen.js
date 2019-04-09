import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal           from 'react-native-modal';

import GlobalButton    from '../components/homeComponents/buttons/globalButton';
import MidYellowButton from '../components/homeComponents/buttons/midYellowButton';
import MidBlueButton   from '../components/homeComponents/buttons/midBlueButton';
import TurnDeck        from '../components/homeComponents/turnDeck';
import ChangesQueue    from '../components/homeComponents/changes/changesQueue';
import AskChangeModal  from '../components/homeComponents/askChangeModal'
import { BACKEND_IP }  from '../config';
import layoutStyle from '../styles/layoutStyle';


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoaded: false,
            error: false,
            isModalVisible: false,
        }
        this.token        = this.getNavigationParam("token");
        this.selectedTurn = {};
        this.selectTurn   = this.selectTurn.bind(this);
        this.toggleModal  = this.toggleModal.bind(this);
        this.addChange    = this.addChange.bind(this);
    }

    async componentDidMount() {
        return this.fetchToAPI('/auth/me', {
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

    fetchToAPI(urlString, options) {
        return fetch(BACKEND_IP + urlString, options);
    }

    addChange({day, weekday, month, year, turn}, typeString) {
        const change = {
            day,
            weekday,
            month,
            year,
            turn,
            owner: this.state.user.name,
            type: typeString,
            accepted: false,
            purposes: [],
        }

        this.fetchToAPI("/central/insertChange",
            {
                method: 'POST',
                body: JSON.stringify({
                    change: change
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.token
                }
            }
        )
        .then( () => {
            this.toggleModal();
            this.showConfirmation();
        })
        .catch( err => {
            console.log(err);
        })
    }

    showConfirmation() {
        console.log("CONFIRMED!");
        this.forceUpdate();
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
        // NOT IMPLEMENTED YET
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
                    <ChangesQueue token={this.token}/>
                    <AskChangeModal 
                        selectedTurn   = { this.selectedTurn }
                        toggleModal    = { this.toggleModal  }
                        isModalVisible = { this.state.isModalVisible }
                        addChange      = { this.addChange    }/>
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
        paddingTop:10
    },

    labelText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: layoutStyle.primaryFontSize,
        color: '#3b2868',
        textAlign: 'left',
        width: layoutStyle.maxWidth,
        marginTop: 30
    },
});