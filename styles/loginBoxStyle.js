import { StyleSheet } from 'react-native';
import LayoutStyle from '../styles/layoutStyle'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bee6ef',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: LayoutStyle.verticalUnits10*2,
    },

    userInputContainer: {
        marginTop: LayoutStyle.verticalUnits10*2,
        backgroundColor: '#c2c2c2'
    },

    userInput: {
        paddingTop    : LayoutStyle.verticalUnits10*2,
        paddingBottom : LayoutStyle.verticalUnits10*2,
        paddingRight  : LayoutStyle.horizontalUnits10*2,
        paddingLeft   : LayoutStyle.horizontalUnits10*2,
        backgroundColor: 'white',
        borderRadius: LayoutStyle.borderRadius,
        fontFamily: 'montserrat-extra-bold',
        color: 'black',
        fontSize: LayoutStyle.smallFontSize
    },

    label: {
        // marginBottom: 10,
        // marginTop: 20,
        // marginLeft: 10,
        // fontFamily: 'montserrat-extra-bold',
        // color: 'white',
        // fontSize: 20,
        marginBottom: LayoutStyle.verticalUnits10,
        marginTop: LayoutStyle.verticalUnits10*2,
        marginLeft: LayoutStyle.horizontalUnits10,
        fontFamily: 'montserrat-extra-bold',
        color: 'white',
        fontSize: LayoutStyle.smallFontSize
    },

    blueBox: {
        // padding: 20,
        // paddingTop: 8,
        // paddingBottom: 8,
        // borderRadius: 20,
        // elevation: 3
        paddingRight  : LayoutStyle.horizontalUnits10*2,
        paddingLeft   : LayoutStyle.horizontalUnits10*2,
        paddingTop    : LayoutStyle.verticalUnits10*0.8,
        paddingBottom : LayoutStyle.verticalUnits10*0.8,
        borderRadius  : LayoutStyle.borderRadius,
        elevation     : 3
    },

    loginButton: {
        // padding: 20,
        // borderRadius: 20,
        // marginLeft: 40,
        // marginRight: 40,
        // marginTop: 30,
        // marginBottom: 20,
        // elevation: 3,
        paddingTop    : LayoutStyle.verticalUnits10*2,
        paddingBottom : LayoutStyle.verticalUnits10*2,
        paddingRight  : LayoutStyle.horizontalUnits10*2,
        paddingLeft   : LayoutStyle.horizontalUnits10*2,
        borderRadius  : LayoutStyle.borderRadius,
        marginLeft    : LayoutStyle.horizontalUnits10*4,
        marginRight   : LayoutStyle.horizontalUnits10*4,
        marginTop     : LayoutStyle.verticalUnits10*3,
        marginBottom  : LayoutStyle.verticalUnits10*2,
        elevation: 3,
    },

    buttonText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: LayoutStyle.primaryFontSize,
        color: 'white',
        textAlign: 'center'
    }
});