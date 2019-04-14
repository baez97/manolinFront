import React from 'react';
import PurposalView from './purposalView';
import { View, Text, FlatList, SectionList, StyleSheet } from 'react-native';
import layoutStyle from '../../styles/layoutStyle'

export default class PurposalsQueue extends React.Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.name = this.props.name;
        this.state = {
            changes : this.props.changes.filter(c => {return c.owner===this.name})
        }

        this.data = [];
        this.state.changes.forEach( c => {
            if ( ! c.accepted ) {
                this.data.push(
                    { 
                        title: this.getTitle(c),
                        change: c,
                        data: c.purposals
                    }
                );
            }
        });
    };
    
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

    getTitle(change) {
        const title = 
            `Propuestas para el ${change.day} ` + 
            `${this.getTurnString(change.turn)}`;
        return title;
    }

    keyExtractor(item) {
        return `${item._id}`;
    }

    renderItem({item, index, section}) {
        return (
            <PurposalView 
                key          = { index }
                change       = { item  }
                parentChange = { section.change }
                onPressFn    = { this.props.onPressFn }
                />
        );
    }

    render() {
        if ( this.state.changes.length === 0 )
            return <Text style={styles.textLabel}>No hay propuestas todavía</Text>
        return (
            <SectionList
                renderItem = { this.renderItem }
                contentContainerStyle={{paddingBottom:20}}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.textLabel}>{title}</Text>
                )}
                sections={this.data}
                keyExtractor={(item, index) => index}
                />
        )
    }
    // render() {
    //     if ( this.state.purposals.length === 0 )
    //         return null;
    //     else {
    //         return (
    //             <View style={styles.container}>
    //                 <FlatList 
    //                     data={this.state.purposals}
    //                     contentContainerStyle={{paddingBottom:20}}
    //                     renderItem={({item}) => 
    //                         <PurposalView 
    //                             change    = { item } 
    //                             onPressFn   = { this.props.onPressFn }/>
    //                         }
    //                     keyExtractor={ this.keyExtractor }
    //                     />
    //             </View>
    //         )
    //     }
    // }
}

const styles = StyleSheet.create({
    textLabel: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: layoutStyle.smallFontSize,
        color: '#3f2606',
        marginLeft: layoutStyle.horizontalUnits10,
        marginTop: layoutStyle.verticalUnits10*4
    }
})