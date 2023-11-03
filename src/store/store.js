import { configureStore } from '@reduxjs/toolkit'

import gamesSlice from './gamesSlice';

const store = configureStore({
  reducer: {
    games: gamesSlice,
  },
});

export default store;