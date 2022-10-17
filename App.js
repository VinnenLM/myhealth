import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react';
import { CriarConta } from './pages/CriarConta';
import { Home } from './pages/Home';
import { Inicial } from './pages/Inicial';
import { RecuperarSenha } from './pages/RecuperarSenha';
import { CustomDrawer } from './components/CustomDrawer';
import { NovaVacina } from './pages/NovaVacina';
import { Image } from 'react-native';
import { EditarVacina } from './pages/EditarVacina';
import { ProximaVacina } from './pages/ProximaVacina';

const HomeNavigator = () => {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>

      <Drawer.Screen
        name="Minhas Vacinas"
        component={Home}
        options={{
          drawerIcon: () => <Image source={require('./assets/imgs/vacina.png')} style={{ height: '120%', width: '15%' }} />,
          headerStyle: { backgroundColor: '#c0e7e2' },
          drawerActiveTintColor: "black",
          drawerInactiveTintColor: "#429ed7",
          headerTintColor: '#add4d1',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: '#429ed5' },
        }} />

      <Drawer.Screen name="Próximas Vacinas" component={ProximaVacina} options={{
        drawerIcon: () => <Image source={require('./assets/imgs/calendario.png')} style={{ height: '120%', width: '15%' }} />,
        headerStyle: { backgroundColor: '#c0e7e2' },
        drawerActiveTintColor: "black",
          drawerInactiveTintColor: "#429ed7",
        headerTintColor: '#add4d1',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: '#429ed5' },
      }} />

      <Drawer.Screen name="Sair" component={Inicial}
        options={{
          drawerIcon: () => <Image source={require('./assets/imgs/sair.png')} style={{ height: '120%', width: '15%' }} />,
          headerStyle: { backgroundColor: '#c0e7e2' },
          headerTintColor: '#add4d1',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: '#429ed5' },
          headerShown: false
        }} />

      <Drawer.Screen name="Nova Vacina" component={NovaVacina} options={{
        title: "Minhas Vacinas",
        drawerItemStyle: { height: 0 },
        headerStyle: { backgroundColor: '#c0e7e2' },
        headerTintColor: '#add4d1',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: '#429ed5' },
      }} />

      <Drawer.Screen name="Editar Vacina" component={EditarVacina} options={{
        title: "Minhas Vacinas",
        drawerItemStyle: { height: 0 },
        headerStyle: { backgroundColor: '#c0e7e2' },
        headerTintColor: '#add4d1',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: '#429ed5' },
      }} />

    </Drawer.Navigator>
  )
}

const App = () => {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Inicial"
          component={Inicial}
          options={
            {
              title: 'Tela Inicial',
              headerStyle: { backgroundColor: '#c0e7e2' },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: '#429ed5' },
              headerShown: false
            }} />

        <Stack.Screen name="HomeNavigator" component={HomeNavigator} options={{ headerShown: false }} />

        <Stack.Screen name="Criar Conta" component={CriarConta}
          options={
            {
              title: 'MyHealth',
              headerStyle: { backgroundColor: '#c0e7e2' },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: '#429ed5' },
            }} />

        <Stack.Screen name="Recuperar Senha" component={RecuperarSenha}
          options={
            {
              title: 'MyHealth',
              headerStyle: { backgroundColor: '#c0e7e2' },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: '#429ed5' },
            }} />

        {/* <Stack.Screen name="Nova Vacina" component={NovaVacina} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

//npx react-native run-android