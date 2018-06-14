import React from 'react'
import { Navigation } from 'react-native-navigation';
import { TouchableOpacity, View, Text, ListView, ActivityIndicator, Button } from 'react-native'
import Image from 'react-native-image-progress';
import Carousel from 'react-native-banner-carousel';
import { SearchBar } from 'react-native-elements';
import { styles, navBarStyle, BannerWidth } from './styles'
import MovieRow from '../MovieRow';

const BannerHeight = 220;

export default class HomeScreen extends React.Component {

    carouselImageIndex = 0
    carouselMovies = []

    static navigatorStyle = navBarStyle

    static navigatorButtons = {
        rightButtons: [
            {
                systemItem: 'search',
                id: 'search'
            }
        ]
    }

    onNavigatorEvent(event) { // this is the onPress handler for the nav button/buttons
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'search') { // this is the same id field from the static navigatorButtons definition
                this.refs.listView.scrollTo({ animated: true }, 0);
                if (this.state.showSearchBar) {
                    this.refs.searchBar.focus()
                }
                else {
                    this.setState({ showSearchBar: true })
                }
            }
        }
    }


    hideSearchBarButton() {
        this.setState({ showSearchBar: false });
    }

    constructor(props) {

        super(props);
        this.state = {
            showSearchBar: false
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.props.getMovies("https://s3.amazonaws.com/vodassets/showcase.json");
    }

    renderPage(image, index) {

        return (
            <TouchableOpacity key={index} onPress={() => this.carouselImagePressed()}>
                <View key={index} >
                    <Image style={styles.carouselImage} source={{ uri: image }} />
                </View>
            </TouchableOpacity>
        );
    }

    render() {

        var { movies, error, isFetching, favs } = this.props.movies;
        showSearchBar = this.state.showSearchBar

        movies.sort(function (a, b) { return a.headline > b.headline });

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.headline !== r2.headline });
        if (this.state.showSearchResults) {
            this.state = {
                dataSource: ds.cloneWithRows(this.state.searchResults),
            };
        }
        else {
            this.state = {
                dataSource: ds.cloneWithRows(movies),
            };
        }
        if (error) {
            alert("Unable to retrieve movies from server. Please try again :(");
            return (
                <View style={styles.container}>
                    <Text>OMGS error :(</Text>
                </View>
            );
        }
        else if (isFetching) {
            this.props.navigator.setStyle({
                navBarHidden: true
            });
            return (
                <View style={styles.fetchingView}>
                    <ActivityIndicator size="large" color="#F1C533" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            );
        }
        else {

            this.props.navigator.setStyle({
                navBarHidden: false
            });

            return (
                movies.length ?

                    <ListView
                        ref='listView'
                        dataSource={this.state.dataSource}
                        renderRow={(data) => this._renderRow(data)}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                        renderHeader={() => this.renderCarouselInHeader(showSearchBar)}
                        style={styles.bgColor}
                    />

                    : null

            );
        }
    }



    _renderRow(data) {
        return new MovieRow({movie: data, onRowPress: (movie) => this.navigateToMovieDetailScreen(movie)})

    }

    renderCarouselInHeader(showSearchBar) {
        movs = this.props.movies.movies.slice(0)
        movs.sort(function (a, b) { return a.year < b.year })
        this.carouselMovies = []
        for (i = 0; i < 8; i++) {
            this.carouselMovies.push(movs[i])
        }

        return (
            <View style={styles.bgColor}>
                {showSearchBar &&
                    <View style={styles.searchBarParentView}>
                        <SearchBar
                            ref={searchBar => this.searchBar = searchBar}
                            round
                            autoFocus
                            placeholder='Search...'
                            onChangeText={(text) => this.searchInMovies(text)}
                            containerStyle={styles.searchBar}
                        />
                        <View style={styles.hideButton}>
                            <Button
                                title="Hide"
                                color="#ffffe6"
                                onPress={() => this.hideSearchBarButton()}
                            /></View>
                    </View>
                }
                <Carousel
                    autoplay
                    autoplayTimeout={4000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                    onPageChanged={(index) => this.carouselImageIndex = index}
                >
                    {this.carouselMovies.map((image, index) => this.renderPage(image.cardImages.slice(-1)[0].url, index))}
                </Carousel>
            </View>
        );
    }

    searchInMovies(text) {
        movies = this.props.movies.movies
        if (text.length > 3) {
            lowerCasedStr = text.toLowerCase()
            searchResults = []
            for (i in movies) {
                if (movies[i].headline.toLowerCase().match(lowerCasedStr) || (movies[i].synopsis ? movies[i].synopsis.toLowerCase().match(lowerCasedStr) : false)) {
                    searchResults.push(movies[i])
                }
            }
            this.setState({
                searchResults: searchResults,
                showSearchResults: true,
                showSearchBar: true
            });
        }
        else if (text.length <= 3) {
            this.setState({
                searchResults: movies,
                showSearchResults: true,
                showSearchBar: true
            });
        }
    }

    carouselImagePressed() {
        movieForDetailView = this.carouselMovies[this.carouselImageIndex]
        this.props.navigator.push({
            screen: 'app.MovieDetailScreen',
            title: movieForDetailView.headline,
            passProps: {
                movie: movieForDetailView
            }
        });
    }

    navigateToMovieDetailScreen(movie) {
        this.props.navigator.push({
            screen: 'app.MovieDetailScreen',
            title: movie.headline,
            passProps: {
              movie: movie
            }
          });
    }

}

