/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, Image, Platform } from 'react-native';
import { Button, Icon, SocialIcon } from 'react-native-elements';
import { COLORS, SIZES, images } from '../../constants';
import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../navigation/AuthProvider';

const Login = () => {

    const navigation = useNavigation();

    const [textInput1Fossued, setTextInput1Fossued] = React.useState(false);
    const [textInput2Fossued, setTextInputFossued] = React.useState(false);
    const textInput1 = React.useRef(1);
    const textInput2 = React.useRef(2);


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { login, googleLogin, fbLogin } = useContext(AuthContext);

    return (

        <View style={styles.container}>
            <StatusBar translucent backgroundColor={COLORS.primary} />
            <View style={styles.header}>
                <View style={{ marginLeft: 20 }}>
                    {/*   <Icon type="material-community"
                        name="arrow-left"
                        color={COLORS.primary}
                        size={28}
                        onPress={() => { navigation.goBack(); }}
                    /> */}
                </View>
            </View>
            <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Text style={styles.title}>Bienvenido</Text>
                <Image source={images.onboarnig1} style={styles.imageLogo} resizeMode="contain" />
            </View>
            <View style={{ alignItems: 'center', margin: 5 }}>
                <Text style={styles.text1}>
                    Por favor ingrese el correo electrónico y la contraseña
                </Text>
                <Text style={styles.text1}> registrado con su cuenta</Text>
            </View>

            {/* Text Label  */}

            <View style={{ marginTop: 10 }}>
                <View style={styles.TextInput1}>
                    <Animatable.View animation={textInput1Fossued ? '' : 'fadeInRight'} duration={400} >
                        <Icon name="email"
                            iconStyle={{ color: COLORS.primary }}
                            type="material"
                            style={{ margin: 10 }}
                        />
                    </Animatable.View>
                    <TextInput style={{ width: '90%', color: COLORS.black, fontSize: 16 }}
                        placeholder="Email"
                        placeholderTextColor={COLORS.lightGray4}
                        ref={textInput1}
                        type="email"

                        onFocus={() => {
                            setTextInput1Fossued(false);
                        }}
                        onBlur={() => { setTextInput1Fossued(true); }}
                        keyboardType="email-address"
                        onChangeText={(userEmail) => setEmail(userEmail)}
                    />
                </View>
                <View style={styles.TextInput2}>
                    <Animatable.View animation={textInput2Fossued ? '' : 'fadeInRight'} duration={400} >
                        <Icon name="lock"
                            iconStyle={{ color: COLORS.primary }}
                            type="material"
                            style={{}}
                        />
                    </Animatable.View>
                    <TextInput style={{ width: '80%', color: COLORS.black, fontSize: 16 }}
                        placeholder="Password"
                        ref={textInput2}
                        type="password"
                        placeholderTextColor={COLORS.lightGray4}
                        onFocus={() => {
                            setTextInputFossued(false);
                        }}
                        onBlur={() => { setTextInputFossued(true); }}
                        secureTextEntry={true}
                        onChangeText={(userPassword) => setPassword(userPassword)}
                    />

                    <Animatable.View animation={textInput2Fossued ? '' : 'fadeInLeft'} duration={400} >
                        <Icon name="visibility-off"
                            iconStyle={{ color: COLORS.primary }}
                            type="material"
                            style={{ margin: 10 }}
                        />
                    </Animatable.View>
                </View>
            </View>


            {/*BUTTON */}

            <View style={{ marginHorizontal: 20, marginTop: 25 }}>
                <Button title="INICIAR SESIÓN"
                    buttonStyle={styles.styledButton}
                    titleStyle={styles.buttonTitle}
                    onPress={() => { login(email, password); }} />
            </View>



            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity
                    onPress={() => { }}>
                    <Text style={{ textDecorationLine: 'underline', color: COLORS.primary, fontSize: 18, fontWeight: 'bold' }}>Se olvido su constraseña ?</Text>
                </TouchableOpacity>
            </View>

            {Platform.OS === 'android' ? (
                <View>
                    <View style={{ marginHorizontal: 20, marginVertical: 2, marginTop: 15 }}>
                        <SocialIcon
                            title="Iniciar sesión con Facebook"
                            button
                            type="facebook"
                            style={styles.SocialIcon}

                            onPress={() => { fbLogin(); }}
                        />
                    </View>

                    <View style={{ marginHorizontal: 20, marginVertical: 2 }}>
                        <SocialIcon
                            title="Iniciar sesión con Google"
                            button
                            type="google"
                            style={styles.SocialIcon}
                            onPress={() => { googleLogin(); }}
                        />
                    </View>
                </View>
            ) : null}

            <View style={{ marginTop: 25, marginLeft: 30 }}>
                <Text style={{ ...styles.text1, color: COLORS.black }}>Nuevo en Sabores Bolivianos?</Text>
            </View>

            <View style={{ alignItems: 'flex-end', marginHorizontal: 30, marginVertical: 10 }}>
                <Button
                    title="Crear Cuenta"
                    buttonStyle={styles.createButton}
                    titleStyle={styles.createbuttonTitle}
                    onPress={() => { navigation.navigate('CreateAccount'); }}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        top: 40,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        height: SIZES.padding,
    },
    title: {
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },
    text1: {
        color: COLORS.black,
        fontSize: 14,
    },
    TextInput1: {
        borderWidth: 1,
        borderColor: '#86939e',
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 10,
        paddingLeft: 5,
        flexDirection: 'row',

    },
    TextInput2: {
        borderWidth: 1,
        borderRadius: 12,
        marginHorizontal: 20,
        borderColor: '#86939e',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
    },

    styledButton: {
        backgroundColor: COLORS.primary,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ff8c52',
        heigth: 50,
        paddingHorizontal: 20,
        width: '100%',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -3,
    },
    createButton: {
        backgroundColor: COLORS.white,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.primary,
        height: 40,
        paddingHorizontal: 20,
    },
    createbuttonTitle: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -3,

    },
    SocialIcon: {
        borderRadius: 14,
        height: 50,
        elevation: 6.5,
    },
    imageLogo: {
        height: 150,
    },
});

export default Login;
