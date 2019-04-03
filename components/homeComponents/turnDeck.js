import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import TurnViewWithDate from './turnViewWithDate';
import DateUtils from '../dateUtils';

const dateUtils = new DateUtils();

export default class TurnDeck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonthIndex: dateUtils.today.month,
            currentDayIndex:   dateUtils.indexOfToday
        }
        this.handleViewableItemsChanged = 
            this.handleViewableItemsChanged.bind(this)
    }

    onLayout() {
        this.list.scrollToIndex({ index: this.state.currentDayIndex - 1 })
    }

    getItemLayout = (data, index) => (
        { length: 55, offset: 55 * index, index }
    );

    handleViewableItemsChanged({ viewableItems, changed }) {
        const todayMonth = dateUtils.today.month;
        if ( viewableItems!=undefined && viewableItems.length != 0 ) {
            leftMonth  = viewableItems[0].item.month -1;
            rightMonth = viewableItems[viewableItems.length -1].item.month -1;
            if ( leftMonth === rightMonth ) {
                this.setState({ currentMonthIndex: leftMonth });
            }

            if ( rightMonth === todayMonth || leftMonth  === todayMonth )
                this.setState({ currentMonthIndex: todayMonth })
        } 
    }

    viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                { dateUtils.months[this.state.currentMonthIndex] != undefined ?
                    ( <Text style={styles.monthText}>
                        {`Mi turno de ${dateUtils.months[this.state.currentMonthIndex]}`}
                      </Text>)
                    : ( <Text style={styles.monthText}>Mi turno</Text> )
                }
                <View style={styles.deck} onLayout={() => this.onLayout()}>
                    <FlatList
                        ref={el => this.list = el}
                        getItemLayout={this.getItemLayout}
                        initialScrollIndex={dateUtils.indexOfToday -5}
                        data={this.props.turnWithDates}
                        renderItem={({ item }) => <TurnViewWithDate turnObject={item} />}
                        keyExtractor={item => `${item.day}+${item.month}+${item.year}`}
                        onViewableItemsChanged={this.handleViewableItemsChanged}
                        viewabilityConfig={this.viewabilityConfig}
                        horizontal={true}>
                    </FlatList>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 15,
        width: 400,
        height: 90,
        marginTop: 10
    },

    monthText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: 22,
        color: '#332554',
        textAlign: 'left',
        width: 390,
        marginTop: 30
    }
});