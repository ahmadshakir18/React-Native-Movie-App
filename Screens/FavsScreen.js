import React from 'react';
import { Navigation } from 'react-native-navigation';
import { TouchableHighlight, AsyncStorage, View, ListView, StyleSheet, Navigator } from 'react-native';
import {Tile, Card, ListItem, Button, Text, List} from 'react-native-elements';
import AnimatedList from 'react-native-animated-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import FavsRow from '../FavsRow'


export default class FavsScreen extends React.Component {


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
        if (favs.length > 0) {
        return (
            <AnimatedList
            animation="scale"
        items={favs}
        duration={400}
        renderRow={(rowData) => this._renderRow(rowData, this.props.navigator)}
        onRemove={() => null}
        />
        );
    }
    else {
        return (
        <Text>No favs to show :(</Text>
        );
    }
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

