import { createSelector, createSlice } from '@reduxjs/toolkit'

import { MLB, NBA, NCAAF, NFL, NHL} from 'consts';

const initialLeagues = [MLB, NBA, NCAAF, NFL, NHL];

const initialState = {
  leagues: initialLeagues,
};

initialLeagues.forEach((league) => {
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