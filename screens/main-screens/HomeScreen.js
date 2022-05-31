/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, StatusBar } from 'react-native';
import { images, FONTS, COLORS, icons, SIZES } from '../../constants';
import { Icon } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor={COLORS.primary} />
            <View style={{ height: 190, backgroundColor: COLORS.white }}>
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
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Home</Text>
                            <TouchableOpacity
                                onPress={() => {

                                }}
                            >
                                <Image
                                    source={icons.person}
                                    resizeMode="contain"
                                    style={{ width: 20, height: 20, tintColor: COLORS.primary }}
                                />

                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: SIZES.base * 4, height: 45 }}>
                            <View style={styles.TextInput2}>
                                <TextInput style={{ width: '80%', color: COLORS.black, fontSize: 14, fontWeight: 'bold' }}
                                    placeholder="Buscar"
                                    placeholderTextColor={COLORS.lightGray3}
                                    keyboardType={'default'}
                                />

                                <TouchableOpacity
                                    onPress={() => { }}
                                >
                                    <Icon name="search"
                                        iconStyle={{ color: COLORS.primary }}
                                        size={28}
                                        type="material"
                                        style={{ marginRight: 14 }}
                                    />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </View>

            </View>


            <View style={{ backgroundColor: COLORS.white, marginTop: 20 }}>

                <View style={{ marginTop: SIZES.font, marginHorizontal: SIZES.padding }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => { }}>
                            <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>Todo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { }}>
                            <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>Postres</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { }}>
                            <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>Sopas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { }}>
                            <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>Ensaladas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { }}>
                            <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>Panes</Text>
                        </TouchableOpacity>
                    </View>



                    <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => { }}
                            >
                                <Image
                                    source={images.plant5}
                                    resizeMode="cover"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 20,
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flex: 1, marginTop: SIZES.font }}
                                onPress={() => { }}
                            >
                                <Image
                                    source={images.plant6}
                                    resizeMode="cover"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 20,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1.3 }}>
                            <TouchableOpacity
                                style={{ flex: 1, marginLeft: SIZES.font }}
                                onPress={() => { }}
                            >
                                <Image
                                    source={images.plant7}
                                    resizeMode="cover"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 20,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    TextInput2: {
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 0,
        borderColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        marginBottom: 5,
        backgroundColor: COLORS.white,
    },
});