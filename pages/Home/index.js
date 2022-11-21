import React, { useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { FlatList, ScrollView, Text, TouchableOpacity } from 'react-native'
import CardVacina from '../../components/CardVacina';
import styles from './styles';
import { db } from '../../config/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';

export const Home = (props) => {

    const [vacinas, setVacinas] = useState([]);
    const [pesquisa, setPesquisa] = useState([]);

    const idUsuario = useSelector((state) => state.usuario.id)

    useEffect(() => {

        //props.navigation.addListener('focus', () => {

        const colecaoVacinas = []

        const q = query(collection(db, "MyHealth"), where('idUsuario', '==', idUsuario));

        onSnapshot(q, (result) => {
            result.forEach((doc) => {
                if (doc.data().nome.indexOf(pesquisa) >= 0) {
                    const vacina = {
                        ...doc.data(),
                        id: doc.id
                    }
                    colecaoVacinas.push(vacina)
                }
            })
            setVacinas(colecaoVacinas)
        })
        //})

    }, [pesquisa]);

    const showNovaVacina = () => {
        props.navigation.navigate('HomeNavigator', { screen: 'Nova Vacina' });
    }

    return (
        <ScrollView horizontal={false} style={styles.background}>
            <Searchbar
                icon={require('../../assets/imgs/lupa.png')}
                style={styles.srcBar}
                placeholder="Pesquisar Vacina..."
                onChangeText={setPesquisa}
                value={pesquisa}
            />

            <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'row', width: '100%' }}>
                <FlatList data={vacinas} renderItem={({ item }) => <CardVacina item={item} navigation={props.navigation} />} keyExtractor={item => item.id} numColumns={2} />
            </ScrollView >

            <TouchableOpacity onPress={showNovaVacina}>
                <Text style={[styles.btnNovaVacina, styles.shadow]}>
                    Nova Vacina
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
