import React, { Component } from 'react';
import { Text, View } from 'react-native';

import User from './components/User';

class HelloWorldApp extends Component{
  render(){

    let my_list = [{name: "Oranges", quantity: 6},{name: "Apples", quantity:4}];
     const get_number_of_items = (shopping_list) => {
       let items =0;
       items =+ i.quantity
     }

    const name = "morgan";
    return (
      <View>
        <Text> you have {get_number_of_items(my_list)} items in your basket hell yeah</Text>
        <User name="Morgan" email="morgan.porch.com"/>
      </View>
    );
  }
}

export default HelloWorldApp