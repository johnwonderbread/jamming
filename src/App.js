import React, { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import Playlist from './components/Playlist/Playlist.js';
import Spotify from './util/Spotify.js';
//import update from 'immutability-helper';
import './App.css';

const accessToken = Spotify.getAccessToken(); 

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []    
    }
   
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))
    { 
      return ;
    } else {
      var joined = this.state.playlistTracks.concat(track);
      this.setState({ playlistTracks: joined })
      console.log(this.state.playlistName)
    }
      /* achieved with another method, but this is interesting: https://medium.freecodecamp.org/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5
      let playlistTracks = update(this.state.playlistTracks, {$merge: {[]: }})
      this.setState(this.playlistTracks);
      ^^^ failed attempt at one of the suggestions in the medium article
      */
  }

  removeTrack(track) {
      var array = this.state.playlistTracks; // make a separate copy of the array
      var index = array.indexOf(track)
      array.splice(index, 1);
      this.setState({ playlistTracks: array});
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist(playlistName, playlistTracks) {
    const trackUris = this.state.playlistTracks.map(playlistTracks => playlistTracks.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    
    this.setState({
      searchResults: []
    })

    this.setState({
      playlistName: []
    })
    
  }

  searchSpotify(searchQuery) {
    Spotify.searchSpotify(searchQuery).then(tracks =>
      this.setState({
        searchResults: tracks
      }));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onRemove={this.removeTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              onAdd={this.addTrack}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
