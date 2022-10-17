import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const CardVacina = (props) => {

    function showEditarVacina() {
        props.navigation.navigate('Editar Vacina', {item: props.item})
    }

    return (
        <TouchableOpacity style={styles.container} onPress={showEditarVacina}>
            <Text style={styles.nome}>{props.item.nome}</Text>
            <Text style={styles.dose}>{props.item.dose}</Text>
            <Text style={styles.dataDose}>{props.item.data}</Text>
            <Image source={{uri: props.item.comprovante}} style={{width: 165, height: 60, marginLeft: 'auto', marginRight: 'auto'}}/>
            {(props.item.proxima != '') ?
                <Text style={styles.proxDose}>Próxima dose em: {props.item.proxima}</Text>
                :
                <Text style={styles.proxDose}>Não há próxima dose</Text>
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '45%',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        padding: 5,
    },
    nome: {
        textAlign: 'center',
        color: '#3e92c6',
        fontSize: 20
    },
    dose: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#3e92c6',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '60%',
    },
    dataDose: {
        textAlign: 'center',
        color: 'grey'
    },
    proxDose: {
        textAlign: 'right',
        fontSize: 10,
        color: 'red'
    }
})

export default CardVacina;