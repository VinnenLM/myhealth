import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { StyleSheet } from "react-native"
import { UserHeader } from '../UserHeader'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#add4d1',
    }
})

export const CustomDrawer = (props) => {
    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            <UserHeader />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}