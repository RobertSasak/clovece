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
