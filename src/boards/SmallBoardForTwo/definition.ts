import { PlayingBoardDefinition } from "../../types";

export const definition: PlayingBoardDefinition = {
  maxPlayers: 2,
  tokensPerPlayer: 4,
  allFields: 12,
  startField: [
    0, // player 0
    6, // player 1
  ],
  fieldsToHome: 9,
};
