/* eslint-disable prettier/prettier */
import React, { useState, useContext, useEffect } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, ScrollView, Alert } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { AuthContext } from '../../navigation/AuthProvider';

import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, icons, SIZES } from '../../constants';

const AddPostScreen = () => {

    const navigation = useNavigation();
    const { user, logout } = useContext(AuthContext);

    const [post, setPost] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [nombre, setNombre] = useState(null);
    const [descripcion, setDescripcion] = useState(null);


    const [selectedCategoria, setSelectedCategoria] = useState('Seleccione Categoria..');

    useEffect(() => {
        fetchCategoria();
    });

    const actions = [
        {
            text: "Tomar Foto",
            icon: icons.camera,
            name: "bt_photo",
            position: 1,
            color: '#B5D1F0',
        },
        {
            text: "Eligir Foto",
            icon: icons.galery,
            name: "bt_galery",
            position: 2,
            color: '#CEB5ED',
        },
    ];



    const [image, setImage] = useState(null);

    const fetchCategoria = async () => {
        try {

            const listCategory = [];
            await firestore()
                .collection('categorias')
                .orderBy('nombre', 'asc')
                .get()
                .then((querySnapshot) => {
                    //console.log("total ", querySnapshot.size);

                    querySnapshot.forEach(doc => {
                        const { nombre } = doc.data();
                        listCategory.push(
                            {
                                id: doc.id,
                                name: nombre,
                            }
                        );
                    });

                    setSelectedCategoria(listCategory);

                });
        } catch (e) {
            console.log(e);
        }
    };



    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    };

    const submitPost = async () => {
        const imageUrl = await uploadImage();
        console.log('Image Url: ', imageUrl);
        console.log('Post: ', post);

        firestore()
            .collection('recetas')
            .add({
                nombre: nombre,
                userId: user.uid,
                descripcion: descripcion,
                postImg: imageUrl,
                categoria: null,
                postTime: firestore.Timestamp.fromDate(new Date()),
                likes: null,
                comments: null,
            })
            .then(() => {
                console.log('Post Added!');
                Alert.alert(
                    'Publicación publicada!',
                    'Tu publicación ha sido publicada con éxito!',
                );
                setPost(null);
            })
            .catch((error) => {
                console.log('Something went wrong with added post to firestore.', error);
            });
    };

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

        const storageRef = storage().ref(`recetas/${filename}`);
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


    return (
        <View style={styles.container}>
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
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Publicar Receta</Text>
                            <TouchableOpacity enabled />
                        </View>
                    </View>
                </View>

            </View>


            <ScrollView style={styles.post}>
                {image != null ? <Image style={styles.imagen} source={{ uri: image }} /> : null}
                <TextInput
                    placeholder="Cual es tu Receta?"
                    placeholderTextColor={COLORS.lightGray3}
                    autoCorrect={false}
                    onChangeText={(nombre) => setNombre(nombre)}
                    style={styles.textInput}
                    multiline
                    numberOfLines={4}

                />

                <Picker
                    selectedValue={selectedCategoria}
                    onValueChange={(itemValue) =>
                        setSelectedCategoria(itemValue)
                    }
                    style={{ ...styles.textInput, color: COLORS.black }}
                >
                    <Picker.Item label="La Paz" value="La Paz" />

                </Picker>
                <TextInput
                    placeholder="Descripcion..."
                    placeholderTextColor={COLORS.lightGray3}
                    autoCorrect={false}
                    onChangeText={(descripcion) => setDescripcion(descripcion)}
                    style={styles.textInput1}
                    multiline
                    numberOfLines={4}

                />

                <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                    <Button title="Publicar Receta"
                        buttonStyle={styles.styledButton}
                        titleStyle={styles.buttonTitle}
                        onPress={() => { submitPost(); }} />
                </View>
            </ScrollView>

            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    if (name === 'bt_photo') {
                        takePhotoFromCamera();
                    }
                    if (name === 'bt_galery') {
                        choosePhotoFromLibrary();
                    }
                }}
                color={COLORS.primary}
                showBackground={false}

            />
        </View>
    );
};

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    post: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    textInput: {
        marginTop: Platform.OS === 'ios' ? 0 : -14,
        color: COLORS.black,
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        paddingLeft: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    textInput1: {
        marginTop: Platform.OS === 'ios' ? 0 : -14,
        color: COLORS.black,
        fontSize: 14,
        fontWeight: 'bold',
        width: '98%',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 14,
        marginLeft: 5,
        marginRight: 5,
        borderColor: COLORS.lightGray3,
    },

    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    imagen: {
        width: '100%',
        height: 270,
        marginTop: 30,
        borderRadius: 10,
    },
    styledButton: {
        backgroundColor: COLORS.primary,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.primary,
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