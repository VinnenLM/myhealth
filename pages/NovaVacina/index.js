import React, { useEffect, useState } from 'react'
import { RadioButton } from 'react-native-paper';
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input';
import { db, storage } from '../../config/firebase'
import { addDoc, collection } from "firebase/firestore"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"
import { useSelector } from 'react-redux';
import PlaceHolder from '../../assets/imgs/placeholder.jpg'
import styles from './styles';

import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps'

export const NovaVacina = (props) => {

    const idUsuario = useSelector((state) => state.usuario.id)

    const [modalVisible, setModalVisible] = useState(false);
    const [dose, setDose] = useState('');
    const [nome, setNome] = useState('');
    const [dataVacina, setDataVacina] = useState('');
    const [proxVacina, setProxVacina] = useState('');
    const [comprovante, setComprovante] = useState('');
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    useEffect(() => {
        Geolocation.watchPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        },
            (error) => {
                alert(error)
            },
            {
                distanceFilter: 1
            }
        )
    }, [])

    const getLocation = () => {
        Geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }

    const touchOnMap = (e) => {
        setLatitude(e.nativeEvent.coordinate.latitude)
        setLongitude(e.nativeEvent.coordinate.longitude)
    }

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            getLocation()
            setDose('')
            setNome('')
            setDataVacina('')
            setProxVacina('')
            setComprovante('')
        });

    }, []);

    const salvarVacina = async () => {

        if (comprovante) {
            const file = await fetch(comprovante)
            const blob = await file.blob()

            const filename = "images/" + comprovante.split("-")[comprovante.split("-").length - 1]

            if (nome && dataVacina && dose) {

                uploadBytes(ref(storage, filename), blob)
                    .then((resposta) => {
                        getDownloadURL(ref(storage, resposta.ref.fullPath))
                            .then((urlDownload) => {
                                addDoc(collection(db, "MyHealth"), {
                                    nome: nome,
                                    dataVacina: dataVacina,
                                    dose: dose,
                                    proxVacina: proxVacina,
                                    comprovante: urlDownload,
                                    pathFoto: filename,
                                    idUsuario: idUsuario,
                                    latitude: latitude,
                                    longitude: longitude
                                })
                                props.navigation.navigate('Minhas Vacinas')
                            })
                            .catch((error) => {
                                console.log("Erro ao fazer upload do arquivo: " + error)
                            })
                    })
            } else {
                setModalVisible(true);
            }

        } else {
            setModalVisible(true);
        }

    }

    const showImagePicker = () => {
        launchImageLibrary()
            .then((result) => {
                setComprovante(result.assets[0].uri)
            })
            .catch((error) => {
                console.log("Erro ao capturar imagem: " + error)
            })
    }

    const showCamera = () => {
        launchCamera()
            .then((result) => {
                setComprovante(result.assets[0].uri)
            })
            .catch((error) => {
                console.log("Erro ao capturar imagem: " + error)
            })
    }

    return (
        <ScrollView style={styles.background} contentContainerStyle={{ alignItems: "center", }}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Preencha os campos corretamente</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonAceitar]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View>

                <View style={styles.container}>
                    <Text style={styles.label}>Próxima Vacinação</Text>
                    <MaskInput
                        style={styles.input}
                        value={dataVacina}
                        onChangeText={setDataVacina}
                        mask={Masks.DATE_DDMMYYYY}
                    />
                </View>


                <View style={styles.container}>
                    <Text style={styles.label}>Vacina</Text>
                    <TextInput style={styles.input} value={nome}
                        onChangeText={setNome} />
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Dose</Text>
                    <View style={styles.containerRadio}>
                        <View style={styles.containerRadios}>
                            <RadioButton
                                value="1a. dose"
                                color="#419ed7"
                                status={dose === '1a. dose' ? 'checked' : 'unchecked'}
                                onPress={() => setDose('1a. dose')}
                            />
                            <Text style={styles.radioLabel}>1a. dose</Text>
                        </View>
                        <View style={styles.containerRadios}>
                            <RadioButton
                                value="2a. dose"
                                color="#419ed7"
                                status={dose === '2a. dose' ? 'checked' : 'unchecked'}
                                onPress={() => setDose('2a. dose')}
                            />
                            <Text style={{ width: 71, margin: 5, color: 'white', fontSize: 14, marginLeft: 'auto', }}>2a. dose</Text>
                        </View>
                        <View style={styles.containerRadios}>
                            <RadioButton
                                value="3a. dose"
                                color="#419ed7"
                                status={dose === '3a. dose' ? 'checked' : 'unchecked'}
                                onPress={() => setDose('3a. dose')}
                            />
                            <Text style={styles.radioLabel}>3a. dose</Text>
                        </View>
                        <View style={styles.containerRadios}>
                            <RadioButton
                                value="Dose única"
                                color="#419ed7"
                                status={dose === 'Dose única' ? 'checked' : 'unchecked'}
                                onPress={() => setDose('Dose única')}
                            />
                            <Text style={styles.radioLabel}>Dose Única</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Comprovante</Text>

                    <View style={styles.containerImagem}>
                        <TouchableOpacity onPress={() => showCamera()}>
                            <Text style={[styles.btnTirarFoto, styles.sombra]}>
                                Tirar Foto
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showImagePicker()}>
                            <Text style={[styles.btnSelecionarFoto, styles.sombra]}>
                                Selecionar Imagem
                            </Text>
                        </TouchableOpacity>
                        {
                            (comprovante != '')
                                ?
                                <Image source={{ uri: comprovante }} style={{ marginTop: 20, width: 200, height: 100 }} />
                                :
                                <Image source={PlaceHolder} style={{ marginTop: 20, width: 200, height: 100 }} />
                        }
                    </View>

                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Próxima Vacinação</Text>
                    <MaskInput
                        style={styles.input}
                        value={proxVacina}
                        onChangeText={setProxVacina}
                        mask={Masks.DATE_DDMMYYYY}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Localização</Text>
                    <MapView
                        onPress={(e) => touchOnMap(e)}
                        loadingEnabled={true}
                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005
                        }}
                        style={{ width: 200, height: 200, elevation: 5, flex: 1 }}>
                        <Marker
                            coordinate={{ latitude: latitude, longitude: longitude }}
                            pinColor={"red"}
                        />
                    </MapView>

                </View>

            </View>

            <TouchableOpacity onPress={salvarVacina}>
                <Text style={[styles.btnCadastrar, styles.sombra]}>
                    Cadastrar
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}
