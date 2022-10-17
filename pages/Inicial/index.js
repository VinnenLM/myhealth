import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import "../../config/firebase";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ActivityIndicator } from 'react-native-paper';

export const Inicial = (props) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msg, setMsg] = useState('');
    const [isLoading, setLoading] = useState(false)

    /*const autenticar = (event) => {
        event.preventDefault();
        console.log(email);
        console.log(senha);

        setLoading(true)

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, senha)
            .then((user) => {
                console.log(JSON.stringify(user))
                setMsg('Deu bom')
                setLoading(false)
                showHome()
            })
            .catch((error) => {
                setLoading(false)
                console.log("Erro ao autenticar: " + error)
                setMsg('E-mail e/ou senha inválidos.')
            });
    }*/

    const showHome = () => {
        props.navigation.navigate('HomeNavigator', { screen: 'Minhas Vacinas' });
    }

    const showCriarConta = () => {
        props.navigation.push('Criar Conta');
    }

    const showRecuperarSenha = () => {
        props.navigation.push('Recuperar Senha');
    }

    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#add4d1',
            flex: 1,
            alignItems: "center",
        },
        title: {
            textAlign: 'center',
            fontSize: 40,
            marginTop: 30,
            color: '#429ed7',
            fontWeight: 'bold',
            textDecorationLine: 'underline'
        },
        description: {
            color: '#429ed7',
            fontSize: 30,
            width: 350,
            textAlign: 'center',
            marginTop: 30,
            marginBottom: 30,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        container: {
            flexDirection: 'row',
            marginBottom: 20,
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
        btnContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        btnEntrar: {
            backgroundColor: 'green',
            textAlign: 'center',
            paddingVertical: 10,
            paddingHorizontal: 32,
            width: 150,
            color: 'white',
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: 20,
            shadowColor: 'black',
        },
        btnCriar: {
            backgroundColor: '#429ed7',
            textAlign: 'center',
            paddingVertical: 10,
            paddingHorizontal: 32,
            width: 250,
            color: 'white',
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: 20
        },
        btnEsqueci: {
            backgroundColor: '#505050',
            textAlign: 'center',
            paddingVertical: 10,
            paddingHorizontal: 32,
            width: 270,
            color: 'white',
            shadowColor: 'black',
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: 20
        },
        shadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 7,

            elevation: 15,
        },
        erro: {
            color: 'red'
        }
    });

    return (
        <View style={styles.background}>
            <View>
                <Text style={styles.title}>My Health</Text>
            </View>
            <View>
                <Text style={styles.description}>Controle as suas vacinas e fique seguro</Text>
            </View>
            <View>
                <View style={styles.container}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput style={styles.input} secureTextEntry={true} value={senha} onChangeText={setSenha} />
                </View>
                {msg !== '' && <Text style={styles.erro}>{msg}</Text>}
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={showHome}>
                    {
                        isLoading ?
                            <ActivityIndicator size={'small'} color={'white'} />
                            :
                            <Text style={[styles.btnEntrar, styles.shadow]}>
                                Entrar
                            </Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={showCriarConta}>
                    <Text style={[styles.btnCriar, styles.shadow]}>
                        Criar minha conta
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showRecuperarSenha}>
                    <Text style={[styles.btnEsqueci, styles.shadow]}>
                        Esqueci minha senha
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
