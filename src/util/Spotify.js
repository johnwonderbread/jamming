import React from 'react';

const client_id = '2ff707f4950f437d85f73f89a24455f9'; // Your client id
const client_secret = '27e8c8571a7b48548e49b24c02c99aa7'; // Your secret
const redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

let accessToken;
let expiresIn;


const Spotify = {

  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    let url = window.location.href;
    accessToken = this.extract(url, "access_token=", "&");

    if (accessToken) {
      expiresIn = this.extract(url, "expires_in=", "&");
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      console.log("access token successfully retrieved.");
      return accessToken;
    } else {
      let state = 4321;
      window.location.href =
      `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirect_uri}&state=${state}`;
    }
  },

  searchSpotify(searchQuery) {
    return fetch(
        (`https://api.spotify.com/v1/search?type=track&q=${searchQuery}`),
        { headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then(response => {
          return response.json();
        }).then(jsonResponse => {
          if(jsonResponse.track) {
            return jsonResponse.track.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
              })
        )}
      });
  }
};




    {/* return (
      fetch
        (`https://api.spotify.com/v1/search?type=track&q=${searchQuery}`),
        headers:
          { Authorization: `Bearer ${accessToken}` }
        .then response =>
          return response.json();
        }).then(jsonResponse => {
        if(jsonResponse.track) {
            return(jsonResponse.track.map(track => ({
              return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          })))
        } else {
          return [];
        }
}; */}

export default Spotify;
