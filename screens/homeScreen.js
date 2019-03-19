import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.getParam("username", "---")}</Text>
      </View>
    )
  }
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <ScrollView>
  //         <FlatList
  //           data={this.state.hello.turnWithDates}
  //           horizontal={true}
  //           renderItem={({ item }) => {
  //             return (<Text> {item.turn} </Text>)
  //           }}
  //         />
  //       </ScrollView>
  //     </View>
  //   )
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bee6ef',
    alignItems: 'center',
    justifyContent: 'center',
  }
})