/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState, useContext, useEffect } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ImageBackground, TextInput, Platform, Alert } from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../../constants';

import Animated from 'react-native-reanimated';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import ImagePicker from 'react-native-image-crop-picker';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { AuthContext } from '../../navigation/AuthProvider';

import { Picker } from '@react-native-picker/picker';

import { useNavigation } from '@react-navigation/native';

const ProfileUser = () => {

    const navigation = useNavigation();

    const [selectedDepartamento, setSelectedDepartamento] = useState('Seleccione Departamento..');


    const { user, logout } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [userData, setUserData] = useState(null);

    const getUser = async () => {
        const currentUser = await firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User Data', documentSnapshot.data());
                    setUserData(documentSnapshot.data());
                }
            })
    }


    const handleUpdate = async () => {
        let imgUrl = await uploadImage();

        if (imgUrl == null && userData.userImg) {
            imgUrl = userData.userImg;
        }

        firestore()
            .collection('users')
            .doc(user.uid)
            .update({
                fname: userData.fname,
                lname: userData.lname,
                about: userData.about,
                phone: userData.phone,
                country: userData.country,
                city: userData.city,
                userImg: imgUrl,
            })
            .then(() => {
                console.log('User Updated!');
                Alert.alert(
                    'Profile Updated!',
                    'Your profile has been updated successfully.'
                );
            })
    }

    const uploadImage = async () => {
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });

        try {
            await task;

            const url = await storageRef.getDownloadURL();

            setUploading(false);
            setImage(null);

            // Alert.alert(
            //   'Image uploaded!',
            //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
            // );
            return url;

        } catch (e) {
            console.log(e);
            return null;
        }

    };


    useEffect(() => {
        getUser();
    }, []);



    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
            this.bs.current.snapTo(1);
        });
    };


    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
            this.bs.current.snapTo(1);
        });
    };

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={takePhotoFromCamera}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={choosePhotoFromLibrary}>
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => this.bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    var bs = React.createRef();
    var fall = new Animated.Value(1);


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor={COLORS.primary} />
            <View style={{ height: 110, backgroundColor: COLORS.white }}>
                <View style={{ flex: 1, borderBottomLeftRadius: 35, borderBottomRightRadius: 35, backgroundColor: COLORS.primary }}>
                    <View style={{ marginTop: SIZES.padding * 2, marginHorizontal: SIZES.padding }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            >
                                <Image
                                    source={icons.back_arrow_icon}
                                    resizeMode="contain"
                                    style={{ width: 25, height: 25, tintColor: COLORS.white }}
                                />

                            </TouchableOpacity>
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Editar Perfil</Text>
                            <TouchableOpacity
                                disabled
                            >
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>



            {/* <BottomSheet
                ref={this.bs}
                snapPoints={[330, -5]}
                renderContent={renderInner()}
                renderHeader={renderHeader()}
                initialSnap={1}
                callbackNode={this.fall}
                enabledGestureInteraction={true}
            /> */}
            <Animated.View
                style={{
                    margin: 20,
                    opacity: Animated.add(0.6, Animated.multiply(this.fall, 1.0)),
                }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                        <View
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ImageBackground
                                source={{
                                    uri: /* image
                                        ? image
                                        : userData
                                            ? userData.userImg ||
                                            'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                                            : */ 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                                }}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <MaterialCommunityIcons
                                        name="camera"
                                        size={35}
                                        color="#fff"
                                        style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 10,
                                        }}
                                    />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                        {/* {userData ? userData.fname : ''} {userData ? userData.lname : ''} */}as
                    </Text>
                    {/* <Text>{user.uid}</Text> */}
                    <Text>asd</Text>
                </View>

                <View style={{ ...styles.action, marginTop: 30 }}>
                    <FontAwesome name="user-o" color={COLORS.primary} size={20} />
                    <TextInput
                        placeholder="Nombre"
                        placeholderTextColor={COLORS.primary}
                        autoCorrect={false}
                        /* value={userData ? userData.fname : ''} */
                        /* onChangeText={(txt) => setUserData({ ...userData, fname: txt })} */
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={COLORS.primary} size={20} />
                    <TextInput
                        placeholder="Apellido"
                        placeholderTextColor={COLORS.primary}
                        /*    value={userData ? userData.lname : ''}
                           onChangeText={(txt) => setUserData({ ...userData, lname: txt })} */
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.action}>
                    <Feather name="phone" color={COLORS.primary} size={20} />
                    <TextInput
                        placeholder="Numero"
                        placeholderTextColor={COLORS.primary}
                        keyboardType="number-pad"
                        autoCorrect={false}
                        /*  value={userData ? userData.phone : ''}
                         onChangeText={(txt) => setUserData({ ...userData, phone: txt })} */
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.action1}>
                    <FontAwesome name="globe" color={COLORS.primary} size={20} />
                    {/*  <TextInput
                        placeholder="Departamento"
                        placeholderTextColor={COLORS.primary}
                        autoCorrect={false}
                        /*     value={userData ? userData.country : ''}
                            onChangeText={(txt) => setUserData({ ...userData, country: txt })}
                        style={styles.textInput}
                    /> */}
                    <Picker
                        selectedValue={selectedDepartamento}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedDepartamento(itemValue)
                        }
                        style={{ ...styles.textInput, color: COLORS.black }}
                    >
                        <Picker.Item label="La Paz" value="La Paz" />
                        <Picker.Item label="El Alto" value="El Alto" />
                        <Picker.Item label="Santa Cruz" value="Santa Cruz" />
                        <Picker.Item label="Cochabamba" value="Cochabamba" />
                        <Picker.Item label="Potosi" value="Potosi" />
                        <Picker.Item label="Chuquisaca" value="Chuquisaca" />
                        <Picker.Item label="Tarija" value="Tarija" />
                        <Picker.Item label="Beni" value="Beni" />
                        <Picker.Item label="Oruro" value="Oruro" />
                        <Picker.Item label="Pando" value="Pando" />
                    </Picker>

                </View>
                <View style={styles.action}>
                    <MaterialCommunityIcons
                        name="map-marker-outline"
                        color={COLORS.primary}
                        size={20}
                    />
                    <TextInput
                        placeholder="Ciudad"
                        placeholderTextColor={COLORS.primary}
                        autoCorrect={false}
                        /*    value={userData ? userData.city : ''}
                           onChangeText={(txt) => setUserData({ ...userData, city: txt })} */
                        style={styles.textInput}
                    />
                </View>
                {/*  <FormButton buttonTitle="Update" onPress={handleUpdate} /> */}
            </Animated.View>

        </SafeAreaView>
    );
};

export default ProfileUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        width: '100%',
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2e64e5',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray3,
        paddingBottom: 5,
    },
    action1: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray3,
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -14,
        paddingLeft: 10,
        color: COLORS.black,
    },

});