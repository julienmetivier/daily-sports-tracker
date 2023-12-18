import { createSlice } from '@reduxjs/toolkit'

import { ALL_LEAGUES } from 'consts';

const initialState = {
  leagues: ALL_LEAGUES
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
  }
});

export const { setGames, setLeaguesOrder } = gamesSlice.actions;

export const retrieveLeagues = (state) => state.games.leagues;
export const retrieveLeague = (state, league) => state.games[league];

export default gamesSlice.reducer;