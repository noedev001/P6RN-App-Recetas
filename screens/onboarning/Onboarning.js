/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS, images } from '../../constants';



const data = [
    {
        title: 'Sabores Bolivianos',
        text: 'Una App donde donde podras compartir y distrutar de distintas recetas.',
        image: images.onboarnig1,
    },
    {
        title: 'Platos típicos',
        text: 'Recetas de variedas de paltos a nivel nacional.',
        image: images.plato1,
    },
    {
        title: 'Postres y jugos',
        text: 'Variedad de recetas de potres y jugos.',
        image: images.plato2,
    },
];

const Onboarding = () => {

    const navigation = useNavigation();
    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Image source={item.image} style={styles.image} resizeMode="contain" />
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </View>
        );
    };

    const keyExtractor = (item) => item.title;

    const renderNextButton = () => {
        return (
            <View style={styles.rightTextWrapper}>
                <Text style={styles.rightText}>Siguiente</Text>
            </View>
        );
    };

    const renderDoneButton = () => {
        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate("Login"); }}
            >
                <LinearGradient
                    colors={['#FFF', '#FFF']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.doneButtonWrapper}
                >
                    <Text style={styles.doneButtonText}>Inicio</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    const renderPrevButton = () => {
        return (
            <View style={styles.leftTextWrapper}>
                <Text style={styles.leftText}>Atras</Text>
            </View>
        );
    };



    return (
        <View style={{ flex: 1, }}>
            <StatusBar translucent backgroundColor="transparent" />
            <AppIntroSlider
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                data={data}
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
                renderDoneButton={renderDoneButton}
                renderNextButton={renderNextButton}
                renderPrevButton={renderPrevButton}
                showPrevButton

            />
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
    },
    image: {
        marginVertical: 60,
        borderRadius: 5,
    },
    title: {
        color: COLORS.white,
        textAlign: 'center',
        fontWeight: 'bold',
        ...FONTS.largeTitle,
        marginHorizontal: 60,
    },
    text: {
        fontSize: 16,
        color: COLORS.white,
        textAlign: 'center',
        fontFamily: 'OpenSans-SemiBold',
        marginHorizontal: 60,
        marginTop: 20,
    },
    dotStyle: {
        backgroundColor: COLORS.lightGray4,
    },
    activeDotStyle: {
        backgroundColor: COLORS.white,
        aspectRatio: 0.6,
        elevation: 5,
    },
    rightTextWrapper: {
        width: 70,
        height: 40,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    rightText: {
        color: COLORS.white,
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14,
        fontWeight: 'bold',
    },
    leftTextWrapper: {
        width: 40,
        height: 40,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    leftText: {
        color: COLORS.white,
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14,
        fontWeight: 'bold',
    },
    doneButtonWrapper: {
        flex: 1,
        paddingLeft: 35,
        paddingRight: 50,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: -40,
    },
    doneButtonText: {
        fontSize: 14,
        fontFamily: 'OpenSans-SemiBold',
        textAlign: 'center',
        color: COLORS.primary,
        fontWeight: 'bold',
    },
});

export default Onboarding;