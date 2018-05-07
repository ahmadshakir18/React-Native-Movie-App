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
        title: 'Movies',
        icon: require('./img/home.png')
      },
      {
        label: 'Favorites',
        screen: 'app.FavsScreen',
        title: 'Favorites',
        icon: require('./img/favs.png')
      }
    ],
    tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
      tabBarButtonColor: '#F5F2DC', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
      tabBarSelectedButtonColor: '#FF5729', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
      tabBarBackgroundColor: '#0A0A0A', // optional, change the background color of the tab bar
      initialTabIndex: 0, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
    }
  });
  }
}

export default App;