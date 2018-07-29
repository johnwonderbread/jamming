import React, { Component } from 'react';
import logo from './logo.svg';
import SearchBar from './components/SearchBar/SearchBar.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import Playlist from './components/Playlist/Playlist.js';
import './App.css';




class App extends Component {

  constructor(props) {
    super(props);

    this.playlistName = 'Rock out with your cock out';
    this.playlistTracks = [{
      name: 'Thrice',
      artist: 'Thrice',
      album: 'Thrice',
      id: 1
    }];

    this.state = {
      searchResults: [{
        name: '',
        artist: '',
        album: '',
        id: 1,
      }]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))
    {
      return ;
    }
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))
    {
      return ;
    }
  }


//not working, needs to be revisited!
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  searchSpotify(searchQuery) {

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults} />
            <Playlist
              playlistName={this.playlistName}
              playlistTracks={this.playlistTracks}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              onAdd={this.addTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
