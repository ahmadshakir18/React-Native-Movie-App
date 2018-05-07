import React from 'react';
import { Navigation } from 'react-native-navigation';
import { TouchableHighlight, AsyncStorage, View, ListView, StyleSheet, Navigator } from 'react-native';
import {Tile, Card, ListItem, Button, Text, List} from 'react-native-elements';
import AnimatedList from 'react-native-animated-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';
import FavsRow from '../FavsRow'


export default class FavsScreen extends React.Component {

    static navigatorStyle = {
        navBarTextColor: '#F5F2DC',
        navBarBackgroundColor: '#FF5729',
        navBarButtonColor: '#F5F2DC'
      };

    constructor(props) {
        super(props)
        this.state = {
            favs: []
          };
        this.getFavsFromStorage()
    }

    _renderRow(rowData, nav) {
        return new FavsRow({movie: rowData, navigation: nav, onRemove: (movie) => this._removeItem(movie)})
    }

    _removeItem(movie) {
        let favs = this.state.favs
        var ind = -1
        this.refs.toast.show('Movie removed from favorites :(');
        for (index in favs) {
            if (favs[index].id == movie.id) {
                ind = index
            }
        }
        if (ind !== -1) {
            favs.splice(ind, 1);
            this.updateFavsInStorage(favs)
        }
        
      }


      async updateFavsInStorage(favs) {

        await AsyncStorage.setItem("favs", JSON.stringify(favs))
        
        this.setState({favs: favs})
      }

    render() {
        this.getFavsFromStorage()
        favs = this.state.favs
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
            {favs.length > 0 ?
            <View style={{flex:1}}>
            <AnimatedList
            animation="scale"
        items={favs}
        duration={700}
        renderRow={(rowData) => this._renderRow(rowData, this.props.navigator)}
        onRemove={() => null}
        /></View> : <Text style={{marginTop:100, alignSelf:'center', fontSize:18, fontWeight:'bold', color:'#ffffff'}}>No favs to display</Text>
            }
        </View>
        );
    }
    

    _openDetails(movie) {
        alert("lol")
    }

      async getFavsFromStorage() {
        const favourites = await AsyncStorage.getItem("favs")
        favs = (favourites !== null) ? JSON.parse(favourites) : []
        this.setState({favs: favs})
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
      }
  });

