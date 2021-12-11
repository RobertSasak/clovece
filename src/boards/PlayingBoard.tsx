import React from 'react';
import { Board, BoardProps } from './SmallBoardForTwo';
import { BoardType } from './types';

interface PlayingBoardOwnProps {
  boardType: BoardType;
}

type PlayingBoardProps = PlayingBoardOwnProps
  & BoardProps;

/**
 * Playing board unification and selection layer
 */
export const PlayingBoard: React.FC<PlayingBoardProps> = (props) => {
  const { boardType, ...otherProps} = props;

  switch (boardType) {
    case BoardType.SMALL_BOARD_FOR_TWO:
      return <Board {...otherProps} />;

    default:
      console.warn('No such board!');
      return null;
  }
};
