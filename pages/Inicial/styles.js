import { StyleSheet } from "react-native";

export default StyleSheet.create({
    background: {
        backgroundColor: '#add4d1',
        flex: 1,
        alignItems: "center",
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        marginTop: 30,
        color: '#429ed7',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    description: {
        color: '#429ed7',
        fontSize: 30,
        width: 350,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20
    },
    label: {
        margin: 5,
        color: 'white',
        fontSize: 15,
        marginLeft: 'auto',
    },
    input: {
        backgroundColor: 'white',
        width: 250,
        height: 30,
        fontSize: 15,
        color: '#499dcd',
        paddingBottom: 5
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnEntrar: {
        backgroundColor: 'green',
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        width: 150,
        color: 'white',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20,
        shadowColor: 'black',
    },
    btnCriar: {
        backgroundColor: '#429ed7',
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        width: 250,
        color: 'white',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20
    },
    btnEsqueci: {
        backgroundColor: '#505050',
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        width: 270,
        color: 'white',
        shadowColor: 'black',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 7,

        elevation: 15,
    },
    erro: {
        color: 'red'
    },
    titulo: {
        flexDirection: 'row'
    },
    image: {
        flex: 1,
        justifyContent: "center",
        height: 780,
        width: '100%'
      },
});