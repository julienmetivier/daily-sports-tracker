import { useEffect, useState } from 'react';

import { IN_PROGRESS } from 'consts';
import { checkIfWinnerExistsAndValue } from 'utils';

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
            const formattedGameDate = new Date(game.date);
            const formattedTodayDate = new Date();
            if (formattedGameDate.setHours(0,0,0,0) === formattedTodayDate.setHours(0,0,0,0))
            {
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
                teamAway: {
                  name: teams.away.team.displayName,
                  record: teams.away.records[0].summary,
                  logo: teams.away.team.logo,
                  score: teams.away.score >= 0 ? teams.away.score : null,
                  winner: checkIfWinnerExistsAndValue(teams.away),
                },
                teamHome: {
                  name: teams.home.team.displayName,
                  record: teams.home.records[0].summary,
                  logo: teams.home.team.logo,
                  score: teams.home.score >= 0 ? teams.home.score : null,
                  winner: checkIfWinnerExistsAndValue(teams.home),
                }
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