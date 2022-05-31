/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login/Login';
import Onboarding from '../screens/onboarning/Onboarning';
import CreateAccount from '../screens/login/CreateAccount';


import AsyncStorage from '@react-native-async-storage/async-storage';

/* import { GoogleSignin } from '@react-native-community/google-signin'; */

import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();



const RootNavigationStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

    React.useEffect(() => {
        AsyncStorage.getItem('alreadyLaunch').then(value => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunch', 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });

        GoogleSignin.configure({
            webClientId: 'poner la clave',
            offlineAccess: true,
        });
    }, []);

    if (isFirstLaunch == null) {
        return null;
    } else if (isFirstLaunch === true) {
        return (

            <Stack.Navigator>
                <Stack.Screen
                    name="Onboarning"
                    component={Onboarding}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="CreateAccount"
                    component={CreateAccount}
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack.Navigator>

        );
    } else {
        return (<Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CreateAccount"
                component={CreateAccount}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>);
    }
};

export default RootNavigationStack;