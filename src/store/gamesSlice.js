import { createSlice } from '@reduxjs/toolkit'

import { MLB, NBA, NCAAF, NFL, NHL} from 'consts';

const initialLeagues = [MLB, NBA, NCAAF, NFL, NHL]

const initialState = {
  leagues: initialLeagues,
  games: Object.assign({}, ...initialLeagues.map((x) => ({[x]: []}))),
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action) => {
      const { league, games } = action.payload;
      state.games[league] = games;
    },
    setLeaguesOrder: (state, action) => {
      state.leagues = action.payload.leagues;
    },
  }
});

export const { setGames, setLeaguesOrder } = gamesSlice.actions;

export const retrieveLeagues = (state) => state.games.leagues;
export const retrieveGamesByLeague = (state, league) => state.games.games[league];

export default gamesSlice.reducer;