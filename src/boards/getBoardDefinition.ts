import { PlayingBoardDefinition } from "../types";
import { BoardType } from "./types";
import { definition as SmallBoardForTwo } from "./SmallBoardForTwo";

export function getBoardDefinition(board: BoardType): PlayingBoardDefinition {
  switch(board) {
    case BoardType.SMALL_BOARD_FOR_TWO:
      return SmallBoardForTwo;

    default:
      throw new Error('No such board!');
  }
}
