import { useEffect, useState } from 'react';

import { IN_PROGRESS } from 'consts';
import { isCurrentGameToday, teamBuilder } from 'utils';

function useFetchFootballGames(url) {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setLoading(true);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const parsedResponse = JSON.parse(xhr.responseText);
        const simplifiedFormat = [];
        if ( parsedResponse.events.length > 0 ) {
          parsedResponse.events.forEach(game => {
            if (isCurrentGameToday(game.date)) {
              const gameDetails = game.competitions[0];
              const teams = {
                [gameDetails.competitors[0].homeAway]: gameDetails.competitors[0],
                [gameDetails.competitors[1].homeAway]: gameDetails.competitors[1],
              }
              const statusCode = game.status.type.name;
              // TODO: fortify score to get only overall

              const tempGame = {
                status: statusCode === IN_PROGRESS ? game.status.type.shortDetail : game.status.type.description,
                statusCode,
                gameDatetime: game.date,
                teamAway: teamBuilder(teams.away),
                teamHome: teamBuilder(teams.home)
              }
              simplifiedFormat.push(tempGame);
            }
          });
        }
        
        setData(simplifiedFormat);
        setLoading(false);
      }
    };
    xhr.send();
  }, [url])
  return { data, loading };
}

export default useFetchFootballGames;