import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NameColumn         from '../components/globalComponents/nameColumn'
import fetchToAPI         from '../components/fetchToAPI';
import layoutStyle        from '../styles/layoutStyle';
import ConfirmModal       from '../components/homeComponents/confirmModal';
import DateUtils          from '../components/dateUtils';
import PressableTurnTable from 
    '../components/chooseChangeComponents/pressableTurnTable';
import ChangeView         from 
    '../components/homeComponents/changes/changeView';
import AreYouSureModal    from 
    '../components/homeComponents/areYouSureModal';
const  dateUtils = new DateUtils();
const  months    = dateUtils.months;

export default class ChooseChangeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.changerNurse = this.getNavigationParam("changerNurse");
        this.change       = this.getNavigationParam("change");
        this.socket       = this.getNavigationParam("socket");
        this.bindMethods();
        this.state = {
            userLoaded: false,
            selectedTurn: false,
            error: false,
            currentMonthIndex : new Date().getMonth(),
            isModalVisible: false,
            isConfirmVisible: false,
            modalMessage: "",
            confirmMessage:""
        }
    }

    bindMethods() {
        this.hideModal        = this.hideModal.bind(this);
        this.wantsToChange    = this.wantsToChange.bind(this);
        this.showConfirmation = this.showConfirmation.bind(this);
        this.hideConfirmation = this.hideConfirmation.bind(this);
        this.confirmChange    = this.confirmChange.bind(this);
    }

    async componentDidMount() {
        const token = this.getNavigationParam("token");
        fetchToAPI('/central/nurseById/'+this.change.owner_id, {
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

    wantsToChange(changerTurn) {
        const message =
            `${this.changerNurse.name}, ¿quieres proponerle a `           +
            `${this.ownerNurse.name} que trabaje el ${changerTurn.day} `  +
            `${dateUtils.getTurnString(changerTurn.turn)} a cambio de que tú ` +
            `trabajes el ${this.change.day} `                             + 
            `${dateUtils.getTurnString(this.change.turn)}?`;

        this.showModal(message, changerTurn);
    }

    confirmChange(purposedTurn) {
        purposedTurn = { ...purposedTurn,
            type: "change",
            owner: this.changerNurse.name,
            accepted: false
        };

        this.socket.emit("insertPurposal", this.change, purposedTurn);
        this.showConfirmation();
    }

    showModal(message, changerTurn) { 
        this.setState({
            isModalVisible : true,
            modalMessage   : message,
            selectedTurn   : changerTurn
        });
    }

    hideModal() {
        this.setState({
            isModalVisible : false,
            modalMessage   : ""
        });
    }

    showConfirmation() {
        const confirmMessage = 
            `Propuesta enviada. A ver si ${this.ownerNurse.name} confirma`;

        this.setState({
            isModalVisible   : false,
            modalMessage     : "",
            isConfirmVisible : true,
            confirmMessage   : confirmMessage
        })
    }

    hideConfirmation() {
        this.props.navigation.navigate("HomeScreen", {
            token: this.getNavigationParam("token")
        });
    }

    render() {
        if ( this.state.error ) {
            return (
                <View style={ styles.container }>
                    <Text style={{ marginTop: 50 }}> 
                        Se ha producido un error 
                    </Text>
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

        const message = `¿Qué turno le propones a ${this.ownerNurse.name} `+
                        `que haga a cambio?`
        return  (
            <View style={styles.container}>
                <ChangeView
                    change={this.change} 
                    changeOnPress={()=>{}}/>
                <Text style={styles.titleText}>
                    {message}
                </Text>
                { months[this.state.currentMonthIndex] != undefined ?
                    ( <Text style={styles.monthText}>
                        {months[this.state.currentMonthIndex]}
                      </Text>)
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
                    change     = { this.state.selectedTurn   }
                    text       = { this.state.modalMessage   }
                    closeModal = { this.hideModal            }
                    onPressFn  = { this.confirmChange        } />
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