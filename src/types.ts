export interface GameCard {
  id: string;
  title: string;
  description: string;
  image: string;
  comingSoon: boolean;
}

export interface WallpaperOption {
  id: string;
  url: string;
  name: string;
}

export interface Settings {
  wallpaper: string;
  customWallpaper: string | null;
  backgroundColor: string;
  opacity: number;
}