import type { PlayerID } from 'boardgame.io'

export enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
    Yellow = 'yellow',
}

export interface Token {
    color: Color
    square: number | null
    start: PlayerID | null
    end: PlayerID | null
    endSquare: number | null
}

export type Homes = {
    [key: PlayerID]: {
        [key in Color]: boolean
    }
}

export interface State {
    size: number
    tokens: Token[]
    squares: (number | null)[]
    die: number | null
    moves: number
    kicked: number | null
    homes: Homes
}

export enum FieldSector {
    STACK = 'stack',
    BOARD = 'board',
    HOME = 'home',
}

export interface PlayingBoardDefinition {
    maxPlayers: number;
    tokensPerPlayer: number;
    allFields: number;
    /** Start field id for each player. */
    startField: number[];
    /**
     * How many fields the player needs to go to reach home.
     * If first field is 0, the last field is this number.
     */
    fieldsToHome: number;
}

export interface GenericPlayingBoardProps {
    players: {
        name: string;
        color: Color;
    }[];
    tokens: {
        id: number;
        sector: FieldSector;
        fieldId: number;
        playerId: number;
        color: Color;
    }[];
    onPress: (tokenId: number) => void;
}
