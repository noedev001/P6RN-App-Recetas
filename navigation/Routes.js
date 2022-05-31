/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import AuthStack from './RootNavigationStack';


import RootNavigation from './RootNavigation';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: 'transparent',
    },
};


const Routes = () => {
    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;


    return (
        <NavigationContainer theme={theme}>
            {user ? <RootNavigation /> : <AuthStack />
            }
        </NavigationContainer >
    );
};

export default Routes;