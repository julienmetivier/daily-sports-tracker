import { COLORS } from 'consts';

export const loserColor = COLORS.FONT.LIGHT_GRAY;
export const winnerColor = 'white';
export const gameFinishedColor = loserColor;

export const MatchBoxScoreFadeInStyle = {
  animation: 'fadeIn 1s',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-20%)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
};