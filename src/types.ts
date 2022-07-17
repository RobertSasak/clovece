import type { PlayerID } from 'boardgame.io'

export enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
    Yellow = 'yellow',
}

export interface Token {
    id: number
    color: Color
    playerId: string
    sector: FieldSector
    fieldId: number
}

export interface TokenUI extends Token {
    error: string | false
}

export type Players = {
    [key: PlayerID]: {
        name: string
        start: {
            [color in Color]: boolean
        }
        end: {
            [color in Color]: boolean
        }
        finish: [boolean, boolean, boolean, boolean]
        finished: number
        place: null | number
    }
}

export interface State {
    size: number
    tokens: Token[]
    squares: (number | null)[]
    die: number | null
    moves: number
    kicked: number | null
    players: Players
    finished: number
}

export enum FieldSector {
    START = 'start',
    LAP = 'lap',
    END = 'end',
}

export interface PlayingBoardDefinition {
    maxPlayers: number
    tokensPerPlayer: number
    allFields: number
    /** Start field id for each player. */
    startField: number[]
    /**
     * How many fields the player needs to go to reach home.
     * If first field is 0, the last field is this number.
     */
    fieldsToHome: number
}

export interface GenericPlayingBoardProps {
    players: {
        id: string
        name: string
        place: null | number
    }[]
    currentPlayer: string
    die: number
    dieError: string | false
    tokens: TokenUI[]
    onTokenPress: (tokenId: number) => void
    onDiePress: () => void
}

export interface Point {
    x: number
    y: number
}
