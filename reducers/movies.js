import { FETCHING_MOVIES, FETCHING_MOVIES_SUCCESS, FETCHING_MOVIES_FAILURE, GET_FAVS_SUCCESS } from '../constants'
const initialState = {
  movies: [],
  isFetching: false,
  error: false,
  favs: []
}

export default function moviesReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_MOVIES:
      return {
        ...state,
        movies: [],
        error: false,
        isFetching: true,
        favs: state.favs
      }
    case FETCHING_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.data,
        error: false,
        isFetching: false,
        favs: state.favs
      }
    case FETCHING_MOVIES_FAILURE:
      return {
        ...state,
        movies: [],
        error: true,
        isFetching: false,
        favs: state.favs
      }
    case GET_FAVS_SUCCESS:
      return {
        movies: state.movies,
        error: state.error,
        isFetching: state.isFetching,
        favs: action.favs
      }

    default:
      return state
  }
}