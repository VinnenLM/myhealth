import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input';
import { uuidv4 } from 'uuid';

export const NovaVacina = (props) => {

    function novaVacina() {
        props.navigation.navigate('Minhas Vacinas', {
            itemAdicionar: {
                id: uuidv4,
                nome: nome,
                data: dataVacina,
                dose: checked,
                proxima: proxVacina
            }
        })
        setDataVacina('')
        setProxVacina('')
        setNome('')
        setChecked('')
    }

    const [checked, setChecked] = useState('');
    const [nome, setNome] = useState('');
    const [dataVacina, setDataVacina] = useState('');
    const [proxVacina, setProxVacina] = useState('');

    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#add4d1',
            flex: 1,
            alignItems: "center",
            paddingTop: 30
        },
        container: {
            flexDirection: 'row',
            marginBottom: 20,
        },
        containerRadio: {
            width: 252,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: -20,
            flexWrap: "wrap"
        },
        label: {
            margin: 5,
            color: 'white',
            fontSize: 15,
            marginLeft: 'auto',
        },
        input: {
            backgroundColor: 'white',
            width: 250,
            height: 30,
            fontSize: 15,
            color: '#499dcd',
            paddingBottom: 5
        },
        btnCadastrar: {
            marginTop: 50,
            backgroundColor: 'green',
            textAlign: 'center',
            paddingVertical: 10,
            width: 150,
            color: 'white',
            fontSize: 15,
        },
        sombra: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 7,
            elevation: 15,
        }
    });

    return (
        <View style={styles.background}>

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
                        <View style={styles.container}>
                            <RadioButton
                                value="1a. dose"
                                color="#419ed7"
                                status={checked === '1a. dose' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('1a. dose')}
                            />
                            <Text style={styles.label}>1a. dose</Text>
                        </View>
                        <View style={styles.container}>
                            <RadioButton
                                value="2a. dose"
                                color="#419ed7"
                                status={checked === '2a. dose' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('2a. dose')}
                            />
                            <Text style={styles.label}>2a. dose</Text>
                        </View>
                        <View style={styles.container}>
                            <RadioButton
                                value="3a. dose"
                                color="#419ed7"
                                status={checked === '3a. dose' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('3a. dose')}
                            />
                            <Text style={styles.label}>3a. dose</Text>
                        </View>
                        <View style={styles.container}>
                            <RadioButton
                                value="Dose única"
                                color="#419ed7"
                                status={checked === 'Dose única' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Dose única')}
                            />
                            <Text style={styles.label}>Dose única</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Comprovante</Text>
                    <TextInput style={styles.input}></TextInput>
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

            <TouchableOpacity onPress={novaVacina}>
                <Text style={[styles.btnCadastrar, styles.sombra]}>
                    Cadastrar
                </Text>
            </TouchableOpacity>

        </View>
    );
}
