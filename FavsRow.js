import React from 'react';
import { Navigation } from 'react-native-navigation';
import { TouchableOpacity, AsyncStorage, View, ListView, StyleSheet, Navigator, Dimensions } from 'react-native';
import {Tile, Card, ListItem, Button, Text, List} from 'react-native-elements';
import AnimatedList from 'react-native-animated-list';
import Icon from 'react-native-vector-icons/FontAwesome';


class FavsRow extends React.Component {

  constructor(props) {
    super(props);
    return (
  <View style={{height:285, backgroundColor:"white"}} >
    <Tile
        imageSrc={{ uri: props.movie.cardImages.slice(-1)[0].url}}
        onPress={() => this.openMovieDetails(props.movie, props.navigation)}
      >
        <View style={styles.cardOverlay}>
        <View style={{flex:1, flexDirection: "row", alignItems: "center", justifyContent:"flex-start"}}>
          <Text style={{color: "white", fontSize:25, flex:1, paddingLeft:10 }}>{props.movie.headline}</Text>
          <Icon.Button  name="heart" style={{flex:1}} backgroundColor="transparent" size={30} color="red" onPress={() => this.props.onRemove(props.movie)}>
  </Icon.Button>
        </View></View>
      </Tile>
      </View>
  );
}

openMovieDetails(movie, nav) {
  nav.push({
    screen: 'app.MovieDetailScreen',
    title: movie.headline,
    passProps: {
      movie: movie
    }
  });
}

}


  const styles = StyleSheet.create({
    cardOverlay: {
      marginTop: -90, 
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height:70,
      marginLeft: -15,
      marginRight: -15
    }
  });


  export default FavsRow;
