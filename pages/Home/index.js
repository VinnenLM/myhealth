import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import CardVacina from '../../components/CardVacina';
import styles from './styles'

export const Home = (props) => {

    const [vacinas, setVacinas] = useState([])

    const listaVacinas = [
        {
            id: 1,
            nome: 'BCG',
            data: '11/06/2022',
            dose: 'Dose única',
            comprovante: 'file:///data/user/0/com.myhealth/cache/rn_image_picker_lib_temp_fb48ec84-a75b-4c98-a896-0d1d6a72d901.jpg',
            proxima: ''
        },
        {
            id: 2,
            nome: 'Febre Amarela',
            data: '05/10/2022',
            dose: '1a. dose',
            comprovante: 'file:///data/user/0/com.myhealth/cache/rn_image_picker_lib_temp_fb48ec84-a75b-4c98-a896-0d1d6a72d901.jpg',
            proxima: '11/10/2023'
        },
    ]

    if (vacinas.length == 0) {
        setVacinas(listaVacinas)
    }

    if (typeof props.route.params !== 'undefined') {
        if (typeof props.route.params.itemAdicionar !== 'undefined') {
            console.log(props.route.params.itemAdicionar);
            vacinas.push({
                id: props.route.params.itemAdicionar.id,
                nome: props.route.params.itemAdicionar.nome,
                data: props.route.params.itemAdicionar.data,
                dose: props.route.params.itemAdicionar.dose,
                proxima: props.route.params.itemAdicionar.proxima,
                comprovante: props.route.params.itemAdicionar.comprovante
            })
        }
        if (typeof props.route.params.itemEditar !== 'undefined') {
            var index = vacinas.findIndex((item) => item.id == props.route.params.itemEditar.id)
            if (index !== -1) {
                let arrayTemporario = vacinas.slice();
                arrayTemporario[index] = props.route.params.itemEditar;
                setVacinas(arrayTemporario);
                props.route.params.itemEditar = 'undefined';
            }
        }
        if (typeof props.route.params.idApagar !== 'undefined') {
            var index = vacinas.findIndex((item) => item.id == props.route.params.idApagar)
            if (index !== -1) {
                vacinas.splice(index, 1);
            }
        }
    }

    const showNovaVacina = () => {
        props.navigation.navigate('HomeNavigator', { screen: 'Nova Vacina' });
    }

    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

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
