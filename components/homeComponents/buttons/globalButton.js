import React from 'react';
import { LinearGradient } from 'expo';
import { StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { widthPercentageToDP  as wp, 
         heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LayoutStyle from '../../../styles/layoutStyle';

export default class GlobalButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <TouchableOpacity onPress={this.props.onPressFn}>
            <LinearGradient
                style={styles.globalButton}
                colors={['#10bad2', '#2990f7']}
                start={[0.55, 0]}
                end={[0.65, 1]}>
                <Text style={styles.buttonText}>
                    {this.props.text}
                </Text>
                <Image 
                    source={require('../../../assets/calendar.png')} 
                    style={styles.calendarImage}
                    resizeMode="contain"/>
            </LinearGradient>
        </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    globalButton: {
        paddingTop: LayoutStyle.verticalUnits10,
        // paddingBottom: LayoutStyle.verticalUnits10,
        paddingLeft: LayoutStyle.horizontalUnits10,
        paddingRight: LayoutStyle.horizontalUnits10,
        borderRadius: LayoutStyle.borderRadius,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: LayoutStyle.verticalUnits10*2,
        elevation: 15,
        width: LayoutStyle.maxWidth,
        height: LayoutStyle.globalHeight
    },

    buttonText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.primaryFontSize,
        color: 'white',
        textAlign: 'left',
        marginTop: LayoutStyle.verticalUnits10,
    },

    calendarImage: {
        height: LayoutStyle.imageHeight,
        width: LayoutStyle.imageWidth
    }
});