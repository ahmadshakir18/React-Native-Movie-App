import React from 'react'
import {
  AppRegistry
} from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import App from './app'
import { Navigation } from 'react-native-navigation';
import MovieDetailScreen from './Containers/MovieDetailScreen';
import HomeScreen from './Containers/HomeScreen';
import FavsScreen from './Containers/FavsScreen';

const store = configureStore()

Navigation.registerComponent('app.MovieDetailScreen', () => MovieDetailScreen, store, Provider)
Navigation.registerComponent('app.HomeScreen', () => HomeScreen, store, Provider)
Navigation.registerComponent('app.FavsScreen', () => FavsScreen, store, Provider)

const ReduxApp = new App();


AppRegistry.registerComponent('rnredux', () => ReduxApp)