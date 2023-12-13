// Leagues
export const MLB = 'MLB';
export const NBA = 'NBA';
export const NCAAF = 'NCAAF';
export const NFL = 'NFL';
export const NHL = 'NHL';

// Array of existing leagues
export const ALL_LEAGUES = [MLB, NBA, NCAAF, NFL, NHL];

// Game states
export const SCHEDULED = 'STATUS_SCHEDULED';
export const HALFTIME = 'STATUS_HALFTIME';
export const IN_PROGRESS = 'STATUS_IN_PROGRESS';
export const FINAL = 'STATUS_FINAL';
export const END_PERIOD = 'STATUS_END_PERIOD';
export const DELAYED = 'STATUS_DELAYED';

export const DATA_URLS = {
  [MLB]:    'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard',
  [NBA]:    'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
  [NCAAF]:  'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard',
  [NFL]:    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard',
  [NHL]:    'https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard'
};

export const COLORS = {
  PRIMARY: '#040D12', // Deep Night
  SECONDARY: '#183D3D', // Teal Shadow
  ACCENT: '#5C8374', // Moss Green
  HIGHLIGHT: '#93B1A6', // Misty Blue
  CONTROL: '#4A646C', // Light Blue Grey
  LIGHT: '#FDFDFB',
  FONT: {
    LIGHT_GRAY: '#424347'
  }
}

export const MATCH_DISPLAY = {
  LINEAR: 'linear',
  MULTI: 'multi'
}