import React from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native'


export default class NameColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: props.nurses.map(n => n.name)
        }
    }

    render() {
        return (
            <View style={{marginTop: 45, marginRight: 20}}>
                <FlatList
                    data={this.state.names}
                    renderItem={({ item }) => <Text style={styles.nameText}>{item}</Text>}
                    keyExtractor={item => item}>
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nameText: {
        fontFamily: 'big-noodle-titling',
        fontSize: 30,
        paddingBottom: 15,
    }
})