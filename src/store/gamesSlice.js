import { createSlice } from '@reduxjs/toolkit'

import { ALL_LEAGUES, MATCH_DISPLAY } from 'consts';

const initialState = {
  leagues: ALL_LEAGUES,
  displayFormat: MATCH_DISPLAY.LINEAR
};

ALL_LEAGUES.forEach((league) => {
  initialState[league] = {
    initialLoading: true,
    games: [],
  };
});

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action) => {
      const { league, games } = action.payload;
      state[league].initialLoading = false;
      state[league].games = games;
    },
    setLeaguesOrder: (state, action) => {
      state.leagues = action.payload.leagues;
    },
    setDisplayFormat: (state, action) => {
      state.displayFormat = action.payload.displayFormat;
    },
  }
});

export const { setGames, setLeaguesOrder, setDisplayFormat } = gamesSlice.actions;

export const retrieveLeagues = (state) => state.games.leagues;
export const retrieveLeague = (state, league) => state.games[league];
export const retrieveDisplayFormat = (state) => state.games.displayFormat;

export default gamesSlice.reducer;