import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import Image from 'react-native-image-progress';
import { Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating'
import {styles} from './styles'


class MovieRow extends React.Component {


  constructor(props) {
    super(props);
    return (
      
      <TouchableOpacity onPress={() => this.props.onRowPress(this.props.movie)}>
      <View style={styles.container}>
        <Image source={{ uri: this.props.movie.keyArtImages ? this.props.movie.keyArtImages[0].url : ""}} style={styles.photo} />
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}>
        <Text style={styles.movieName}>
          {this.props.movie.headline + "\n"}
          <Text style={styles.synopsis}>
          {this.props.movie.synopsis}
        </Text>
        </Text>
        <View style={styles.starRating}>
        <Text style={{fontWeight: "bold", paddingLeft:5, color:"#F5F2DC"}}>Avg Rating:</Text>
        <StarRating
        disabled={true}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
        rating={this.props.movie.rating}
        fullStarColor={'#F1C533'}
        starSize={28}
      />

        </View>
        </View>
        
      </View>
      </TouchableOpacity>

        );
  }
}



export default MovieRow;