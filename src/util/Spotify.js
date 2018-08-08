import React from 'react';
import { access } from 'fs';

const clientId = '1973d8a68c134779b727749b476716b4'; // Your client id
const client_secret = '27e8c8571a7b48548e49b24c02c99aa7'; // Your secret
const redirectUri = 'http://localhost:3000/callback/'; // Your redirect uri

let accessToken;
let hasAccessToken;
let hasExpiresIn;

const Spotify = {

  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    if (!hasAccessToken) {
      let hasAccessToken = window.location.href.match(/access_token=([^&]*)/); 
      let hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);     
    } else if (hasAccessToken) {
      accessToken = hasAccessToken[1];
      let expiresIn = Number(hasExpiresIn[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      console.log('Token success!')
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  searchSpotify(searchQuery) {
    const accessToken = Spotify.getAccessToken(); 
    return fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
      } 
    }).then(
      response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('API Request Failed');
        }
      }).then(
        jsonResponse => {
          if(!jsonResponse.tracks) {
            return[];
          }

          return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name, 
          uri: track.uri,
          cover: track.album.images[2].url, 
          preview: track.preview_url
        }));
    });
  }
}

export default Spotify;
