/* eslint-disable prettier/prettier */
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { images, FONTS, COLORS } from '../../constants';

const Loader = ({ navigation }) => {

    React.useEffect(() => {
        loaderTime();
    });


    const loaderTime = async () => {
        setTimeout(() => { navigation.navigate('DrawerNavigator'); }, 4000);
    };


    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="white" />
            <LottieView
                source={images.loader}
                autoPlay
                loop
            />
        </View>
    );
};

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        zIndex: 1,
        marginTop: 20,
    },
    title: {
        ...FONTS.h1,
        color: COLORS.primary,
        marginBottom: 100,
        marginTop: 60,
    },

});
