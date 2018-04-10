import React from 'react'
import { Navigation } from 'react-native-navigation';
import { TouchableHighlight, View, Text, Image, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Card, ListItem, Button, Rating } from 'react-native-elements';
import { RkModalImg } from 'react-native-ui-kitten';
import VideoPlayer from 'react-native-video-player';
import Icon from 'react-native-vector-icons/FontAwesome';

var favs = []

export default class MovieDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      heartColor: "lightgray"
    }
    this.getFavsFromStorage()
  }
  
  
render() {
  const movie = this.props.movie;
  heartColor = this.state.heartColor
  return (
    <ScrollView>
    <View style={styles.container}>
    <View style={styles.movieTitleView}>
    <Text style={styles.movieTitle}>{movie.headline}</Text>
    <Icon.Button name="heart" backgroundColor="transparent" size={35} color={heartColor} onPress={() => this.favButtonPressed(movie)}>
  </Icon.Button>
    </View>
    <View style={styles.container}>
    <VideoPlayer
thumbnail={{ uri: movie.cardImages[0].url }}
thumbnailStyle = {{height:15}}
video={{ uri: movie.videos[0].url }}
/>
    </View>
    
    <View>
    <Card title="Movie Info">
        <View>
          <Text style={styles.movieInfoText}>Year Released:                 <Text style={styles.movieInfoText2}>{movie.year}</Text></Text>
          <Text style={styles.movieInfoText}>Run Time:                          <Text style={styles.movieInfoText2}>{movie.duration/60} mins</Text></Text>
          <Text style={styles.movieInfoText}>Cert:                                    <Text style={styles.movieInfoText2}>{movie.cert}</Text></Text>
          <Text style={styles.movieInfoText}>Genre:                                 <Text style={styles.movieInfoText2}>{movie.genres.join(', ')}</Text></Text>
          <Text style={styles.movieInfoText}>Rating:                                <Text style={styles.movieInfoText2}>{movie.rating + "/5"}</Text></Text>
          <Text style={styles.movieInfoText}>Director:                             <Text style={styles.movieInfoText2}>{movie.directors[0].name}</Text></Text>
        </View>
  
</Card>
</View>
<View>
    <Card title="Cast">
    <View style={{alignItems: 'center'}}>
    {
      movie.cast.map((actorName, i) => {
        return (
      <Text key={i} style={styles.movieInfoText}>{actorName.name}</Text>
        )}
      )
    }
    </View>
  
</Card>
</View>

<View>
    <Card title="Movie Plot">
    <View>
          <Text style={styles.moviePlot}>{movie.body}</Text>
    </View>
    </Card>
</View>

</View>
    </ScrollView>
    );
 
}

async getFavsFromStorage() {
  const favourites = await AsyncStorage.getItem("favs")
  favs = (favourites !== null) ? JSON.parse(favourites) : []
  if (this.isInFavs(this.props.movie)) {
    this.setState({heartColor: "red"})
  }
}

favButtonPressed(targetItem) {
  if (!this.isInFavs(targetItem)) {
    this.addFavToStorage(targetItem)
  }
  else {
    this.removeFavFromStorage(targetItem)
  }
}

async removeFavFromStorage(toBeRemoved) {

  favs = favs.filter(item => item.id !== toBeRemoved.id)
  await AsyncStorage.setItem("favs", JSON.stringify(favs))
  
  this.setState({heartColor: "lightgray"})
}

async addFavToStorage(toBeSaved) {
  const favsArr = [...favs, toBeSaved]
  await AsyncStorage.setItem("favs", JSON.stringify(favsArr))
  favs = favsArr
  
  this.setState({heartColor: "red"})
}

isInFavs(toBeDisplayed) {
  for (index in favs) {
    if (favs[index].id === toBeDisplayed.id) {
      return true
    }
  }
  return false
}
  
}

const styles = StyleSheet.create({
  movieTitleView : {
    flex:1,
    flexDirection: 'row',
    backgroundColor: 'white',
    height:40,
    justifyContent: 'space-between',
    alignItems: 'center'
    },
  movieTitle: {
    fontWeight: 'bold',
    paddingLeft: 8,
    fontSize: 20,
    
  },
  imageContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
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
    color: 'white'
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 20,
  },
  movieInfoText: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 18,
    fontWeight: 'bold'
  },
  movieInfoText2: {
    fontWeight: 'normal'
  },
  moviePlot: {
    marginTop: 2,
    marginBottom: 2,
    fontSize: 15,
    fontWeight: 'normal'
  }
});

