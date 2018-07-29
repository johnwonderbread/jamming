import React from 'react';

class Track extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.tracks.name}</h3>
          <p>{`${this.props.tracks.artist} | ${this.props.tracks.album}`}></p>
        </div>
        <a className="Track-action"> </a>
      </div>
    )
  }
};

export default Track;
