import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import app from "../../config/firebase";
import styles from './styles'

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
