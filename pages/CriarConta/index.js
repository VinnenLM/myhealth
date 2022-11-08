import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from "../../config/firebase";
import styles from './styles.js'

export const CriarConta = (props) => {

    const [checked, setChecked] = useState('');

    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [isLoading, setLoading] = useState(false)

    const criarUsuario = () => {

        setLoading(true)
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, senha)
            .then((userRecord) => {
                console.log(JSON.stringify(userRecord))
                setLoading(false)
                props.navigation.pop()
            })
            .catch((error) => {
                setLoading(false)
                console.log("Ocorreu um erro ao cadastrar o usuário: " + error.message)
            })
    }

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
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} />
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput style={styles.input} secureTextEntry={true} value={senha} onChangeText={setSenha} />
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Repetir Senha</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>

            </View>

            <TouchableOpacity onPress={criarUsuario}>
                <Text style={[styles.btnCadastrar, styles.sombra]}>
                    Cadastrar
                </Text>
            </TouchableOpacity>

        </View>
    );
}
