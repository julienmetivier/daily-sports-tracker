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

export function isCurrentGameToday(gameDate) {
  const formattedGameDate = new Date(gameDate);
  const formattedTodayDate = new Date();
  return formattedGameDate.setHours(0,0,0,0) === formattedTodayDate.setHours(0,0,0,0);
}
