import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bee6ef',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },

    userInputContainer: {
        marginTop: 20,
        backgroundColor: '#c2c2c2'
    },

    userInput: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: 360,
        fontFamily: 'montserrat-extra-bold',
        color: 'black',
        fontSize: 20
    },

    label: {
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 10,
        fontFamily: 'montserrat-extra-bold',
        color: 'white',
        fontSize: 20
    },

    blueBox: {
        padding: 20,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 20,
        elevation: 3
    },

    loginButton: {
        padding: 20,
        borderRadius: 20,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 30,
        marginBottom: 20,
        elevation: 3,
    },

    buttonText: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
});