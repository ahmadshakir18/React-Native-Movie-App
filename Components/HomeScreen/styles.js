import { StyleSheet, Dimensions } from 'react-native'

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 220;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      paddingLeft: 5,
      paddingRight: 5
    },
    text: {
      textAlign: 'center'
    },
    button: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0b7eff'
    },
    buttonText: {
      color: '#282828'
    },
    list : {
      flex: 1,
    },
    listRow : {
      height: 50,
      alignItems: 'center',
      fontSize: 20
    },
    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#939393'
    },
    carouselImage: {
      width: BannerWidth, 
      height: BannerHeight
    },
    fetchingView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#454445"
    },
    bgColor: { 
      backgroundColor: "#454445" 
    },
    loadingText: { 
      marginTop: 8, 
      color: "grey" 
    },
    searchBarParentView: { 
      flex: 1, 
      flexDirection: 'row' 
    },
    searchBar: { 
      backgroundColor: "#454445", 
      width: BannerWidth - 55 
    },
    hideButton: { 
      width: 55, 
      alignSelf: 'center' 
    }
  });

   const navBarStyle = {
      navBarTextColor: '#F5F2DC',
      navBarBackgroundColor: '#FF5729',
      navBarButtonColor: '#F5F2DC'
    };

    module.exports = {
        styles,
        navBarStyle,
        BannerWidth
    }