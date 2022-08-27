import axios from 'axios';
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN
} from 'lib/config';
import type { NextApiRequest, NextApiResponse } from 'next';

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

interface SpotifyResponse {
  is_playing: boolean;
  item: {
    name: string;
    artists: [
      {
        name: string;
      }
    ];
  };
}

const basic = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString('base64');

const getAccessToken = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', SPOTIFY_REFRESH_TOKEN);

  const data = (
    await axios.post(TOKEN_ENDPOINT, params, {
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  ).data;

  return data.access_token;
};

const getNowPlaying = async (): Promise<SpotifyResponse> => {
  const access_token = await getAccessToken();

  return (
    await axios.get(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
  ).data;
};

export default async function nowPlaying(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getNowPlaying();

    const isPlaying = data.is_playing;
    const name = data.item.name;
    const artist = data.item.artists.map((artist) => artist.name).join(', ');

    res.status(200).json({ name, artist, isPlaying });
  } catch (error) {
    res.status(200).json({ isPlaying: false });
  }
}
