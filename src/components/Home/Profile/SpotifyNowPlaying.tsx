import { NowPlaying } from '@lib/models';
import { IconBrandSpotify } from '@tabler/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SpotifyNowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>();

  const getNowPlaying = async () => {
    const response = await axios.get('/api/now-playing');
    setNowPlaying(response.data);
  };

  useEffect(() => {
    getNowPlaying();
    const interval = setInterval(getNowPlaying, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 xl:ml-auto">
      <a
        href="https://open.spotify.com/user/11127672567?si=15fb650a241c4af9"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconBrandSpotify color="#1DB954" className="sm:h-8 sm:w-8" />
      </a>
      <span className="text-sm font-bold text-black dark:text-white sm:text-base">
        {!nowPlaying || !nowPlaying.isPlaying ? 'Not Playing' : nowPlaying.name}

        <span className="font-normal text-zinc-500">
          {` - ${
            !nowPlaying || !nowPlaying.isPlaying ? 'Spotify' : nowPlaying.artist
          }`}
        </span>
      </span>
    </div>
  );
}
