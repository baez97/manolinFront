import React from 'react';
import { FlatList, Text, View, StyleSheet, Dimensions } from 'react-native';
import TurnViewWithDate from './turnViewWithDate';

export default class TurnDeck extends React.Component {
    constructor(props) {
        super(props);
        var indexes = this.getTodayIndex();
        this.state = {
            currentMonthIndex: indexes.monthIndex,
            currentDayIndex: indexes.dayIndex
        }

        this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
    }

    onLayout() {
        this.list.scrollToIndex({ index: this.state.currentDayIndex - 3})
    }

    getItemLayout = (data, index) => (
        { length: 55, offset: 55 * index, index }
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
        var max = 0;
        viewableItems.forEach(i => {
            if (i.item.month > max) {
                max = i.item.month;
            }
        });
        this.setState({ currentMonthIndex: max - 1 });
    }

    viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                { months[this.state.currentMonthIndex] != undefined ?
                    ( <Text style={styles.monthText}>{`Mi turno de ${months[this.state.currentMonthIndex]}`}</Text>)
                    : ( <Text style={styles.monthText}>Mi turno</Text> )
                }
                <View style={styles.deck} onLayout={() => this.onLayout()}>
                    <FlatList
                        ref={el => this.list = el}
                        getItemLayout={this.getItemLayout}
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

const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]