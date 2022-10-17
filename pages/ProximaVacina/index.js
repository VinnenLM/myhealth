import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CardVacina from '../../components/CardVacina';

export const ProximaVacina = (props) => {

    const listaVacinas = [
        {
            id: 1,
            nome: 'BCG',
            data: '11/06/2022',
            dose: 'Dose Única',
            proxima: ''
        },
        {
            id: 2,
            nome: 'Febre Amarela',
            data: '05/10/2022',
            dose: '1a. dose',
            proxima: '11/10/2023'
        },
        {
            id: 3,
            nome: 'Hepatite B',
            data: '11/08/2022',
            dose: '1a. dose',
            proxima: '11/10/2022'
        },
        {
            id: 4,
            nome: 'Poliomelite',
            data: '11/08/2022',
            dose: '1a. dose',
            proxima: '11/10/2022'
        }
    ]

    const showNovaVacina = () => {
        props.navigation.navigate('HomeNavigator', { screen: 'Nova Vacina' });
    }

    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#add4d1',
            flex: 1
        },
        btnNovaVacina: {
            backgroundColor: 'green',
            textAlign: 'center',
            paddingVertical: 10,
            width: 180,
            color: 'white',
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: 20,
        },
    });

    return (
        <View style={styles.background}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <FlatList data={listaVacinas} renderItem={({ item }) => <CardVacina item={item} navigation={props.navigation} />} keyExtractor={item => item.id} numColumns={2} />
            </View>
            <TouchableOpacity onPress={showNovaVacina}>
                <Text style={[styles.btnNovaVacina, styles.shadow]}>
                    Nova Vacina
                </Text>
            </TouchableOpacity>
        </View>
    );
}
