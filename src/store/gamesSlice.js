import { createSelector, createSlice } from '@reduxjs/toolkit'

import { MLB, NBA, NCAAF, NFL, NHL} from 'consts';

const initialLeagues = [MLB, NBA, NCAAF, NFL, NHL];

const initialState = {
  leagues: initialLeagues,
  initialLoadings: Object.assign({}, ...initialLeagues.map((x) => ({[x]: true}))),
  games: Object.assign({}, ...initialLeagues.map((x) => ({[x]: []}))),
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action) => {
      const { league, games } = action.payload;
      state.initialLoadings[league] = false;
      state.games[league] = games;
    },
    setLeaguesOrder: (state, action) => {
      state.leagues = action.payload.leagues;
    },
  }
});

export const { setGames, setLeaguesOrder } = gamesSlice.actions;

export const retrieveLeagues = (state) => state.games.leagues;
export const retrieveGames = (state) => state.games;
export const retrieveLeague = (state, league) => league;
// For more context on this function structure: https://redux.js.org/usage/deriving-data-selectors#createselector-behavior
export const retrieveGamesByLeague = createSelector([retrieveGames, retrieveLeague], (games, league) => {
  return ({
    initialLoading: games.initialLoadings[league],
    games: games.games[league]
  });
});

export default gamesSlice.reducer;