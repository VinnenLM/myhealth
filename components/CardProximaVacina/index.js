import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { reducerSetVacina } from '../../redux/vacinaSlice'

const CardProximaVacina = (props) => {

    const dispatch = useDispatch();

    function showEditarVacina() {
        dispatch(reducerSetVacina({ id: props.item.id }))
        props.navigation.navigate('Editar Vacina')
    }

    return (
        <TouchableOpacity style={styles.container} onPress={showEditarVacina}>
            <Text style={styles.nome}>{props.item.nome}</Text>
            <Text style={styles.proxDose}>{props.item.proxVacina}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '90%',
        margin: 20,
        marginBottom: 0,
        borderRadius: 10,
        padding: 5,
    },
    nome: {
        paddingLeft: 20,
        fontWeight: 'bold',
        color: '#3e92c6',
        fontSize: 20
    },
    proxDose: {
        paddingLeft: 20,
        fontSize: 15,
        color: 'grey'
    }
})

export default CardProximaVacina;