import { FETCHING_MOVIES, FETCHING_MOVIES_SUCCESS, FETCHING_MOVIES_FAILURE, GET_FAVS_SUCCESS } from './constants';
import AsyncStorage from 'react-native';


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

export function getMovies() {
  return {
    type: FETCHING_MOVIES
  }
}

export function getMoviesSuccess(data) {
  return {
    type: FETCHING_MOVIES_SUCCESS,
    data,
  }
}

export function getMoviesFailure() {
  return {
    type: FETCHING_MOVIES_FAILURE
  }
}

  export function getFavs() {
    return (dispatch) => {
      try {
        AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.')
        const value =  AsyncStorage.getItem('@MySuperStore:key');
        mm = [value]
        return {
          type: GET_FAVS_SUCCESS,
          mm
        }
      } catch (error) {

      }
    }
    
    }
