export function checkIfWinnerExistsAndValue(team) {
  if (!team.hasOwnProperty('winner')) {
    return null;
  }

  return team.winner === true ? true : false
}