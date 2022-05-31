/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Category, Favorite, Profile } from '../screens/main-screens';
import { icons, COLORS } from '../constants';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();


const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: COLORS.white, height: '6%', borderColor: COLORS.white, borderStartColor: COLORS.white },
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.primary : COLORS.gray;

                    switch (route.name) {
                        case 'HomeScreen':
                            return (
                                <Image
                                    source={icons.home2}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 30,
                                        height: 30,
                                    }}
                                />

                            );

                        case 'CategoryScreen':
                            return (
                                <Image
                                    source={icons.category}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                            );

                        case 'FavoriteScreen':
                            return (
                                <Image
                                    source={icons.favorite}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                            );

                        case 'ProfileScreen':
                            return (
                                <Image
                                    source={icons.user}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                            );
                    }
                },
            })}
        >
            <Tab.Screen
                name="HomeScreen"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,

                }}
            />
            <Tab.Screen
                name="CategoryScreen"
                component={Category}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            />
            <Tab.Screen
                name="FavoriteScreen"
                component={Favorite}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            />
        </Tab.Navigator >
    );
};

export default Tabs;
