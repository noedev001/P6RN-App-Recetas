/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loader from '../screens/onboarning/Loader';
import ProfileUser from '../screens/profile/ProfileUser';

import DrawerNavigator from './DrawerNavigator';
import AddPostScreen from '../screens/post/AddPostScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Loader"
                component={Loader}
                options={{
                    headerShown: false,
                }}
            />

            {/* <Stack.Screen
                name="Tabs"
                component={Tabs}
                options={{
                    headerShown: false,
                }}
            /> */}

            <Stack.Screen
                name="DrawerNavigator"
                component={DrawerNavigator}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="AddPostScreen"
                component={AddPostScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="ProfileUser"
                component={ProfileUser}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );

};


export default RootNavigation;