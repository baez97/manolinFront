import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { BACKEND_IP } from '../../../config';
import ChangeView from './changeView';

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
            } else {
                this.setState({
                    changesLoaded: true,
                    changes: []
                });
            }
        })
        .catch( err => {
            this.setState({
                changesLoaded: true,
                changes: []
            });
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
                            // (<View style={{alignItems:"center"}}>
                                <ChangeView 
                                    change={item} 
                                    onPressFn={this.props.onPressFn}/>
                            // </View>)
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
        // width: 420,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
    }
})