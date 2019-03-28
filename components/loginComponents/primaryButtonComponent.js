import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo';

export default class PrimaryButton extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => { this.props.onPressFunction() }}>
        <LinearGradient 
          style={styles.primaryButton} 
          colors={['#0470dc', '#23538a']} 
          start={[0, 0]} 
          end={[1, 1]}>
          <Text style={styles.buttonText}>
            {this.props.text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  primaryButton: {
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
})