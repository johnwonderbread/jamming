import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

//not working, needs to be revisited!
  handleNameChange(event) {
    this.setState({name: event.target.value})
    {/*this.setState({playlistName: event.target.value})*/}
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input placeholder="New Playlist" onChange={this.handleNameChange}/>
          <TrackList
            tracks={this.props.playlistTracks}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval="true" />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  }
};

export default Playlist;
