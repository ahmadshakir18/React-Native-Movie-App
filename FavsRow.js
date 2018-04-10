import React from 'react';
import { Navigation } from 'react-native-navigation';
import { TouchableHighlight, AsyncStorage, View, ListView, StyleSheet, Navigator } from 'react-native';
import {Tile, Card, ListItem, Button, Text, List} from 'react-native-elements';
import AnimatedList from 'react-native-animated-list';
import Icon from 'react-native-vector-icons/FontAwesome';


const FavsRow = (props) => (
    <Tile
        imageSrc={{ uri: props.item.keyArtImages[0].url}}
        title="Lorem ipsum dolor sit amet, consectetur"
        
        contentContainerStyle={{ height: 100 }}
      >
        <View>
          <Text>Caption</Text>
          <Icon.Button name="heart" backgroundColor="transparent" size={35} color="red" onPress={() => props.onRemove(props.item)}>
  </Icon.Button>
        </View>
      </Tile>
  );

  FavsRow.propTypes = {
    onRemove: React.PropTypes.func,
    item: React.PropTypes.object,
  };

  export default FavsRow;