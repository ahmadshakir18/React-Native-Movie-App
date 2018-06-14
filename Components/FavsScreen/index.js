import React from 'react';
import { Navigation } from 'react-native-navigation';
import { TouchableHighlight, AsyncStorage, View, ListView, StyleSheet, Navigator } from 'react-native';
import {Tile, Card, ListItem, Button, Text, List} from 'react-native-elements';
import AnimatedList from 'react-native-animated-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';
import { styles, navBarStyle } from './styles'
import FavRow from '../FavRow'


export default class FavsScreen extends React.Component {

    static navigatorStyle = navBarStyle

    constructor(props) {
        super(props)
        this.state = {
            favs : []
        }
        this.props.getFavs()
    }

    _renderRow(rowData, nav) {
        return new FavRow({movie: rowData, onRowPress: (movie) => this.navigateToMovieDetailScreen(movie), onRemove: (movie) => this._removeItem(movie)})
    }

    _removeItem(movie) {
        favs = this.state.favs
        var ind = -1
        this.refs.toast.show('Movie removed from favorites :(');
        for (index in favs) {
            if (favs[index].id == movie.id) {
                ind = index
            }
        }

        if (ind !== -1) {
            favs.splice(ind, 1);
            this.setState({ favs: favs })
            this.props.setFavs(favs)        
        }
        
      }

      componentWillReceiveProps(newProps) {
        this.setState({ favs: newProps.favourites })
      }

    render() {
        return (
            
            <View style={{flex:1, backgroundColor:'#454445'}}>
            <View>
            <Toast
    ref="toast"
    position='top'
    positionValue={200}
    fadeInDuration={300}
    fadeOutDuration={1000}/>
    </View>
            {this.state.favs.length > 0 ?
            <View style={{flex:1}}>
            <AnimatedList
            animation="scale"
        items={this.state.favs}
        duration={700}
        renderRow={(rowData) => this._renderRow(rowData, this.props.navigator)}
        onRemove={() => null}
        /></View> : <Text style={{marginTop:100, alignSelf:'center', fontSize:18, fontWeight:'bold', color:'#ffffff'}}>No favs to display</Text>
            }
        </View>
        );
    }

    navigateToMovieDetailScreen(movie) {
        this.props.navigator.push({
            screen: 'app.MovieDetailScreen',
            title: movie.headline,
            passProps: {
              movie: movie
            }
          });
    }
}


