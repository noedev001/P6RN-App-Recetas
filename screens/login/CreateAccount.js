/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { Icon, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../navigation/AuthProvider';

const CreateAccount = () => {

    const navigation = useNavigation();

    const [textInputNameFossued, setTextInputNameFossued] = React.useState(false);
    const [textInput1Fossued, setTextInput1Fossued] = React.useState(false);
    const [textInput2Fossued, setTextInput2Fossued] = React.useState(false);
    const [textInputCellFossued, setTextInputCellFossued] = React.useState(false);

    const textInputName = React.useRef(1);
    const textInput1 = React.useRef(1);
    const textInput2 = React.useRef(1);
    const textInputCell = React.useRef(1);


    /* Crear Cuenta en Firebase */

    const { register } = useContext(AuthContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();



    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={COLORS.primary} />
            <View style={styles.header}>
                <View style={{ marginLeft: 20 }}>
                    <Icon type="material-community"
                        name="arrow-left"
                        color={COLORS.primary}
                        size={28}
                        onPress={() => { navigation.goBack(); }}
                    />
                </View>
            </View>

            <View style={{ marginTop: 90, alignItems: 'center' }}>
                <Text style={styles.title}>Crear una Cuenta Nueva</Text>
            </View>


            {/* Text Label  */}

            <View style={{ marginTop: 50 }}>
                <View style={styles.TextInput1}>
                    <Animatable.View animation={textInputNameFossued ? '' : 'fadeInRight'} duration={400} >
                        <Icon name="person"
                            iconStyle={{ color: COLORS.primary }}
                            type="material"
                            style={{ margin: 10 }}
                        />
                    </Animatable.View>
                    <TextInput style={{ width: '90%', color: COLORS.black, fontSize: 16 }}
                        placeholder="Ingrese su Nombre"
                        placeholderTextColor={COLORS.lightGray4}
                        ref={textInputName}
                        type="text"

                        onFocus={() => {
                            setTextInputNameFossued(false);
                        }}
                        onBlur={() => { setTextInputNameFossued(true); }}
                        keyboardType="default"
                    />
                </View>


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
                        onChangeText={(userEmail) => setEmail(userEmail)}
                        keyboardType="email-address"
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
                            setTextInput2Fossued(false);
                        }}
                        onBlur={() => { setTextInput2Fossued(true); }}
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

                <View style={styles.TextInput1}>
                    <Animatable.View animation={textInputCellFossued ? '' : 'fadeInRight'} duration={400} >
                        <Icon name="phone-iphone"
                            iconStyle={{ color: COLORS.primary }}
                            type="material"
                            style={{ margin: 10 }}
                        />
                    </Animatable.View>
                    <TextInput style={{ width: '90%', color: COLORS.black, fontSize: 16 }}
                        placeholder="Numero de celular"
                        placeholderTextColor={COLORS.lightGray4}
                        ref={textInputCell}
                        type="numeric"

                        onFocus={() => {
                            setTextInputCellFossued(false);
                        }}
                        onBlur={() => { setTextInputCellFossued(true); }}
                        keyboardType="phone-pad"
                    />
                </View>
            </View>


            {/*BUTTON */}

            <View style={{ marginHorizontal: 20, marginTop: 35 }}>
                <Button title="Crear Cuenta"
                    buttonStyle={styles.styledButton}
                    titleStyle={styles.buttonTitle}
                    onPress={() => { register(email, password); }} />
            </View>


        </View>
    );
};

export default CreateAccount;

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
    TextInput1: {
        borderWidth: 1.5,
        borderColor: COLORS.secondary,
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
        paddingLeft: 5,
        flexDirection: 'row',

    },
    TextInput2: {
        borderWidth: 1.5,
        borderRadius: 12,
        marginHorizontal: 20,
        borderColor: COLORS.secondary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        marginBottom: 20,
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
});
