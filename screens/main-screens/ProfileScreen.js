/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image } from 'react-native';
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';
import { AuthContext } from '../../navigation/AuthProvider';


import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

    const navigation = useNavigation();

    const { user, logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={COLORS.primary} />
            <View style={{ height: 110, backgroundColor: COLORS.white }}>
                <View style={{ flex: 1, borderBottomLeftRadius: 35, borderBottomRightRadius: 35, backgroundColor: COLORS.primary }}>
                    <View style={{ marginTop: SIZES.padding * 2, marginHorizontal: SIZES.padding }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.openDrawer();
                                }}
                            >
                                <Image
                                    source={icons.menu}
                                    resizeMode="contain"
                                    style={{ width: 30, height: 30, tintColor: COLORS.white }}
                                />

                            </TouchableOpacity>
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Perfil</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('AddPostScreen');
                                }}
                            >
                                <Image
                                    source={icons.share}
                                    resizeMode="contain"
                                    style={{ width: 25, height: 25, tintColor: COLORS.white }}
                                />

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>

            <View style={styles.profile}>

                <Image
                    source={images.user}
                    resizeMode="contain"
                    style={styles.imagen}
                />

                <View style={{ marginTop: 10, marginBottom: 15 }}>
                    <Text style={{ color: COLORS.black, ...FONTS.h2, textAlign: 'center' }}>nombre</Text>
                    <Text style={{ color: COLORS.lightGray4, ...FONTS.body3, textAlign: 'center' }}>asdasd</Text>
                </View>

                <TouchableOpacity
                    style={styles.buttonProfile}
                    onPress={() => { navigation.navigate('ProfileUser'); }}
                >
                    <Text style={styles.buttonTitle}>Actualizar Perfil</Text>
                </TouchableOpacity>

                <View style={{ backgroundColor: COLORS.white, marginTop: 20, borderRadius: 14, elevation: 20 }}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 40, marginVertical: 15 }}>
                        <View style={{ marginRight: 15 }}>
                            <Text style={{ ...FONTS.h3, textAlign: 'center', color: COLORS.black }}>123</Text>
                            <Text style={{ ...FONTS.body4, color: COLORS.lightGray3, textAlign: 'center' }}>Recetas</Text>
                        </View>
                        <View style={{ marginRight: 15 }}>
                            <Text style={{ ...FONTS.h3, textAlign: 'center', color: COLORS.black }}>123</Text>
                            <Text style={{ ...FONTS.body4, color: COLORS.lightGray3, textAlign: 'center' }}>Vistas</Text>
                        </View>
                        <View style={{ marginRight: 15 }}>
                            <Text style={{ ...FONTS.h3, textAlign: 'center', color: COLORS.black }}>123</Text>
                            <Text style={{ ...FONTS.body4, color: COLORS.lightGray3, textAlign: 'center' }}>Compartidos</Text>
                        </View>
                        <View >
                            <Text style={{ ...FONTS.h3, textAlign: 'center', color: COLORS.black }}>123</Text>
                            <Text style={{ ...FONTS.body4, color: COLORS.lightGray3, textAlign: 'center' }}>Comentarios</Text>
                        </View>
                    </View>
                </View>


            </View>

        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    profile: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagen: {
        width: 150,
        height: 150,
        borderRadius: 120,
        marginTop: 25,
    },
    buttonProfile: {
        backgroundColor: COLORS.primary,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.primary,
        heigth: 60,
        alignItems: 'center',
        width: '50%',
        padding: 10,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -3,
    },
});