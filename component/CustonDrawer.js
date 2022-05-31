/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, images } from '../constants';

import { AuthContext } from '../navigation/AuthProvider';

const CustomDrawer = props => {

    const { user, logout } = useContext(AuthContext);
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: COLORS.primary }}>
                <ImageBackground
                    source={images.drawermenu}
                    style={{ padding: 20 }}>
                    <Image
                        source={images.saboresbolivianos}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 18,
                            fontFamily: 'Roboto-Medium',
                            marginBottom: 5,
                        }}>
                        {user.uname ? user.name : 'SABORES BOLIVIANOS'}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                color: '#fff',
                                fontFamily: 'Roboto-Regular',
                                marginRight: 5,
                            }}>
                            Bienvenido a Sabores Bolivianos
                        </Text>
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="share-social-outline" size={22} style={{ color: COLORS.primary }} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'Roboto-Medium',
                                marginLeft: 5,
                            }}>
                            Compartir con amigos
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { logout(); }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} style={{ color: COLORS.primary }} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'Roboto-Medium',
                                marginLeft: 5,
                            }}>
                            Salir
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;