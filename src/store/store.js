import { configureStore } from '@reduxjs/toolkit'
import { Cookies } from 'react-cookie-consent';

import { APP_COOKIE_LEAGUES } from 'consts';

import gamesSlice from './gamesSlice';

const cookieMiddleware = () => next => action => {
  let result = next(action);

  if (action.type === 'games/setLeaguesOrder' && !action.payload.fromCookie) {
    Cookies.set(APP_COOKIE_LEAGUES, JSON.stringify(action.payload.leagues));
  }

  return result;
};

const store = configureStore({
  reducer: {
    games: gamesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cookieMiddleware),
});

export default store;