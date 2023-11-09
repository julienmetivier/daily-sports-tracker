// Leagues
export const MLB = 'MLB';
export const NBA = 'NBA';
export const NCAAF = 'NCAAF';
export const NFL = 'NFL';
export const NHL = 'NHL';

// Game states
export const HALFTIME = 'STATUS_HALFTIME';
export const IN_PROGRESS = 'STATUS_IN_PROGRESS';
export const FINAL = 'STATUS_FINAL';
export const END_PERIOD = 'STATUS_END_PERIOD';

export const DATA_URLS = {
  [MLB]:    'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard',
  [NBA]:    'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
  [NCAAF]:  'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard',
  [NFL]:    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard',
  [NHL]:    'https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard'
};