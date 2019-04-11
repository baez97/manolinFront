import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import TurnColumn from './turnColumn';
const indexesCal = [...Array(365).keys()];

import DateUtils from '../dateUtils';
import layoutStyle from '../../styles/layoutStyle';
const dateUtils = new DateUtils();


export default class TurnTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nurses:            this.props.nurses,
            currentMonthIndex: dateUtils.today.month,
            currentDayIndex:   dateUtils.indexOfToday
        }
        this.handleViewableItemsChanged = 
            this.handleViewableItemsChanged.bind(this)
        this.renderItem = 
            this.renderItem.bind(this);
        this.onLayout = 
            this.onLayout.bind(this);
    }

    onLayout() {
        this.list.scrollToIndex({ index: this.state.currentDayIndex -1 })
    }

    getItemLayout = (data, index) => (
        { length: layoutStyle.turnColWidth, 
          offset: layoutStyle.turnColWidth * index, 
          index }
    );

    handleViewableItemsChanged({ viewableItems, changed }) {
        if ( viewableItems != undefined && viewableItems.length > 0 ) {
            const todayMonth      = dateUtils.today.month;
            const leftItemIndex   = viewableItems[0].item;
            const rightItemIndex  = viewableItems[viewableItems.length -1].item;
            const leftMonthIndex  = dateUtils.getMonthOfDayIndex(leftItemIndex);
            const rightMonthIndex = dateUtils.getMonthOfDayIndex(rightItemIndex);

            if ( leftMonthIndex === rightMonthIndex ) {
                this.props.setMonth(leftMonthIndex)
            }

            if ( leftMonthIndex === todayMonth || rightMonthIndex === todayMonth ) {
                this.props.setMonth(todayMonth);
            }
        }
    }

    viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    renderItem({ item }) {
        var turnObjCol = [];
        this.state.nurses.forEach( n => {
            turnObjCol.push(n.turnWithDates[item]);
        })
        return (
            <View style={{ justifyContent: 'space-between' }}>
                <TurnColumn turnObjs={ turnObjCol }/>
            </View>
        )
    }

    render() {
        return (
            <View onLayout={this.onLayout} style={styles.container}>
                <FlatList
                    ref           = { el => this.list = el }
                    getItemLayout = { this.getItemLayout   }
                    data          = { indexesCal           }
                    renderItem    = { this.renderItem      }
                    initialScrollIndex = { dateUtils.indexOfToday -5 }
                    onViewableItemsChanged = { this.handleViewableItemsChanged }
                    viewabilityConfig = { this.viewabilityConfig }
                    keyExtractor  = { item => `${item}`}
                    horizontal    = { true }/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: layoutStyle.turnTableWidth,
        borderRadius: layoutStyle.borderRadius,
        overflow: 'hidden',
        elevation: 15
    }
});