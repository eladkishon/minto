import { atom } from "jotai";
import { store } from "./store";

const AUTH_TOKEN = "BQCa10-25NRCD6ZV9wCeFKV2QPa_0_qHZxUuD958A04tJbE8aGj8DUc9c3fYt7ZREpc7mKCXVHfvPQwc4Q_DIibuOFWFwD3x-NUwgfQ4_yUKwltl3JanrkAayre4R1JL58WTlPeKnwtAS7Dui8RcajBEJwr3efFCANZ6mgFLX2uM0P5az7sk-_IrEGMnoku2MjD8WxP6PlCjcPGkNhQ";


export const spotifyAtom = atom({ deviceId: null, isPlaying: false , player: null})



window.onSpotifyWebPlaybackSDKReady = () => {
  const token = AUTH_TOKEN
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); },
    volume: 0.5
  });


  player.addListener('ready', async ({ device_id }) => {   
    console.log("settinng device id",store.get(spotifyAtom) )
    store.set(spotifyAtom, (state) => ({ ...state, deviceId: device_id }))

    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${store.get(spotifyAtom).deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: ['https://open.spotify.com/track/1ZlFLSDQ4iijuqBhyhAFnT?si=15913df33065480c'] }), // Set the track to play
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
      },
    })

  });

  player.addListener('player_state_changed', (state) => {
    if (!state) {
      return;
    }


  });

  player.connect()

  store.set(spotifyAtom, (state) => ({...state, player}))

}