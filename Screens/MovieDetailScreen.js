import React from 'react'
import { Navigation } from 'react-native-navigation';
import { TouchableOpacity, View, Text, Image, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Card, ListItem, Button, Rating } from 'react-native-elements';
import { RkModalImg } from 'react-native-ui-kitten';
import VideoPlayer from 'react-native-video-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Toast, {DURATION} from 'react-native-easy-toast';

var favs = []

const CONTENT = [
  {
    title: 'Movie Info',
    headerColor: '#2e5363',
    contentBgColor: '#a0b6bf'
  },
  {
    title: 'Cast',
    headerColor: '#332e63',
    contentBgColor: '#a09dc6'
  },
  {
    title: 'Synopsis',
    headerColor: '#632e39',
    contentBgColor: '#d6a4af'
  },
  {
    title: 'Movie Plot',
    headerColor: '#2e6344',
    contentBgColor: '#a4bcad'
  }
];

const SELECTORS = [
  {
    title: 'Info',
    value: 0,
  },
  {
    title: 'Cast',
    value: 1,
  },
  {
    title: 'Synopsis',
    value: 2,
  },
  {
    title: 'Plot',
    value: 3,
  },
  {
    title: 'none',
    value: false,
  },
];

export default class MovieDetailScreen extends React.Component {

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  _setSection(section) {
    this.setState({ activeSection: section });
  }

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View duration={400} style={[styles.header, {backgroundColor: section.headerColor, justifyContent:'center'}]} transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive, movie) {
    switch (section.title) {
      case "Movie Info":
    return (
      <Animatable.View duration={400}  style={[styles.content, {backgroundColor: section.contentBgColor}]} transition="backgroundColor">
        <Animatable.View animation={isActive ? 'bounceIn' : undefined}>
          <Text style={styles.movieInfoText}>Year Released:                 <Text style={styles.movieInfoText2}>{movie.year}</Text></Text>
          <Text style={styles.movieInfoText}>Run Time:                          <Text style={styles.movieInfoText2}>{movie.duration/60} mins</Text></Text>
          <Text style={styles.movieInfoText}>Cert:                                    <Text style={styles.movieInfoText2}>{movie.cert}</Text></Text>
          <Text style={styles.movieInfoText}>Genre:                                 <Text style={styles.movieInfoText2}>{movie.genres.join(', ')}</Text></Text>
          <Text style={styles.movieInfoText}>Rating:                                <Text style={styles.movieInfoText2}>{movie.rating + "/5"}</Text></Text>
          <Text style={styles.movieInfoText}>Director:                             <Text style={styles.movieInfoText2}>{movie.directors[0].name}</Text></Text>
           </Animatable.View>
      </Animatable.View>
    );

    case "Cast":
    return (
      <Animatable.View duration={400}  style={[styles.content, {backgroundColor: section.contentBgColor}]} transition="backgroundColor">
        <Animatable.View animation={isActive ? 'bounceIn' : undefined}>
        <View style={{alignItems: 'center'}}>
    {
      movie.cast.map((actorName, i) => {
        return (
      <Text key={i} style={styles.movieInfoText}>{actorName.name}</Text>
        )}
      )
    }
    </View>

           </Animatable.View>
      </Animatable.View>
    );

    case "Synopsis":
    return (
      <Animatable.View duration={400}  style={[styles.content, {backgroundColor: section.contentBgColor}]} transition="backgroundColor">
        <Animatable.View animation={isActive ? 'bounceIn' : undefined}>
        <Text style={styles.moviePlot}>{movie.synopsis}</Text>
           </Animatable.View>
      </Animatable.View>
    );

    case "Movie Plot":
    return (
      <Animatable.View duration={400}  style={[styles.content, {backgroundColor: section.contentBgColor}]} transition="backgroundColor">
        <Animatable.View animation={isActive ? 'bounceIn' : undefined}>
        <Text style={styles.moviePlot}>{movie.body}</Text>
           </Animatable.View>
      </Animatable.View>
    );

    default:
    break;
  }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      heartColor: "lightgray",
      activeSection: 0,
      collapsed: false,
      };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  
  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        this.getFavsFromStorage()
        break;
      default:
        break;
    }
  }
  
render() {
  const movie = this.props.movie;
  heartColor = this.state.heartColor
  return (
    <ScrollView style= {{backgroundColor:"#1c1c1c"}}>
    <Toast
    ref="toast"
    position='top'
    positionValue={200}  
    fadeInDuration={500}
    fadeOutDuration={1200}/>
    <View style={styles.container}>
    <View style={styles.movieTitleView}>
    <Text style={styles.movieTitle}>{movie.headline}</Text>
    <Icon.Button name="heart" backgroundColor="transparent" size={28} color={heartColor} onPress={() => this.favButtonPressed(movie)}>
  </Icon.Button>
    </View>
    <View>
    <VideoPlayer
thumbnail={{ uri: movie.cardImages.slice(-1)[0].url ? movie.cardImages.slice(-1)[0].url : "" }}
thumbnailStyle = {{height:15}}
video={{ uri: movie.videos ? movie.videos.slice(-1)[0].url : ' '}}
/>
    </View>
    
    <View style={[styles.container, {backgroundColor: "#bc971c"}]}>

        <View style={[styles.selectors, {height: 22}]}>
          
          {SELECTORS.map(selector => (
            <TouchableOpacity key={selector.title} onPress={this._setSection.bind(this, selector.value)}>
              <View style={styles.selector}>
                <Text style={selector.value === this.state.activeSection && styles.activeSelector}>
                  {selector.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Accordion
          activeSection={this.state.activeSection}
          sections={CONTENT}
          renderHeader={this._renderHeader}
          renderContent={(content, index, isActive) => this._renderContent(content, index, isActive, movie)}
          duration={400}
          onChange={this._setSection.bind(this)}
        />

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
  else {
    this.setState({heartColor: "lightgray"})
  }
}

favButtonPressed(targetItem) {
  if (!this.isInFavs(targetItem)) {
    this.addFavToStorage(targetItem)
    this.refs.toast.show('Movie added to favorites :D');
  }
  else {
    this.removeFavFromStorage(targetItem)
    this.refs.toast.show('Movie removed from favorites :(');
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
    height:40,
    justifyContent: 'space-between',
    alignItems: 'center'
    },
  movieTitle: {
    fontWeight: 'bold',
    paddingLeft: 8,
    fontSize: 20,
    color: "white"
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
    color: 'white'
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
    color:"white"
  },
  content: {
    padding: 20
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
  },
  selector: {
    padding: 10
  },
  activeSelector: {
    fontWeight: 'bold',
    fontSize:17
  },
  selectTitle: {
    fontSize: 16,
    fontWeight: '700',
    padding: 10,
    color: "black"
  },
});

