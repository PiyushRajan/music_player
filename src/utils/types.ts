// export interface SongData {
//     id: number;
//     title: string;
//     artist: string;
//     img_src: string;
//     src: string;
//   }
  
// export  interface InitialData {
//     songs: SongData[];
//   }
  
// export  interface AppData {
//     initialData: InitialData;
//   }
  

  export interface SongData {
    id: number;
    title: string;
    artist: string;
    img_src: string;
    src: string;
  }
  
  export interface SongDurations {
    [key: string]: string;
  }
  
  export interface SelectedSong {
    id: number;
    title: string;
    artist: string;
    time: string;
    img_src: string;
    src: string;
  }
  
  export interface CurrentSong {
    id: number;
    title: string;
    artist: string;
    time: string;
    img_src: string;
    src: string;
  }
  
  export interface InitialData {
    songs: SongData[];
  }
  
  export interface YourData {
    initialData: InitialData;
    songDurations: SongDurations;
    selectedSong: SelectedSong;
    currentSong: CurrentSong;
  }
  