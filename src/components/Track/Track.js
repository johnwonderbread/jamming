import React from 'react';

class Track extends React.Component {

  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  render() {

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.tracks.name}</h3>
          <p>{`${this.props.tracks.artist} | ${this.props.tracks.album}`}></p>
        </div>
        <a className="Track-action">
          <p onClick={this.addTrack}>+</p>
          <p onClick={this.removeTrack}>-</p>
        </a>
      </div>
    )
  }
};

export default Track;
