import React from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native'
import LayoutStyle from '../../styles/layoutStyle'

export default class NameColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: props.nurses.map(n => n.name)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.names}
                    renderItem={({item}) => <Text style={styles.nameText}>{item}</Text>}
                    keyExtractor={item => item}>
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nameText: {
        fontFamily: 'big-noodle-titling',
        fontSize: LayoutStyle.bigFontSize,
        paddingBottom: LayoutStyle.verticalUnits10 * 1.5,
    },

    container: {
        marginTop: LayoutStyle.verticalUnits10*4.5, 
        marginRight: LayoutStyle.horizontalUnits10*2
    }
})