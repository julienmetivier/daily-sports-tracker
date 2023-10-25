import { useEffect, useState } from 'react';

import { IN_PROGRESS, MLB } from 'consts';
import { checkIfWinnerExistsAndValue, isCurrentGameToday, teamBuilder } from 'utils';

function useFetchGames(league, url) {
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
              let tempGame = {};
              const gameDetails = game.competitions[0];
              const teams = {
                [gameDetails.competitors[0].homeAway]: gameDetails.competitors[0],
                [gameDetails.competitors[1].homeAway]: gameDetails.competitors[1],
              }
              const statusCode = game.status.type.name;

              switch(league) {
                case MLB:
                  const score = {
                    [gameDetails.series.competitors[0].id]: gameDetails.series.competitors[0],
                    [gameDetails.series.competitors[1].id]: gameDetails.series.competitors[1],
                  };
                  tempGame = {
                    status: statusCode === IN_PROGRESS ? game.status.type.shortDetail : game.status.type.description,
                    statusCode,
                    gameDatetime: game.date,
                    teamAway: {
                      name: teams.away.team.displayName,
                      record: `${score[teams.away.id].wins}-${score[teams.home.id].wins}`,
                      logo: teams.away.team.logo,
                      score: teams.away.score >= 0 ? teams.away.score : null,
                      winner: checkIfWinnerExistsAndValue(teams.away),
                    },
                    teamHome: {
                      name: teams.home.team.displayName,
                      record: `${score[teams.home.id].wins}-${score[teams.away.id].wins}`,
                      logo: teams.home.team.logo,
                      score: teams.home.score >= 0 ? teams.home.score : null,
                      winner: checkIfWinnerExistsAndValue(teams.home),
                    }
                  }
                  break;
                default:
                  tempGame = {
                    status: statusCode === IN_PROGRESS ? game.status.type.shortDetail : game.status.type.description,
                    statusCode,
                    gameDatetime: game.date,
                    teamAway: teamBuilder(teams.away),
                    teamHome: teamBuilder(teams.home)
                  };
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
  }, [league, url])
  return { data, loading };
}

export default useFetchGames;