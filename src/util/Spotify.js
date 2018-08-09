import React from 'react';
import { access } from 'fs';

const clientId = '1973d8a68c134779b727749b476716b4'; // Your client id
const redirectUri = 'http://localhost:3000/callback/'; // Your redirect uri

let accessToken;
let hasAccessToken;
let hasExpiresIn;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    let hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
    let hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (hasAccessToken) {
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
            if (!jsonResponse.tracks) {
              return [];
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
  },

  savePlaylist(playlistName, playlistTracks) {
    let userId;
    let playlistId;
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userUrl = `https://api.spotify.com/v1/me`;

    return fetch(userUrl, { headers: headers }).then(
      response => response.json().then(jsonResponse => {
        console.log(jsonResponse.id);
        return userId = jsonResponse.id;
      }).then(
        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: `POST`,
          headers: headers,
          body: JSON.stringify({
            name: playlistName
          })
        })
          .then(
            response => response.json().then(jsonResponse => {
              console.log(jsonResponse.id);
              return playlistId = jsonResponse.id;
            })
              .then(
                fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                  method: `POST`,
                  headers: headers,
                  body: JSON.stringify({
                    uris: playlistTracks
                  })
                }))
          )))
  }
}

/*
savePlaylist(name, trackUris) {
  if (!name || !trackUris || trackUris.length === 0) return;
  const userUrl = 'https://api.spotify.com/v1/me';
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };
  let userId = undefined;
  let playlistId = undefined;
  fetch(userUrl, {
    headers: headers
  })
    .then(response => response.json())
    .then(jsonResponse => userId = jsonResponse.id)
    .then(() => {
      const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
      fetch(createPlaylistUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          name: name
        })
      })
        .then(response => response.json())
        .then(jsonResponse => playlistId = jsonResponse.id)
        .then(() => {
          const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
          fetch(addPlaylistTracksUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              uris: trackUris
            })
          });
        })
    })
  */

export default Spotify;
