import React from 'react';
import { access } from 'fs';

const clientId = '2ff707f4950f437d85f73f89a24455f9'; // Your client id
const client_secret = '27e8c8571a7b48548e49b24c02c99aa7'; // Your secret
const redirectUri = 'http://localhost:3000/callback/'; // Your redirect uri

let accessToken;

const Spotify = {

  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    const hasAccessToken = window.location.href.match(/access_token=([^&]*)/); 
    const hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    
    if (hasAccessToken && hasExpiresIn) {
      accessToken = hasAccessToken[1];
      const expiresIn = Number(hasExpiresIn[1]);
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
    console.log(accessToken);
    return fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, 
      {mode: 'no-cors'},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
      } 
    }).then(
      response => {
          console.log(response)
        if (response.ok) {
          return response.json();
        } else {
          console.log('API Request Failed');
        }
      }).then(
        jsonResponse => {
          console.log(jsonResponse);
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