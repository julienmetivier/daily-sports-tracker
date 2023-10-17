export function checkIfWinnerExistsAndValue(team) {
  if (!team.hasOwnProperty('winner')) {
    return null;
  }

  return team.winner === true ? true : false
}

export function teamBuilder(team) {
  return {
    name: team.team.displayName,
    record: team.records ? team.records[0].summary : 'N/A',
    logo: team.team.logo || null,
    score: team.score >= 0 ? team.score : null,
    winner: checkIfWinnerExistsAndValue(team),
  };
}
