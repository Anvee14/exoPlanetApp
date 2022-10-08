import React from "react";
import { createAppContainer  } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./Screens/Home";
import DetailsScreen from "./Screens/Details";
import { StyleSheet,View,Text } from "react-native";
export default function App() {
  return (
    <View style={styles.container}>
      <AppContainer/>
    </View>
  );
}
const appStackNavigator = createStackNavigator(
  {
    Home:{screen:HomeScreen,navigationOptions:{
      headerShown:false
    }},
    Details:{screen:DetailsScreen,navigationOptions:{
      headerShown:false
    }},
    
  },
  {
    initialRouteName:"Home"
  }
)
const AppContainer = createAppContainer(appStackNavigator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
