import React from 'react'
import { Navigation } from 'react-native-navigation';
import { TouchableOpacity, Dimensions, View, Text, ListView, StyleSheet, ActivityIndicator, Image } from 'react-native'
import Carousel from 'react-native-banner-carousel';
import { connect } from 'react-redux'
import { fetchMoviesFromAPI, getFavs } from '../actions'
import Row from '../Row';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 220;

class HomeScreen extends React.Component {

  carouselImageIndex = 0
  carouselMovies = []
  
  constructor(props) {

    super(props);
    this.props.getMovies("https://s3.amazonaws.com/vodassets/showcase.json");
  }
  
  renderPage(image, index) {
    
    return (
      <TouchableOpacity key={index} onPress={() => this.carouselImagePressed()}>
        <View key={index}>
            <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
        </View>
        </TouchableOpacity>
    );
}

render() {
  const { movies, error, isFetching } = this.props.movies;
  
  movies.sort(function(a, b){return a.headline > b.headline});
  
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(movies),
    };
    if (error) {
      alert("Unable to retrieve movies from server. Please try again :(");
      return(
        <View style={styles.container}>
        <Text>OMGS error :(</Text>
        </View>
      );
    }
    else if(isFetching) {
      return(
        <View style={{flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',}}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={{marginTop:8}}>Loading...</Text>
      </View>
    );
    }
    else {

  return ( 
    movies.length?

    <ListView
    dataSource={this.state.dataSource}
    renderRow={(data) => this._renderRow(data)}
    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} 
    renderHeader={() => this.renderCarouselInHeader()}
    />

    :null
    
    );
  }
}



_renderRow(data) {
    return new Row([data,this.props.navigator])
    
}

renderCarouselInHeader() {
  movs = this.props.movies.movies.slice(0)
  movs.sort(function(a, b){return a.year < b.year})
  for (i = 0; i < 8; i++) {
    this.carouselMovies.push(movs[i])
  }
  
  return (
    
    <Carousel
      autoplay
      autoplayTimeout={4000}
      loop
      index={0}
      pageSize={BannerWidth}
      onPageChanged = {(index) => this.carouselImageIndex = index}
      >
      {this.carouselMovies.map((image, index) => this.renderPage(image.cardImages.slice(-1)[0].url, index))}
      </Carousel>
  );
}

carouselImagePressed() {
  movieForDetailView = this.carouselMovies[this.carouselImageIndex]
  this.props.navigator.push({
    screen: 'app.MovieDetailScreen',
    title: movieForDetailView.headline,
    passProps: {
      movie: movieForDetailView
    }
  });
}

  
}

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
    color: 'white'
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
      backgroundColor: '#8E8E8E',
    }
});

function mapStateToProps (state) {
  return {
    movies: state.movies,
    favs: state.favs
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getMovies: (url) => dispatch(fetchMoviesFromAPI(url)),
    getFavs: () => dispatch(getFavs())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
