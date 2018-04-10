import React from 'react'
import { TouchableHighlight, View, Text, ListView, StyleSheet } from 'react-native'

import { Navigation } from 'react-native-navigation';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.startApp();
  }
  
  startApp() { 
   /*
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'app.HomeScreen',
      title: 'Movies App'
    }
  });
   */

  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Home',
        screen: 'app.HomeScreen', 
        title: 'Movies'
      },
      {
        label: 'Favs',
        screen: 'app.FavsScreen',
        title: 'Favorites'
      }
    ]
  });
  }
}

export default App;