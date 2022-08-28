import { getNowPlaying } from '@lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

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
