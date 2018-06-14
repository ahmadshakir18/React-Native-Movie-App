import React from 'react';
import { Navigation } from 'react-native-navigation';
import { TouchableOpacity, View, ListView } from 'react-native';
import {Tile, Card, ListItem, Button, Text, List} from 'react-native-elements';
import AnimatedList from 'react-native-animated-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import Image from 'react-native-image-progress';
import {styles} from './styles'


class FavRow extends React.Component {

  constructor(props) {
    super(props);
    return (
  <View style={{height:280}} >
    <Tile
        imageSrc={{ uri: props.movie.cardImages.slice(-1)[0].url}}
        onPress={() => this.props.onRowPress(props.movie)}
        imageContainerStyle={{backgroundColor: 'grey'}}
      >
        <View style={styles.cardOverlay}>
        <View style={{flex:1, flexDirection: "row"}}>
        <View style = {{flex:1, flexDirection: 'column'}}>
          <Text style={{flex:1, color: "white", fontSize:22, flex:1, paddingLeft:15, paddingTop:10, fontWeight: '700', alignSelf: 'flex-start'}}>{props.movie.headline}</Text>
          <View style={{flex:1, alignSelf:'flex-start', paddingLeft:15, paddingBottom:10}}>
          <StarRating
        disabled={true}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
        rating={props.movie.rating}
        fullStarColor={'#F1C533'}
        starSize={28}
      />
      </View>
      </View>

          <Icon.Button  name="heart" style={{flex:0.2}} backgroundColor="transparent" size={30} color="red" onPress={() => this.props.onRemove(props.movie)}>
  </Icon.Button>
        </View></View>
      </Tile>
      </View>
  );
}

}

  export default FavRow;
