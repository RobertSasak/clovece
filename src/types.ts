import type { PlayerID } from 'boardgame.io'

export enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
    Yellow = 'yellow',
}

type PizzaSize = keyof typeof Color

export interface Token {
    color: Color
    square: number | null
    start: PlayerID | null
    end: PlayerID | null
    endSquare: number | null
}

export interface State {
    size: number
    tokens: Token[]
    squares: (number | null)[]
    die: number | null
    kicked: number | null
    homes: {
        [key: PlayerID]: {
            [key in Color]: boolean
        }
    }
}
