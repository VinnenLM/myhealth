import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'

export const CriarConta = (props) => {

    const [checked, setChecked] = useState('');

    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#add4d1',
            flex: 1,
            alignItems: "center",
            paddingTop: 70
        },
        container: {
            flexDirection: 'row',
            marginBottom: 20,
        },
        containerRadio: {
            width: 252,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: -20
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
            marginTop: 120,
            backgroundColor: 'green',
            textAlign: 'center',
            paddingVertical: 10,
            paddingHorizontal: 32,
            width: 220,
            color: 'white',
            fontSize: 20,
            shadowColor: 'black',
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
                    <Text style={styles.label}>Nome completo</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Sexo</Text>
                    <View style={styles.containerRadio}>
                        <View style={styles.container}>
                            <RadioButton
                                value="masculino"
                                color="#419ed7"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                            />
                            <Text style={styles.label}>Masculino</Text>
                        </View>
                        <View style={styles.container}>
                            <RadioButton
                                value="feminino"
                                color="#419ed7"
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('second')}
                            />
                            <Text style={styles.label}>Feminino</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Data nascimento</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Repetir Senha</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>

            </View>

            <TouchableOpacity>
                <Text style={[styles.btnCadastrar, styles.sombra]}>
                    Cadastrar
                </Text>
            </TouchableOpacity>

        </View>
    );
}
