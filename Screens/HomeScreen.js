import React from 'react'
import { Navigation } from 'react-native-navigation';
import { TouchableHighlight, AsyncStorage, View, Text, ListView, StyleSheet, Navigator } from 'react-native'

import { connect } from 'react-redux'
import { fetchMoviesFromAPI, getFavs } from '../actions'
import Row from '../Row';


class HomeScreen extends React.Component {

  constructor(props) {

    super(props);
    
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
    }
    
  return (
    
    <View style={styles.container}>
    
      <TouchableHighlight style={styles.button} onPress={() => this.props.getMovies("https://s3.amazonaws.com/vodassets/showcase.json")}>
        <Text style={styles.buttonText}>Load Movies</Text>
      </TouchableHighlight>

{ movies.length?
    <ListView
    
    dataSource={this.state.dataSource}
    renderRow={(data) => new Row([data,this.props.navigator])}
    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} />

    :null
}
    </View>
    );
 
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
