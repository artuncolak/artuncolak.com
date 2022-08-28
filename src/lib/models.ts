export interface NowPlaying {
  name: string;
  artist: string;
  isPlaying: boolean;
}

export interface Experience {
  company: { name: string; url: string | null };
  position: string;
  startDate: string;
  endDate: string | null;
  descriptions: string[];
}
