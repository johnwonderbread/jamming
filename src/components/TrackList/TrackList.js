import React from 'react';
import Track from '../Track/Track.js';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(tracks => <Track tracks={tracks} key={tracks.id} />)
        }
      </div>
    )
  }
};

export default TrackList;
