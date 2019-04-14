import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { BACKEND_IP } from '../../../config';
import ChangeView from './changeView';
import layoutStyle from '../../../styles/layoutStyle';

export default class ChangesQueue extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            changesLoaded: false
        }

        this.socket = this.props.socket;
        this.socket.on("changesUpdate", () => {
            this.loadChanges();
        })
    }

    loadChanges() {
        const token = this.props.token;
        return this.fetchToAPI( BACKEND_IP + '/central/changes', {
            method: 'GET',
            headers: {
                Accept           : 'application/json',
                'Content-Type'   : 'application/json',
                'x-access-token' : token
            }
        })
        .then( response => response.json() )
        .then( responseJson => {
            if ( ! responseJson.err ) {
                this.setState({
                    changesLoaded: true,
                    changes: responseJson.result
                });
                this.props.onLoaded(responseJson.result);
            } else {
                this.setState({
                    changesLoaded: true,
                    changes: []
                });
                this.props.onLoaded([]);
            }
        })
        .catch( err => {
            this.setState({
                changesLoaded: true,
                changes: []
            });
            this.props.onLoaded([]);
        });
    }
    async componentDidMount() {
        return this.loadChanges();
    }

    fetchToAPI(ipString, options) {
        return fetch(ipString, options);
    }

    keyExtractor(item) {
        return `${item._id}`;
    }

    render() {
        if ( ! this.state.changesLoaded ) {
            return <Text>Cargando cambios...</Text>
        } else if ( this.state.changes.length === 0 ) {
            return null
        } else {
            return (
                <View style={styles.container}>
                    <FlatList 
                        data={this.state.changes}
                        contentContainerStyle={{paddingBottom:20}}
                        renderItem={({item}) => 
                            <ChangeView 
                                change        ={ item } 
                                freeOnPress   ={ this.props.freeOnPress   }
                                changeOnPress ={ this.props.changeOnPress }/>
                        }
                        keyExtractor={this.keyExtractor}
                        />
                </View>
            );
        } 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: layoutStyle.verticalUnits10*0.5,
    }
})