import { Ctx } from 'boardgame.io'

import { SEGMENT_SIZE } from '../constants'
import { Token, Color, FieldSector, Players } from '../types'

export default (ctx: Ctx) => {
    const tokens: Token[] = ctx.playOrder.reduce<Token[]>(
        (prev, p, i) => [
            ...prev,
            {
                id: i * 4,
                color: Color.Red,
                playerId: p,
                sector: FieldSector.START,
                fieldId: 0,
            },
            {
                id: i * 4 + 1,
                color: Color.Green,
                playerId: p,
                sector: FieldSector.START,
                fieldId: 1,
            },
            {
                id: i * 4 + 2,
                color: Color.Blue,
                playerId: p,
                sector: FieldSector.START,
                fieldId: 2,
            },
            {
                id: i * 4 + 3,
                color: Color.Yellow,
                playerId: p,
                sector: FieldSector.START,
                fieldId: 3,
            },
        ],
        [],
    )
    const size = 4 * SEGMENT_SIZE
    const players: Players = ctx.playOrder.reduce(
        (p, v) => ({
            ...p,
            [v]: {
                name: '',
                start: {
                    red: true,
                    green: true,
                    blue: true,
                    yellow: true,
                },
                end: {
                    red: false,
                    green: false,
                    blue: false,
                    yellow: false,
                },
                finish: [false, false, false, false],
                finished: 0,
            },
        }),
        {},
    )

    return {
        size,
        tokens,
        squares: new Array(size).fill(null),
        kicked: null,
        die: null,
        moves: 0,
        players,
    }
}
