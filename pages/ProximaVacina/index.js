import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import CardProximaVacina from '../../components/CardProximaVacina';
import { db } from '../../config/firebase';
import styles from './styles'

export const ProximaVacina = (props) => {

    const idUsuario = useSelector((state) => state.usuario.id)
    const [vacinas, setVacinas] = useState([])

    useEffect(() => {

        props.navigation.addListener('focus', () => {

            setVacinas([]);
            const colecaoVacinas = []

            const q = query(collection(db, "MyHealth"), where('proxVacina', '!=', ''));

            onSnapshot(q, (result) => {
                result.forEach((doc) => {
                    if (doc.idUsuario == idUsuario) {
                        colecaoVacinas.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    }
                });
                setVacinas(colecaoVacinas)
            });

        });

    }, [vacinas]);

    const showNovaVacina = () => {
        props.navigation.navigate('HomeNavigator', { screen: 'Nova Vacina' });
    }

    return (
        <ScrollView horizontal={false} style={styles.background}>
            <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'row', width: '100%' }}>
                <FlatList data={vacinas} renderItem={({ item }) => <CardProximaVacina item={item} navigation={props.navigation} />} keyExtractor={item => item.id} numColumns={1} />
            </ScrollView>
            <TouchableOpacity onPress={showNovaVacina}>
                <Text style={[styles.btnNovaVacina, styles.shadow]}>
                    Nova Vacina
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
