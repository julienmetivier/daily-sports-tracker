import { DATA_URLS, MLB, IN_PROGRESS, END_PERIOD } from 'consts';

export function buildUrl(league, currentDate) {
  const today = new Date();
  let url = DATA_URLS[league];
  if ( currentDate.setHours(0,0,0,0) !== today.setHours(0,0,0,0) ) {
    const dateStr = currentDate.toISOString().slice(0,10).replace(/-/g,"");
    url += `?dates=${dateStr}`;
  }

  return url;
}

export function checkIfWinnerExistsAndValue(team) {
  if (!team.hasOwnProperty('winner')) {
    return null;
  }

  return team.winner === true ? true : false
}

export function teamBuilder(team) {
  // Rule for NCAA (and potentially more)
  const isRanked = team.curatedRank?.current && team.curatedRank?.current !== 99;

  return {
    name: isRanked ? `${team.curatedRank.current} - ${team.team.displayName}` : team.team.displayName,
    record: team.records ? team.records[0].summary : 'N/A',
    logo: team.team.logo || null,
    score: team.score >= 0 ? team.score : null,
    winner: checkIfWinnerExistsAndValue(team),
  };
}

export function isCurrentGameToday(gameDate, currentDate) {
  const formattedGameDate = new Date(gameDate);
  const formattedTodayDate = currentDate || new Date();
  return formattedGameDate.setHours(0,0,0,0) === formattedTodayDate.setHours(0,0,0,0);
}

export function getLocalGameTime(gameDatetime) {
  return new Date(gameDatetime).toLocaleTimeString('en-us', {
    hour: 'numeric', 
    minute: 'numeric'
  });
}

export function formatFetchCall(league, response, currentDate = null) {
  const simplifiedFormat = [];
  if ( response.events.length > 0 ) {
    response.events.forEach(game => {
      if ( isCurrentGameToday(game.date, currentDate)) {
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
              status: [IN_PROGRESS, END_PERIOD].includes(statusCode) ? game.status.type.shortDetail : game.status.type.description,
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

  return simplifiedFormat;
}
