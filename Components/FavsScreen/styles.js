import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    }
});

const navBarStyle = {
    navBarTextColor: '#F5F2DC',
    navBarBackgroundColor: '#FF5729',
    navBarButtonColor: '#F5F2DC'
};

module.exports = {
    styles,
    navBarStyle
}