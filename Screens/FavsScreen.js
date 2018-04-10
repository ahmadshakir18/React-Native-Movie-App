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

    _renderRow(rowData) {
        return (<FavsRow item={rowData} />);
    }

    _removeItem(item) {
        favs.splice(favs.indexOf(item), 1);
      }

    render() {
        favs = this.state.favs
        alert(favs.length)
        if (favs.length > 0) {
        return (
            <AnimatedList
            animation="scale"
        items={favs}
        duration={300}
        renderRow={this._renderRow}  
        onRemove={(item) => this._removeItem(item)
        }
/>
        );
    }
    else {
        return null
    }
    }


      async getFavsFromStorage() {
        const favourites = await AsyncStorage.getItem("favs")
        favs = (favourites !== null) ? JSON.parse(favourites) : []
        this.setState({favs: favs})
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        paddingLeft: 5,
        paddingRight: 5
      },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
      }
  });

