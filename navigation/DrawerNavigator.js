/* eslint-disable prettier/prettier */
import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from '../component/CustonDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Home, Category, Favorite, Profile } from '../screens/main-screens';

import Tabs from './Tabs';
import { COLORS } from '../constants';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: COLORS.primary,
                drawerActiveTintColor: COLORS.white,
                drawerInactiveTintColor: COLORS.lightGray3,
                drawerLabelStyle: {
                    marginLeft: -20,
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                    fontWeight: 'bold',
                },
            }}
        >
            <Drawer.Screen name="Home" component={Tabs} options={{

                drawerIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={22} color={color} />
                ),

            }} />
            <Drawer.Screen name="Categorias" component={Category} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={22} color={color} />
                ),
            }} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
