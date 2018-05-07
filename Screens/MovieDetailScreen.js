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

const animationForAccordion = 'fadeIn'

const CONTENT = [
  {
    title: 'Movie Info'
  },
  {
    title: 'Cast'
  },
  {
    title: 'Synopsis'
  },
  {
    title: 'Movie Plot'
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
  }
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
      <View style={{height:0}}></View>
    );
  }

  _renderContent(section, i, isActive, movie) {
    switch (section.title) {
      case "Info":
    return (
      <Animatable.View duration={100}  style={[styles.content]} transition="backgroundColor">
        <Animatable.View animation={isActive ? animationForAccordion : undefined}>
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
      <Animatable.View duration={100}  style={[styles.content]} transition="backgroundColor">
        <Animatable.View animation={isActive ? animationForAccordion : undefined}>
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
      <Animatable.View duration={100}  style={[styles.content]} transition="backgroundColor">
        <Animatable.View animation={isActive ? animationForAccordion : undefined}>
        <Text style={styles.moviePlot}>{movie.synopsis}</Text>
           </Animatable.View>
      </Animatable.View>
    );

    case "Plot":
    return (
      <Animatable.View duration={100}  style={[styles.content]} transition="backgroundColor">
        <Animatable.View animation={isActive ? animationForAccordion : undefined}>
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
    <ScrollView style= {{backgroundColor:"#454445"}}>
    <Toast
    ref="toast"
    position='top'
    positionValue={200}  
    fadeInDuration={500}
    fadeOutDuration={1200}/>
    <View style={styles.container}>
    
    <View>
    <VideoPlayer
thumbnail={{ uri: movie.cardImages.slice(-1)[0].url ? movie.cardImages.slice(-1)[0].url : "" }}
thumbnailStyle = {{height:15}}
video={{ uri: movie.videos ? movie.videos.slice(-1)[0].url : ' '}}
/>
    </View>
    <View style={styles.movieTitleView}>
    <Text style={styles.movieTitle}>{movie.headline}</Text>
    <Icon.Button name="heart" backgroundColor="transparent" size={28} color={heartColor} onPress={() => this.favButtonPressed(movie)}>
  </Icon.Button>
    </View>
    <View style={[styles.container, {backgroundColor: "#007E90"}]}>

        <View style={[styles.selectors, {height: 22}]}>
          
          {SELECTORS.map(selector => (
            <TouchableOpacity key={selector.title} onPress={this._setSection.bind(this, selector.value)}>
              <View style={styles.selector}>
                <Text style={[selector.value === this.state.activeSection && styles.activeSelector, {color: "#F5F2DC"}]}>
                  {selector.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Accordion
          activeSection={this.state.activeSection}
          sections={SELECTORS}
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

