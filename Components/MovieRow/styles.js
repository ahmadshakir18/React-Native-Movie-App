import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'flex-start'
    },
    movieName: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: 'bold',
      color: "#F5F2DC"
    },
    synopsis: {
      marginLeft: 8,
      marginRight: 8,
      fontSize: 12,
      fontWeight: 'normal'
    },
    photo: {
      height: 180,
      width: 128
    },
    starRating: {
      alignSelf: "flex-start",
      padding:5,
      paddingLeft: 8
    }
  });
  
  module.exports = {
      styles
  }