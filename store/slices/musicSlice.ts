import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { audioService } from '../services/audioService';
import library from '@/assets/data/library.json';

interface Track {
  title: string;
  artist?: string;
  image?: string;
  artwork?: string;
  url: string;
}

interface MusicState {
  currentTrack: Track | null;
  isPlaying: boolean;
  isLoading: boolean;
  queue: Track[];
  currentIndex: number;
}

const initialState: MusicState = {
  currentTrack: null,
  isPlaying: false,
  isLoading: false,
  queue: library,
  currentIndex: -1,
};

export const playTrack = createAsyncThunk(
  'music/playTrack',
  async (track: Track, { getState }) => {
    const state = getState() as RootState;
    const index = state.music.queue.findIndex((t) => t.url === track.url);

    await audioService.loadSound(track.url);
    await audioService.playSound();

    return { track, index };
  }
);

export const playNextTrack = createAsyncThunk(
  'music/playNextTrack',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const nextIndex = (state.music.currentIndex + 1) % state.music.queue.length;
    const nextTrack = state.music.queue[nextIndex];

    if (nextTrack) {
      await dispatch(
        playTrack({
          ...nextTrack,
          image: nextTrack.artwork,
        })
      );
    }

    return nextIndex;
  }
);

export const togglePlayPause = createAsyncThunk(
  'music/togglePlayPause',
  async (_, { getState }) => {
    const { music } = getState() as RootState;

    if (music.isPlaying) {
      await audioService.pauseSound();
    } else {
      await audioService.playSound();
    }

    return !music.isPlaying;
  }
);

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(playTrack.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(playTrack.fulfilled, (state, action) => {
        state.currentTrack = action.payload.track;
        state.currentIndex = action.payload.index;
        state.isPlaying = true;
        state.isLoading = false;
      })
      .addCase(playTrack.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(togglePlayPause.fulfilled, (state, action) => {
        state.isPlaying = action.payload;
      })
      .addCase(playNextTrack.fulfilled, (state, action) => {
        state.currentIndex = action.payload;
      });
  },
});

export default musicSlice.reducer;