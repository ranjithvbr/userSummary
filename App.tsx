import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Icon } from "@rneui/themed";
import Home from './pages/Home';
import AddUser from './pages/AddSummary';
import { Provider } from 'react-redux';
import { store } from "./reduxSaga/store";

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <Image
        style={styles.logo}
        source={require("./assets/company-logo.png")}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
      />
      <Drawer.Screen name="Add Employee" component={AddUser} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "auto",
    height: 40,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 5,
  },
});
