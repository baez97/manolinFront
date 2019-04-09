import React from 'react';
import { BACKEND_IP } from '../config';
import { View, Text, StyleSheet } from 'react-native';
import NameColumn from '../components/globalComponents/nameColumn'
import TurnTable from '../components/globalComponents/turnTable'
import layoutStyle from '../styles/layoutStyle';

export default class GlobalScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersLoaded: false,
            error: false,
            currentMonthIndex : new Date().getMonth(),
        }
    }

    async componentDidMount() {
        const token = this.getNavigationParam("token");
        return fetch(BACKEND_IP + '/central/nurses', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then( response => response.json() )
        .then( nurses => {
            this.setState({
                nurses: nurses,
                usersLoaded: true
            });
        })
        .catch( err => {
            this.setState({
                error: true
            });
        });
    }

    getNavigationParam(key) {
        return this.props.navigation.getParam(key);
    }

    render() {
        if ( this.state.error ) {
            return (
                <View style={styles.container}>
                    <Text> Se ha producido un error </Text>
                </View>
            )
        }

        if ( ! this.state.usersLoaded ) {
            return ( 
                <View style={styles.container}>
                    <Text> Cargando... </Text>
                </View>
            )
        }

        return  (
            <View style={styles.container}>
                { months[this.state.currentMonthIndex] != undefined ?
                    ( <Text style={styles.monthText}>{`Turno de ${months[this.state.currentMonthIndex]}`}</Text>)
                    : ( <Text style={styles.monthText}>Turno</Text> )
                }
                <View style={styles.tableContainer}>
                    <NameColumn nurses={this.state.nurses}/>
                    <TurnTable  nurses={this.state.nurses} 
                        setMonth={(monthIndex) => {
                            this.setState({currentMonthIndex: monthIndex})
                        }}/>
                </View>
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
        paddingTop: layoutStyle.verticalUnits10,
        
    },

    tableContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: layoutStyle.maxWidth,
        marginTop: layoutStyle.verticalUnits10
    },

    monthText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: layoutStyle.primaryFontSize,
        color: '#332554',
        textAlign: 'left',
        width: layoutStyle.maxWidth,
        marginTop: layoutStyle.verticalUnits10*3
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