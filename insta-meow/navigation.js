import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import NewPostScreen from "./screens/NewPostScreen";
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false
}

const SignedInStack = () => {
    return (
<NavigationContainer>
        <Stack.Navigator
            initialRouteName='LogInScreen'
            screenOptions={screenOptions}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="LogInScreen" component={LoginScreen}/>
            <Stack.Screen name="NewPostScreen" component={NewPostScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    );   
}

const styles = StyleSheet.create({})

export default SignedInStack;
