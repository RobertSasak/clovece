import React from 'react';
import Svg, { Circle, Rect, SvgProps } from 'react-native-svg';
import { Field, Token } from '.';

export interface BoardProps {
}

const WHOLE_BOARD_WIDTH = 1000;
const WHOLE_BOARD_HEIGHT = 1000;

const FIELD_SIZE = 80;
const TOKEN_SIZE = 40;

export const Board: React.FC<BoardProps> = (props) => {

  // TODO: convert enum colors to real colors

  const fieldSpace = 0.5 * FIELD_SIZE;
  const boardWidth = 3 * (FIELD_SIZE + fieldSpace);
  const boardHeight = boardWidth;
  const boardX = 200;
  const boardY = 200;

  const renderFields = () => {
    return [
      <Field key={0} x={boardX} y={boardY} color={'white'} size={FIELD_SIZE} />
    ];
  };

  const renderTokens = () => {
    return [
      <Token key={0} x={boardX} y={boardY} color={'blue'} size={TOKEN_SIZE} />
    ];
  };

  return (
    <Svg height="100%" width="100%"
      viewBox={`0 0 ${WHOLE_BOARD_WIDTH} ${WHOLE_BOARD_HEIGHT}`}
    >
      <Rect
        x="0"
        y="0"
        width={WHOLE_BOARD_WIDTH}
        height={WHOLE_BOARD_HEIGHT}
        stroke="gray"
        strokeWidth="50"
        fill="white"
      />
      <Rect
        x={boardX}
        y={boardY}
        width={boardWidth}
        height={boardHeight}
        stroke="black"
        strokeWidth="2"
        fill="transparent"
      />
      {renderFields()}
      {renderTokens()}
    </Svg>
  );
};