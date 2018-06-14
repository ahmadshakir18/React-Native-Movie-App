import * as Constants from './constants';
import { AsyncStorage } from 'react-native';


export function fetchMoviesFromAPI(url) {
  return (dispatch) => {
    dispatch(getMovies())
    fetch(url)
      .then(data => data.json())
      .then(json => {
        dispatch(getMoviesSuccess(json))
      })
      .catch(err => dispatch(getMoviesFailure(err)))
  }
}

export function fetchFavsFromStorage() {
  return (dispatch) => {
    retrieveFromStorage("favs")
      .then(data => {
        let favs = data ? JSON.parse(data) : []
        dispatch(getFavsSuccess(favs))
      })
  }
}

export function setFavsInStorage(favs) {
  let jsonStr = JSON.stringify(favs)
  return (dispatch) => {
    addToStorage("favs", jsonStr)
      .then(() => {
        dispatch(setFavsSuccess(favs))
      })
  }
}

async function retrieveFromStorage(key) {
  return await AsyncStorage.getItem(key)
}

async function addToStorage(key, data) {
  return await AsyncStorage.setItem(key, data)
}

export function getMovies() {
  return {
    type: Constants.FETCHING_MOVIES
  }
}

export function getMoviesSuccess(data) {
  return {
    type: Constants.FETCHING_MOVIES_SUCCESS,
    data,
  }
}

export function getMoviesFailure() {
  return {
    type: Constants.FETCHING_MOVIES_FAILURE
  }
}

export function getFavsSuccess(favs) {
  return {
    type: Constants.GET_FAVS_SUCCESS,
    favs
  }
}

export function setFavsSuccess(favs) {
  return {
    type: Constants.SET_FAVS_SUCCESS,
    favs
  }
}