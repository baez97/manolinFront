import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import DateUtils from '../dateUtils';
const  dateUtils = new DateUtils();
import LayoutStyles from '../../styles/layoutStyle'

export default class TurnColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.turnObjs[0]};
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

    getTurnsView() {
        var turnsView = [];

        for ( let i = 0; i < this.props.turnObjs.length; i++ ) {
            const { turn } = this.props.turnObjs[i];
            turnsView.push(
            <Text key={i} style={ this.isToday() ? styles.todayTurnText: styles.turnText } allowFontScaling={false}>
                { turn }
            </Text>)
        }

        return turnsView;
    }

    render() {
        const turnsView = this.getTurnsView();
        const { day } = this.props.turnObjs[0];

        return (
            <View style={{width: LayoutStyles.turnColWidth}}>
                <LinearGradient
                    colors={['#0c9ed6', '#0470dc']}
                    style={ styles.dayBar }
                    start={[0, 0]}
                    end={[0, 1]}>
                    <Text style={styles.dayText} allowFontScaling={false}>
                        { `${day}` }
                    </Text>
                 </LinearGradient>

                 <LinearGradient
                    colors={this.isWeekend() ? ['#b2e6fa', '#6bb9d6'] : ['#f9f9f9', '#cecccc']}
                    style={styles.turnBar}
                    start={[0, 0]}
                    end={[0, 1]}>
                    { turnsView }
                 </LinearGradient>
            </View>
        )
    }
}

// const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const { day, month, year } = dateUtils.today;
const todayObj = {
    day   : day,
    month : month +1,
    year  : year
}

const styles = StyleSheet.create({
    dayText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyles.smallFontSize,
        color: 'white',
        textAlign: 'center'
    },

    dayBar: {
        height: LayoutStyles.verticalUnits10*3, 
        justifyContent: 'center'
    },

    todayBar: {
        backgroundColor: 'black'
    },

    turnText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyles.hugeFontSize,
        color: 'black',
        textAlign: 'center',
        paddingBottom: LayoutStyles.verticalUnits10*1.1
    },

    todayTurnText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyles.hugeFontSize,
        color: 'black',
        textAlign: 'center',
        color: '#056ec9',
        paddingBottom: LayoutStyles.verticalUnits10*1.1
    },

    turnBar: {
        paddingTop:LayoutStyles.verticalUnits10,
        paddingBottom:LayoutStyles.verticalUnits10,
        paddingRight:LayoutStyles.horizontalUnits10,
        paddingLeft:LayoutStyles.horizontalUnits10,
        borderRightColor: '#c5c9cc',
        borderRightWidth: 0.5,
        borderLeftColor: '#c5c9cc',
    }
});