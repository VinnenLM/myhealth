import React, { useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import CardVacina from '../../components/CardVacina';
import styles from './styles';
import { db } from '../../config/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

export const Home = (props) => {

    const [vacinas, setVacinas] = useState([])

    useEffect(() => {

        props.navigation.addListener('focus',() =>{

            setVacinas([]);
            const colecaoVacinas = []

            const q = query(collection(db, "MyHealth"));
    
            onSnapshot(q, (result) => {
                result.forEach((doc) => {
                    colecaoVacinas.push({
                        ...doc.data(),
                        id: doc.id
                    })
                });
                setVacinas(colecaoVacinas)
            });

        });

        
    }, [vacinas]);

    const showNovaVacina = () => {
        props.navigation.navigate('HomeNavigator', { screen: 'Nova Vacina' });
    }

    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <ScrollView horizontal={false} style={styles.background}>
            <Searchbar
                icon={require('../../assets/imgs/lupa.png')}
                style={styles.srcBar}
                placeholder="Pesquisar Vacina..."
                onChangeText={onChangeSearch}
                value={searchQuery}
            />

            <ScrollView horizontal={true}>
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
