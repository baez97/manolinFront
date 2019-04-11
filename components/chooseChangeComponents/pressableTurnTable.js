import React from 'react';
import { View } from 'react-native';
import PressableTurnColumn from './pressableTurnColumn';
import TurnTable from '../globalComponents/turnTable';


export default class PressableTurnTable extends TurnTable {
    constructor(props) {
        super(props);
    }

    renderItem({ item }) {
        var turnObjCol = [];
        this.state.nurses.forEach( n => {
            turnObjCol.push(n.turnWithDates[item]);
        })
        return (
            <View style={{ justifyContent: 'space-between' }}>
                <PressableTurnColumn 
                    turnObjs  = { turnObjCol }
                    onPressFn = { this.props.onPressFn }/>
            </View>
        )
    }
}