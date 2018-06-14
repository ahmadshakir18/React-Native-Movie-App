import HomeScreen from '../../Components/HomeScreen'
import { connect } from 'react-redux'
import { fetchMoviesFromAPI, fetchFavsFromStorage, setFavsInStorage } from '../../actions'

function mapStateToProps (state) {
    return {
      movies: state.movies
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      getMovies: (url) => dispatch(fetchMoviesFromAPI(url)),
      getFavs: () => dispatch(fetchFavsFromStorage()),
      setFavs: (data) => dispatch(setFavsInStorage(data))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeScreen)