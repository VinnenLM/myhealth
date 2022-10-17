import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CardVacina from '../../components/CardVacina';

export const Home = (props) => {

    const [vacinas, setVacinas] = useState([])

    const listaVacinas = [
        {
            id: 1,
            nome: 'BCG',
            data: '11/06/2022',
            dose: 'Dose única',
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
    
    if(vacinas.length == 0){
        setVacinas(listaVacinas)
    }

    if (typeof props.route.params !== 'undefined') {
        if (typeof props.route.params.idApagar !== 'undefined') {
            var index = vacinas.findIndex((item) => item.id == props.route.params.idApagar)
            if (index !== -1) {
                vacinas.splice(index, 1);
            }
        }
    }

    if (typeof props.route.params !== 'undefined') {
        if (typeof props.route.params.itemAdicionar !== 'undefined') {
            vacinas.push({
                id: props.route.params.itemAdicionar.id,
                nome: props.route.params.itemAdicionar.nome,
                data: props.route.params.itemAdicionar.data,
                dose: props.route.params.itemAdicionar.dose,
                proxima: props.route.params.itemAdicionar.proxima
            })
        }
    }

    const showNovaVacina = () => {
        props.navigation.navigate('HomeNavigator', { screen: 'Nova Vacina' });
    }

    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#add4d1',
            flex: 1
        },
        title: {
            textAlign: 'center',
            fontSize: 40,
            marginTop: 30,
            color: '#429ed7',
            fontWeight: 'bold',
            textDecorationLine: 'underline'
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
        srcBar: {
            width: '95%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 20,
            marginBottom: 20,
        }
    });

    return (
        <View style={styles.background}>
            <Searchbar
                icon={require('../../assets/imgs/lupa.png')}
                style={styles.srcBar}
                placeholder="Pesquisar Vacina..."
                onChangeText={onChangeSearch}
                value={searchQuery}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <FlatList data={vacinas} renderItem={({ item }) => <CardVacina item={item} navigation={props.navigation} />} keyExtractor={item => item.id} numColumns={2} />
            </View>

            <TouchableOpacity onPress={showNovaVacina}>
                <Text style={[styles.btnNovaVacina, styles.shadow]}>
                    Nova Vacina
                </Text>
            </TouchableOpacity>
        </View>
    );
}
