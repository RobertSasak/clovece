import React from 'react';
import Svg, { Line, Rect } from 'react-native-svg';
import { Field, Token } from '.';
import { Color } from '../../types';
import { Stack } from './Stack';

export interface BoardProps {
}

const WHOLE_BOARD_WIDTH = 1000;
const WHOLE_BOARD_HEIGHT = 1000;
const WHOLE_BOARD_MARGIN = 20;

const STACK_WIDTH = ((WHOLE_BOARD_WIDTH - (2 * WHOLE_BOARD_MARGIN)) / 2) - 40;
const FIELD_SIZE = 80;
const TOKEN_SIZE = 40;

enum FieldSector {
  STACK = 'stack',
  BOARD = 'board',
  HOME = 'home',
}

interface PositionAndColor {
  x: number;
  y: number;
  color: string;
}

interface Fields {
  [FieldSector.STACK]: PositionAndColor[][];
  [FieldSector.HOME]: PositionAndColor[][];
  [FieldSector.BOARD]: PositionAndColor[];
}

export const Board: React.FC<BoardProps> = (propsx) => {

  const props = {
    players: [
      { name: 'Player 1' },
      { name: 'Player 2' },
    ],
    tokens: [
      {
        id: 0,
        sector: FieldSector.STACK,
        fieldId: 0,
        player: 0,
        color: Color.Red,
        movable: true,
      },
      {
        id: 1,
        sector: FieldSector.STACK,
        fieldId: 1,
        player: 0,
        color: Color.Green,
        movable: true,
      },
      {
        id: 2,
        sector: FieldSector.BOARD,
        fieldId: 0,
        player: 0,
        color: Color.Blue,
        movable: true,
      },
      {
        id: 3,
        sector: FieldSector.BOARD,
        fieldId: 1,
        player: 0,
        color: Color.Yellow,
        movable: true,
      },
      {
        id: 4,
        sector: FieldSector.STACK,
        fieldId: 0,
        player: 1,
        color: Color.Red,
        movable: true,
      },
      {
        id: 5,
        sector: FieldSector.STACK,
        fieldId: 1,
        player: 1,
        color: Color.Green,
        movable: true,
      },
      {
        id: 6,
        sector: FieldSector.BOARD,
        fieldId: 6,
        player: 1,
        color: Color.Blue,
        movable: true,
      },
      {
        id: 7,
        sector: FieldSector.HOME,
        fieldId: 1,
        player: 1,
        color: Color.Yellow,
        movable: true,
      },
    ],
  }

  // TODO: convert enum colors to real colors

  const fieldSpace = 0.5 * FIELD_SIZE;
  const boardWidth = 3 * (FIELD_SIZE + fieldSpace);
  const boardHeight = boardWidth;
  const boardX = (WHOLE_BOARD_WIDTH / 2) - (boardWidth / 2);
  const boardY = 400;

  const stackData = [
    { posX: 260, color: 'red' }, // middle of the left half
    { posX: 740, color: 'green' },
  ];

  const fields: Fields = {
    stack: [
      // player 0
      [
        { x: 40 + (1 * 55), y: 150, color: 'white' },
        { x: 40 + (3 * 55), y: 150, color: 'white' },
        { x: 40 + (5 * 55), y: 150, color: 'white' },
        { x: 40 + (7 * 55), y: 150, color: 'white' },
      ],
      // player 1
      [
        { x: 520 + (1 * 55), y: 150, color: 'white' },
        { x: 520 + (3 * 55), y: 150, color: 'white' },
        { x: 520 + (5 * 55), y: 150, color: 'white' },
        { x: 520 + (7 * 55), y: 150, color: 'white' },
      ],
    ],
    home: [
      // player 0
      (new Array(4))
        .fill(null)
        .map(() => {
          return { x: boardX, y: boardY, color: 'red' };
        }),
      // player 1
      (new Array(4))
        .fill(null)
        .map(() => {
          return { x: boardX, y: boardY, color: 'green' };
        }),
    ],
    board: (new Array(12))
      .fill(null)
      .map(() => {
        return { x: boardX, y: boardY, color: 'white' };
      }),
  }

  // calculate home field positions
  for (let i = 0; i < 4; i++) {
    // player 0
    fields.home[0][i].x -= 1 * (fieldSpace + FIELD_SIZE);
    fields.home[0][i].y += (3 - i) * (fieldSpace + FIELD_SIZE);
    // player 1
    fields.home[1][i].x += 4 * (fieldSpace + FIELD_SIZE);
    fields.home[1][i].y += i * (fieldSpace + FIELD_SIZE);
  }

  // update start field colors
  fields.board[0].color = '#ff8080';
  fields.board[6].color = '#80ff80';

  // calculate board field positions
  for (let i = 1; i < 4; i++) {
    // top row
    fields.board[i].x += i * (fieldSpace + FIELD_SIZE);
    // right row
    fields.board[i + 3].x += 3 * (fieldSpace + FIELD_SIZE);
    fields.board[i + 3].y += i * (fieldSpace + FIELD_SIZE);
    // bottom row
    fields.board[i + 6].x += (3 - i) * (fieldSpace + FIELD_SIZE);
    fields.board[i + 6].y += 3 * (fieldSpace + FIELD_SIZE);
    // left row
    fields.board[(i + 9) % 12].y += (3 - i) * (fieldSpace + FIELD_SIZE);
  }

  const renderStacks = () => {
    return [0, 1]
      .map((playerId) => {
        return (
          <Stack key={playerId}
            x={stackData[playerId].posX}
            y={50}
            color={stackData[playerId].color}
            width={STACK_WIDTH}
            height={2 * FIELD_SIZE}
            title={props.players[playerId].name}
          />
        );
      });
  };

  const renderFields = (list: PositionAndColor[], idPrefix: string) => {
    return list.map((field, idx) => {
        return (
          <Field key={idx}
            id={`${idPrefix}-${idx}`}
            x={field.x}
            y={field.y}
            color={field.color}
            size={FIELD_SIZE} />
        );
      });
  };

  const renderAllFields = () => {
    return [
      renderFields(fields[FieldSector.STACK][0], 'stack-0'),
      renderFields(fields[FieldSector.STACK][1], 'stack-1'),
      renderFields(fields[FieldSector.HOME][0], 'home-0'),
      renderFields(fields[FieldSector.HOME][1], 'home-1'),
      renderFields(fields[FieldSector.BOARD], 'fields'),
    ];
  };

  const renderTokens = () => {
    return props.tokens
      .map((token) => {
        token.fieldId
        const field = (token.sector === FieldSector.BOARD)
          ? fields[token.sector][token.fieldId]
          : fields[token.sector][token.player][token.fieldId];
        return (
          <Token key={token.id}
            id={`token-${token.id}`}
            x={field.x}
            y={field.y}
            color={token.color}
            size={TOKEN_SIZE}
          />
        );
      });
  };

  return (
    <Svg height="100%" width="100%"
      viewBox={`0 0 ${WHOLE_BOARD_WIDTH} ${WHOLE_BOARD_HEIGHT}`}
    >
      <Rect
        x={WHOLE_BOARD_MARGIN / 2}
        y={WHOLE_BOARD_MARGIN / 2}
        width={WHOLE_BOARD_WIDTH - WHOLE_BOARD_MARGIN}
        height={WHOLE_BOARD_HEIGHT - WHOLE_BOARD_MARGIN}
        stroke="gray"
        strokeWidth={WHOLE_BOARD_MARGIN}
        fill="white"
      />
      {renderStacks()}
      {/* lines under board fields */}
      <Rect
        x={boardX}
        y={boardY}
        width={boardWidth}
        height={boardHeight}
        stroke="black"
        strokeWidth="2"
        fill="transparent"
      />
      <Line
        x1={fields.board[9].x}
        y1={fields.board[9].y}
        x2={fields.home[0][0].x}
        y2={fields.home[0][0].y}
        stroke="black"
        strokeWidth="2"
      />
      <Line
        x1={fields.board[3].x}
        y1={fields.board[3].y}
        x2={fields.home[1][0].x}
        y2={fields.home[1][0].y}
        stroke="black"
        strokeWidth="2"
      />
      {renderAllFields()}
      {renderTokens()}
    </Svg>
  );
};