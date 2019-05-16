import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import LayoutStyle from '../../styles/layoutStyle';
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
        { length: LayoutStyle.turnWidth, offset: LayoutStyle.turnWidth * index, index }
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
                    ( <Text style={styles.monthText} allowFontScaling={false}>
                        {`Mi turno de ${dateUtils.months[this.state.currentMonthIndex]}`}
                      </Text>)
                    : ( <Text style={styles.monthText} allowFontScaling={false}>Mi turno</Text> )
                }
                <View style={styles.deck} onLayout={() => this.onLayout()}>
                    <FlatList
                        ref={el => this.list = el}
                        getItemLayout={this.getItemLayout}
                        initialScrollIndex={dateUtils.indexOfToday -5}
                        data={this.props.turnWithDates}
                        renderItem={({ item }) => <TurnViewWithDate selectTurn={this.props.selectTurn} turnObject={item} />}
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
        borderRadius: LayoutStyle.borderRadius,
        overflow: 'hidden',
        elevation: 15,
        width:  LayoutStyle.maxWidth,
        height: LayoutStyle.deckHeight,
        marginTop: 10
    },

    monthText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.primaryFontSize,
        color: '#332554',
        textAlign: 'left',
        width: LayoutStyle.maxWidth,
        marginTop: 30
    }
});