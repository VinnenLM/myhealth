import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CardProximaVacina from '../../components/CardProximaVacina';

export const ProximaVacina = (props) => {

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
            marginTop: 400,
            marginBottom: 20,
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: 20,
        },
    });

    return (
        <View style={styles.background}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <FlatList data={listaVacinas} renderItem={({ item }) => <CardProximaVacina item={item} navigation={props.navigation} />} keyExtractor={item => item.id} numColumns={1} />
            </View>
            <TouchableOpacity onPress={showNovaVacina}>
                <Text style={[styles.btnNovaVacina, styles.shadow]}>
                    Nova Vacina
                </Text>
            </TouchableOpacity>
        </View>
    );
}
