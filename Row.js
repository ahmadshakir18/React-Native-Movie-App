import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating'


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
    color: "white"
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

class Row extends React.Component {


  constructor(props) {
    super(props);
    return (
      
      <TouchableOpacity onPress={() => this.openMovieDetails(this.props[1], this.props[0])}>
      <View style={styles.container}>
        <Image source={{ uri: this.props[0].keyArtImages ? this.props[0].keyArtImages[0].url : ""}} style={styles.photo} />
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}>
        <Text style={styles.movieName}>
          {this.props[0].headline + "\n"}
          <Text style={styles.synopsis}>
          {this.props[0].synopsis}
        </Text>
        </Text>
        <View style={styles.starRating}>
        <Text style={{fontWeight: "bold", paddingLeft:5, color:"white"}}>Avg Rating:</Text>
        <StarRating
        disabled={true}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
        rating={this.props[0].rating}
        fullStarColor={'#F1C533'}
        starSize={28}
      />

        </View>
        </View>
        
      </View>
      </TouchableOpacity>

        );
  }


  openMovieDetails(nav, movie) {
    nav.push({
      screen: 'app.MovieDetailScreen',
      title: movie.headline,
      passProps: {
        movie: movie
      }
    });
  }
}



export default Row;