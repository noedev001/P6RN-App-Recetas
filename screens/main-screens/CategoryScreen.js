/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, StatusBar, FlatList } from 'react-native';
import { FONTS, COLORS, icons, SIZES, images } from '../../constants';
import { Icon } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-virtualized-view';

import LottieView from 'lottie-react-native';


import { useNavigation } from '@react-navigation/native';

const CategoryScreen = () => {

    const navigation = useNavigation();

    const colors = ['#CEB5ED', '#F4DBA1', '#B5D1F0', '#F7D0CB'];

    useEffect(() => {
        fetchCategory();
    }, []);


    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCategory = async () => {
        try {

            const listCategory = [];
            var cont = 0;
            var i = 0;
            await firestore()
                .collection('categorias')
                .orderBy('nombre', 'asc')
                .get()
                .then((querySnapshot) => {
                    //console.log("total ", querySnapshot.size);

                    querySnapshot.forEach(doc => {
                        const { nombre, imagen } = doc.data();
                        listCategory.push(
                            {
                                id: doc.id,
                                name: nombre,
                                image: imagen,
                                color: colors[cont],
                                num: i,
                            }
                        );
                        cont++;
                        i++;
                        if (cont >= 4) {
                            cont = 0;
                        }
                    });

                    //console.log(listCategory);
                    setCategory(listCategory);

                    if (loading) {
                        setLoading(false);
                    }
                });
        } catch (e) {
            console.log(e);
        }
    };



    function renderCategoryData() {

        const renderItem = ({ item }) => {
            return (
                <View style={{ marginTop: 20, backgroundColor: `${item.color}`, borderRadius: 14 }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => {/* navigation.navigate('BookDetail', {
                            book: item,
                        }) */
                        }}
                    >
                        <Image
                            source={{ uri: item.image }}
                            resizeMode="cover"
                            style={{ width: 160, height: 150, borderRadius: 10 }}
                        />
                        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 50 }}>
                            <Text style={{ color: COLORS.white, ...FONTS.largeTitle }}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );

        };

        return (
            <View style={{ flex: 1, marginTop: 25, marginHorizontal: SIZES.padding }} >
                <FlatList
                    data={category}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View >
        );
    }


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
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Categorias</Text>
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

            {loading ? (
                <>
                    <View style={styles.loader}>
                        <LottieView
                            source={images.loader1}
                            autoPlay
                            loop
                        />
                    </View>
                </>
            ) : (
                <>
                    <ScrollView style={{ backgroundColor: COLORS.white, marginBottom: '1%' }}
                        showsVerticalScrollIndicator={false}

                    >
                        <View style={{ backgroundColor: COLORS.white }}>
                            {renderCategoryData()}
                        </View>

                    </ScrollView>
                </>
            )
            }

        </SafeAreaView>
    );
};

export default CategoryScreen;

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
    loader: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        zIndex: 1,
        marginTop: 20,
    },
});