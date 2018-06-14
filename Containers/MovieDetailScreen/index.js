import MovieDetailScreen from '../../Components/MovieDetailScreen'
import { connect } from 'react-redux'
import { fetchFavsFromStorage, setFavsInStorage } from '../../actions'

function mapStateToProps (state) {
    return {
      favourites: state.movies.favs
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      getFavs: () => dispatch(fetchFavsFromStorage()),
      setFavs: (json) => dispatch(setFavsInStorage(json))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MovieDetailScreen)