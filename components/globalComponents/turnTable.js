import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import TurnColumn from './turnColumn';
const indexes    = [...Array(11).keys()];
const indexesCal = [...Array(365).keys()];

export default class TurnTable extends React.Component {
    constructor(props) {
        super(props);
        var indexes = this.getTodayIndex();
        this.state = {
            nurses:            this.props.nurses,
            currentMonthIndex: indexes.monthIndex,
            currentDayIndex:   indexes.dayIndex
        }
        this.handleViewableItemsChanged = 
            this.handleViewableItemsChanged.bind(this)
        this.renderItem = 
            this.renderItem.bind(this);
    }

    onLayout() {
        this.list.scrollToIndex({ index: this.state.currentDayIndex - 3 })
        // this.setState({ currentMonthIndex: this.getCurrentMonthIndex()  })
    }

    getItemLayout = (data, index) => (
        { length: 50, offset: 50 * index, index }
    );

    getCurrentMonthIndex() {
        return new Date().getMonth();
    }

    getTodayIndex() {
        var currentMonthIndex = this.getCurrentMonthIndex();
        var indexOfToday = 0;
        for (let i = 0; i < currentMonthIndex; i++) {
            indexOfToday += daysPerMonth[i];
        }
        indexOfToday += new Date().getDate() - 1;

        return { dayIndex: indexOfToday, monthIndex: currentMonthIndex }
    }

    handleViewableItemsChanged({ viewableItems, changed }) {
        if ( viewableItems != undefined && viewableItems.length > 0 ) {
            const todayMonth      = this.getCurrentMonthIndex();
            const leftItemIndex   = viewableItems[0].item;
            const rightItemIndex  = viewableItems[viewableItems.length -1].item;
            const leftMonthIndex  = this.getMonthOfDayIndex(leftItemIndex);
            const rightMonthIndex = this.getMonthOfDayIndex(rightItemIndex);

            if ( leftMonthIndex === rightMonthIndex ) {
                this.props.setMonth(leftMonthIndex)
            }

            if ( leftMonthIndex === todayMonth || rightMonthIndex === todayMonth ) 
                this.props.setMonth(todayMonth);
        }
    }

    getMonthOfDayIndex(index) {
        var cumulated = 0;
        for ( var i = 0; i < 12; i++ ) {
            if ( cumulated < index )
                cumulated+= daysPerMonth[i];
            else
                return i-1;
        }
    }

    viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    renderItem({ item}) {
        return (
            <View style={{ justifyContent: 'space-between'}}>
                {/* <TurnColumn turnObjs={this.state.mappedCollection}/> */}
                <TurnColumn turnObjs={[
                    this.state.nurses[0].turnWithDates[item],
                    this.state.nurses[1].turnWithDates[item],
                    this.state.nurses[2].turnWithDates[item],
                    this.state.nurses[3].turnWithDates[item],
                    this.state.nurses[4].turnWithDates[item],
                    this.state.nurses[5].turnWithDates[item],
                    this.state.nurses[6].turnWithDates[item],
                    this.state.nurses[7].turnWithDates[item],
                    this.state.nurses[8].turnWithDates[item],
                    this.state.nurses[9].turnWithDates[item]
                ]}/>
            </View>
        )
    }

    render() {
        return (
            <View onLayout={() => this.onLayout()} style={{width: 300, height: 530, borderRadius: 20, overflow: 'hidden', elevation: 15}}>
                <FlatList
                    ref={el => this.list = el}
                    getItemLayout={this.getItemLayout}
                    data={indexesCal}
                    renderItem={this.renderItem}
                    initialScrollIndex={indexOfToday -5}
                    onViewableItemsChanged={this.handleViewableItemsChanged}
                    viewabilityConfig={this.viewabilityConfig}
                    keyExtractor = { item => `${item}`}
                    horizontal={true}>
                </FlatList>
            </View>
        )
    }
}

const dateObj = new Date();
const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const date = {
    day: dateObj.getDate(),
    month: dateObj.getMonth()
};

var indexOfToday = 0;
for (let i = 0; i < date.month; i++) {
    indexOfToday += daysPerMonth[i];
}
indexOfToday += date.day;