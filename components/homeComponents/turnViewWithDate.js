import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import LayoutStyle from '../../styles/layoutStyle';

export default class TurnViewWithDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.turnObject};
        this.dayPressed = this.dayPressed.bind(this);
    }

    isToday() {
        if ( this.state.year  != todayObj.year  )
            return false;
        if ( this.state.month != todayObj.month )
            return false;
        if ( this.state.day   != todayObj.day   )
            return false;
        return true;
    }

    isWeekend() {
        return this.state.weekday > 5;
    }

    dayPressed() {
        this.props.selectTurn(this.props.turnObject);
    } 

    render() {
        const { day, turn, weekday } = this.props.turnObject;
        return (
            <TouchableOpacity style={{width: LayoutStyle.turnWidth}}
                onLongPress={this.dayPressed}>
                <LinearGradient
                    colors={['#0c9ed6', '#0470dc']}
                    style={ styles.dayBar }
                    start={[0, 0]}
                    end={[0, 1]}>
                    <Text style={styles.dayText} allowFontScaling={false}>
                        { `${weekDays[weekday-1]} ${day}` }
                    </Text>
                 </LinearGradient>

                 <LinearGradient
                    colors={this.isWeekend() ? ['#b2e6fa', '#6bb9d6'] : ['#f9f9f9', '#cecccc']}
                    style={styles.turnBar}
                    start={[0, 0]}
                    end={[0, 1]}>
                    <Text style={ this.isToday() ? styles.todayTurnText: styles.turnText} allowFontScaling={false}>
                        { turn }
                    </Text>
                 </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const dateObj = new Date();
const todayObj = {
    day: dateObj.getDate(),
    month: dateObj.getMonth() +1,
    year: dateObj.getFullYear()
}

const styles = StyleSheet.create({
    dayText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.smallFontSize,
        color: 'white',
        textAlign: 'center'
    },

    dayBar: {
        height: LayoutStyle.dayHeight, 
        justifyContent: 'center'
    },

    todayBar: {
        backgroundColor: 'black'
    },

    turnText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.hugeFontSize,
        color: 'black',
        textAlign: 'center'
    },

    todayTurnText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.hugeFontSize,
        color: 'black',
        textAlign: 'center',
        color: '#056ec9'
    },

    turnBar: {
        padding:10,
        borderRightColor: '#c5c9cc',
        borderRightWidth: 0.5,
        height: LayoutStyle.turnHeight,
        justifyContent: 'center'
    }
});