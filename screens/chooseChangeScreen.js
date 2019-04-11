import React from 'react';
import { BACKEND_IP } from '../config';
import { View, Text, StyleSheet } from 'react-native';
import NameColumn  from '../components/globalComponents/nameColumn'
// import TurnTable   from '../components/globalComponents/turnTable'
import PressableTurnTable from '../components/chooseChangeComponents/pressableTurnTable';
import layoutStyle from '../styles/layoutStyle';
import ChangeView from '../components/homeComponents/changes/changeView';
import AreYouSureModal from '../components/homeComponents/areYouSureModal';
import ConfirmModal from '../components/homeComponents/confirmModal';

export default class ChooseChangeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.changerNurse = this.getNavigationParam("changerNurse");
        this.change       = this.getNavigationParam("change");
        this.bindMethods();
        this.state = {
            userLoaded: false,
            error: false,
            currentMonthIndex : new Date().getMonth(),
            isModalVisible: false,
            isConfirmVisible: false,
            modalMessage: "",
            confirmMessage:""
        }
    }

    bindMethods() {
        this.hideModal = this.hideModal.bind(this);
        this.wantsToChange = this.wantsToChange.bind(this);
        this.showConfirmation = this.showConfirmation.bind(this);
        this.hideConfirmation = this.hideConfirmation.bind(this);
    }

    fetchToAPI(urlString, options) {
        return fetch(BACKEND_IP + urlString, options);
    }

    async componentDidMount() {
        const token = this.getNavigationParam("token");
        this.fetchToAPI('/central/nurse/'+this.change.owner, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then(response => response.json())
        .then(user => {
            this.ownerNurse = user;
            this.setState({
                ownerNurse: user,
                userLoaded: true,
                nurses: [this.changerNurse, this.ownerNurse]
            });
        })
        .catch(err => {
            this.setState({
                error: true
            })
        });
    }

    getNavigationParam(key) {
        return this.props.navigation.getParam(key);
    }

    getTurnString(turnObj) {
        const character = turnObj.turn;
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

    wantsToChange(changerTurn) {
        const message =
            `${this.changerNurse.name}, ¿quieres proponerle a `           +
            `${this.ownerNurse.name} que trabaje el ${changerTurn.day} ` +
            `${this.getTurnString(changerTurn)} a cambio de que tú `     +
            `trabajes el ${this.change.day} ${this.getTurnString(this.change)}?`;

        
        this.showModal(message);
    }

    showConfirmation() {
        const confirmMessage = 
            `Propuesta enviada. A ver si ${this.ownerNurse.name} confirma`;

        this.setState({
            isModalVisible: false,
            modalMessage: "",
            isConfirmVisible: true,
            confirmMessage: confirmMessage
        })
    }

    hideConfirmation() {
        // this.setState({
        //     isConfirmVisible: false,
        //     confirmMessage: "",
        // });

        this.props.navigation.navigate("HomeScreen", {
            token: this.getNavigationParam("token")
        });
    }

    showModal(message) { 
        this.setState({
            isModalVisible : true,
            modalMessage   : message
        });
    }

    hideModal() {
        this.setState({
            isModalVisible : false,
            modalMessage   : ""
        });
    }

    render() {
        if ( this.state.error ) {
            return (
                <View style={ styles.container }>
                    <Text style={{ marginTop: 50 }}> Se ha producido un error </Text>
                </View>
            )
        }

        if ( ! this.state.userLoaded ) {
            return ( 
                <View style={styles.container}>
                    <Text style={{ marginTop: 50 }}> Cargando... </Text>
                </View>
            )
        }

        return  (
            <View style={styles.container}>
                <ChangeView
                    change={this.change} 
                    changeOnPress={()=>{}}/>
                <Text style={styles.titleText}>
                    ¿Qué turno le propones a {this.ownerNurse.name} que haga a cambio?
                </Text>
                { months[this.state.currentMonthIndex] != undefined ?
                    ( <Text style={styles.monthText}>{months[this.state.currentMonthIndex]}</Text>)
                    : ( <Text style={styles.monthText}>Turno</Text> )
                }
                <View style={styles.tableContainer}>
                    <NameColumn nurses={this.state.nurses}/>
                    <PressableTurnTable  
                        nurses    = { this.state.nurses  }
                        onPressFn = { this.wantsToChange }
                        setMonth  = { (monthIndex) => {
                            this.setState({currentMonthIndex: monthIndex})
                        }}/>
                </View>
                <AreYouSureModal
                    visible    = { this.state.isModalVisible }
                    change     = { this.state.selectedChange }
                    text       = { this.state.modalMessage   }
                    closeModal = { this.hideModal            }
                    onPressFn  = { this.showConfirmation     } />
                <ConfirmModal
                    visible    = { this.state.isConfirmVisible }
                    closeModal = { this.hideConfirmation       }
                    text       = { this.state.confirmMessage   } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#bee6ef',
        paddingTop: layoutStyle.verticalUnits10*4,
        
    },

    tableContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: layoutStyle.maxWidth,
        marginTop: layoutStyle.verticalUnits10
    },

    titleText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: layoutStyle.hugeFontSize,
        color: '#332554',
        textAlign: "center",
        width: layoutStyle.maxWidth,
        marginTop: layoutStyle.verticalUnits10*5,
    },

    monthText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: layoutStyle.primaryFontSize,
        color: '#332554',
        textAlign: 'center',
        width: layoutStyle.maxWidth,
        marginTop: layoutStyle.verticalUnits10*5
    }
});

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
]