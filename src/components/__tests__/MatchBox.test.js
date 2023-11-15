import React from 'react';
import { afterEach, describe, expect, test } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react'

import { MatchBox } from 'components';
import { IN_PROGRESS, SCHEDULED, COLORS } from 'consts';

const scheduledGame = {
  status: 'Scheduled',
  statusCode: SCHEDULED,
  gameDatetime: '2023-11-14T00:30Z',
  teamAway: {
    name: 'Washington Wizards',
    record: '2-7',
    logo: 'https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/wsh.png',
    score: '0',
    winner: null
  },
  teamHome: {
    name: 'Toronto Raptors',
    record: '4-5',
    logo: 'https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/tor.png',
    score: '0',
    winner: null
  }
};

const inProgressGame = {
  status: '3:07 - 2nd',
  statusCode: IN_PROGRESS,
  gameDatetime: '2023-11-14T00:30Z',
  teamAway: {
    name: 'Washington Wizards',
    record: '2-7',
    logo: 'https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/wsh.png',
    score: '24',
    winner: null
  },
  teamHome: {
    name: 'Toronto Raptors',
    record: '4-5',
    logo: 'https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/tor.png',
    score: '38',
    winner: null
  }
};

const finalGame = {
  status: 'Final',
  statusCode: 'STATUS_FINAL',
  gameDatetime: '2023-11-15T00:30Z',
  teamAway: {
    name: 'San Antonio Spurs',
    record: '3-8',
    logo: 'https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/sa.png',
    score: '87',
    winner: false
  },
  teamHome: {
    name: 'Oklahoma City Thunder',
    record: '7-4',
    logo: 'https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/okc.png',
    score: '123',
    winner: true
  }
};

afterEach(() => {
  cleanup();
});

describe("MatchBox", () => {
  test("scheduled state for upcoming game", () => {
    render(<MatchBox {...scheduledGame} />);

    screen.getByText('Scheduled');
    screen.getByText('Washington Wizards');
    screen.getByText('Toronto Raptors');
  });

  test("in progress state for ongoing game", () => {
    render(<MatchBox {...inProgressGame} />);

    screen.getByText('3:07 - 2nd');
    screen.getByText('Washington Wizards');
    screen.getByText('Toronto Raptors');
  });

  test("final state for done game", () => {
    render(<MatchBox {...finalGame} />);

    screen.getByText('Final');
    screen.getByText('Oklahoma City Thunder');
    screen.getByText('San Antonio Spurs');
  });
});
