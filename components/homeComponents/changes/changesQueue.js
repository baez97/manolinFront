import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import fetchToAPI from '../../fetchToAPI';
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
        });

        this.loadChanges = this.loadChanges.bind(this);
        this.renderItem  = this.renderItem.bind(this);
    }

    loadChanges() {
        const token = this.props.token;
        return fetchToAPI( '/central/changes', {
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

    keyExtractor(item) {
        return `${item._id}`;
    }

    renderItem({item}) {
        return (
            <ChangeView 
                change        ={ item } 
                freeOnPress   ={ this.props.freeOnPress   }
                changeOnPress ={ this.props.changeOnPress }/>
        )
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
                        renderItem   = { this.renderItem   }
                        keyExtractor = { this.keyExtractor }
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