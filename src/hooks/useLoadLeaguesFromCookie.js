import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie-consent';

import { APP_COOKIE_LEAGUES } from 'consts';

import { setLeaguesOrder } from '../store/gamesSlice';

export default function useLoadLeaguesFromCookie() {
  const dispatch = useDispatch();

  useEffect(() => {
    const leaguesFromCookie = Cookies.get(APP_COOKIE_LEAGUES);
    if (leaguesFromCookie && leaguesFromCookie !== 'undefined') {
      dispatch(setLeaguesOrder({ leagues: JSON.parse(leaguesFromCookie), fromCookie: true }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Not recommended to include dispatch
}