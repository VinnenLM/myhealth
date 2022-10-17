import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import app from "../../config/firebase";

export const RecuperarSenha = () => {

    const [email, setEmail] = useState()

    const recuperarSenha = () => {
        const auth = getAuth(app);
        sendPasswordResetEmail(auth, email)
        .then((user) => {
            console.log(JSON.stringify(user))
        })
        .catch((error) => {
            console.log('Erro ao solicitar reset da senha: ' + error.message)
        })
    }

    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#add4d1',
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        container: {
            flexDirection: 'row',
            
        },
        label: {
            textAlignVertical: 'center',
            margin: 5,
            color: 'white',
            fontSize: 20
        },
        input: {
            backgroundColor: 'white',
            width: 300,
            fontSize: 20,
            color: '#499dcd'
        },
        btnRecuperar: {
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
            <View style={styles.container}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} />
            </View>
            <TouchableOpacity onPress={recuperarSenha}>
                <Text style={[styles.btnRecuperar, styles.sombra]} >
                    Recuperar Senha
                </Text>
            </TouchableOpacity>
        </View>
    );
}
