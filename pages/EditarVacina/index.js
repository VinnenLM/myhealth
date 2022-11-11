import React, { useEffect, useState } from 'react'
import { RadioButton } from 'react-native-paper';
import { Modal, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import styles from './styles'
import { useSelector } from 'react-redux';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const EditarVacina = (props) => {


    const editarVacina = async () => {
        const file = await fetch(comprovante)
        const blob = await file.blob()

        uploadBytes(ref(storage, pathFoto), blob)
            .then((resposta) => {
                getDownloadURL(ref(storage, resposta.ref.fullPath))
                    .then((urlDownload) => {
                        updateDoc(doc(db, "MyHealth", idVacina), {
                            nome: nome,
                            dataVacina: dataVacina,
                            dose: dose,
                            proxVacina: proxVacina,
                            comprovante: urlDownload,
                            pathFoto: pathFoto,
                            idUsuario: idUsuario
                        })
                            .then((retorno) => {
                                props.navigation.navigate('Minhas Vacinas')
                            })
                            .catch((error) => {
                                console.log("Error: " + error)
                            })
                    })
            })
    }

    const excluirVacina = () => {

        setModalVisible(!modalVisible)

        console.log(idVacina);
        console.log(pathFoto);

        deleteObject(ref(storage, pathFoto))
            .then(() => {
                deleteDoc(doc(db, "MyHealth", idVacina))
                    .then(() => {
                        props.navigation.navigate('Minhas Vacinas')
                    })
            })
            .catch((error) => {
                console.log("Erro ao excluir a imagem.")
            })


    }

    const idUsuario = useSelector((state) => state.usuario.id)

    const [modalVisible, setModalVisible] = useState(false);
    const [idVacina, setIdVacina] = useState('');
    const [dose, setDose] = useState('');
    const [dataVacina, setDataVacina] = useState('');
    const [proxVacina, setProxVacina] = useState('');
    const [nome, setNome] = useState('');
    const [comprovante, setComprovante] = useState('');
    const [pathFoto, setPathFoto] = useState('');

    useEffect(() => {
        getDoc(doc(db, "MyHealth", `${props.route.params.id}`))
            .then((doc) => {
                setIdVacina(props.route.params.id)
                setDataVacina(doc.data().dataVacina)
                setProxVacina((doc.data().proxVacina) ? (doc.data().proxVacina) : '')
                setNome(doc.data().nome)
                setDose(doc.data().dose)
                setComprovante(doc.data().comprovante)
                setPathFoto(doc.data().pathFoto)
            })
            .catch((error) => {
                console.log("Erro: " + error)
            })
    }, [props.route.params.id])

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

        <View style={styles.background}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Tem certeza que deseja remover essa vacina?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonAceitar]}
                                onPress={() => excluirVacina()}>
                                <Text style={styles.textStyle}>SIM</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonCancelar]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>CANCELAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View>

                <View style={styles.container}>
                    <Text style={styles.label}>Data da Vacinação</Text>
                    <MaskInput
                        style={styles.input}
                        value={dataVacina}
                        onChangeText={setDataVacina}
                        mask={Masks.DATE_DDMMYYYY}
                    />
                </View>


                <View style={styles.container}>
                    <Text style={styles.label}>Vacina</Text>
                    <TextInput style={styles.input} value={nome} onChangeText={setNome} />
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
                            <Text style={styles.label}>1a. dose</Text>
                        </View>
                        <View style={styles.containerRadios}>
                            <RadioButton
                                value="2a. dose"
                                color="#419ed7"
                                status={dose === '2a. dose' ? 'checked' : 'unchecked'}
                                onPress={() => setDose('2a. dose')}
                            />
                            <Text style={{ width: 75, margin: 5, color: 'white', fontSize: 15, marginLeft: 'auto', }}>2a. dose</Text>
                        </View>
                        <View style={styles.containerRadios}>
                            <RadioButton
                                value="3a. dose"
                                color="#419ed7"
                                status={dose === '3a. dose' ? 'checked' : 'unchecked'}
                                onPress={() => setDose('3a. dose')}
                            />
                            <Text style={styles.label}>3a. dose</Text>
                        </View>
                        <View style={styles.containerRadios}>
                            <RadioButton
                                value="Dose única"
                                color="#419ed7"
                                status={dose === 'Dose única' ? 'checked' : 'unchecked'}
                                onPress={() => setDose('Dose única')}
                            />
                            <Text style={styles.label}>Dose única</Text>
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
                                setComprovante('file:///data/user/0/com.myhealth/cache/rn_image_picker_lib_temp_91975286-39bb-4c9d-a700-7203ded35886.jpg') &&
                                <Image source={{ uri: comprovante }} style={{ marginTop: 20, width: 200, height: 100 }} />
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

            </View>

            <TouchableOpacity onPress={() => editarVacina()}>
                <Text style={[styles.btnSalvar, styles.sombra]}>
                    Salvar Alterações
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={[styles.btnExcluir, styles.sombra]}>
                    Excluir
                </Text>
            </TouchableOpacity>

        </View>
    );
}
