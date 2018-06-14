import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    movieTitleView : {
      flex:1,
      flexDirection: 'row',
      height:50,
      justifyContent: 'space-between',
      alignItems: 'center',
      //backgroundColor: '#990026'
      },
    movieTitle: {
      fontWeight: 'bold',
      paddingLeft: 8,
      fontSize: 20,
      color: "#F5F2DC"
    },
    imageContainer: {
      paddingLeft: 0,
      paddingRight: 0,
      alignItems: 'center'
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
      color: '#F5F2DC'
    },
    image: {
      height: 50,
      width: 50,
      borderRadius: 20,
    },
    movieInfoText: {
      marginTop: 0,
      marginBottom: 4,
      fontSize: 18,
      fontWeight: 'bold',
      color: "#F5F2DC"
    },
    movieInfoText2: {
      fontWeight: 'normal'
    },
    moviePlot: {
      marginTop: 2,
      marginBottom: 2,
      fontSize: 15,
      fontWeight: 'normal',
      color: "#F5F2DC"
    },
    container: {
      flex: 1,
      justifyContent: 'center'
      },
    title: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 20,
    },
    header: {
      padding: 10,
      height: 65
    },
    headerText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '800',
      color:"#F5F2DC"
    },
    content: {
      paddingTop: 15,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      backgroundColor: "#163342"
    },
    active: {
      backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
      backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
      margin: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex:1, 
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    selector: {
      padding: 10
    },
    activeSelector: {
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    },
    selectTitle: {
      fontSize: 16,
      fontWeight: '700',
      padding: 10,
      color: "#F5F2DC"
    },
  });
  
  module.exports = {
      styles
  }