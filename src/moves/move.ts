import { Ctx, Move } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import { SEGMENT_SIZE } from '../constants'
import { FieldSector, State } from '../types'

const START_SQUARES = [0, 2 * SEGMENT_SIZE, 1 * SEGMENT_SIZE, 3 * SEGMENT_SIZE]
const EXIT_SQUARES = [
    4 * SEGMENT_SIZE - 1,
    2 * SEGMENT_SIZE - 1,
    1 * SEGMENT_SIZE - 1,
    3 * SEGMENT_SIZE - 1,
]

export const moveError = (G: State, ctx: Ctx, id: number): false | string => {
    const token = G.tokens[id]
    if (G.kicked !== null) {
        return 'Select which player gets kicked out token before continue.'
    }
    if (!token) {
        throw new Error('id is undefined')
    }
    if (G.moves !== 6 && token.sector === FieldSector.START) {
        return 'Throw 6 on dice in order to take token from staring zone.'
    }
    if (
        token.sector === FieldSector.START &&
        token.playerId !== ctx.currentPlayer
    ) {
        return 'You can only select token from your own starting zone.'
    }
    if (
        token.sector === FieldSector.END &&
        token.playerId !== ctx.currentPlayer
    ) {
        return 'You can only move tokens in own endzone.'
    }
    if (G.moves === 0) {
        return 'Throw the die first to determine how many steps you can move.'
    }
    if (
        token.sector !== FieldSector.START &&
        G.players[ctx.currentPlayer].start[token.color]
    ) {
        return 'You need to bring ${token.color} token from staring zone to game so that you can move with any ${token.color} tokens.'
    }
    if (
        token.sector === FieldSector.LAP &&
        G.players[ctx.currentPlayer].end[token.color]
    ) {
        return 'You cannot move this token. Token of this color is already in your endzone.'
    }
    if (token.sector === FieldSector.END && token.fieldId + G.moves > 3) {
        return 'You cannot move this token. There is not enough squares to move.'
    }
    if (
        token.sector === FieldSector.END &&
        G.players[ctx.currentPlayer].finish[token.fieldId + G.moves]
    ) {
        return 'You cannot move this token. You would land on your own token in the finish.'
    }

    if (token.sector === FieldSector.LAP) {
        let moves = G.moves
        let fieldId = token.fieldId
        const exitSquare = EXIT_SQUARES[+ctx.currentPlayer]
        while (moves > 0) {
            fieldId++
            moves--
            if (fieldId === exitSquare) {
                break
            }
        }
        if (moves > 0) {
            if (moves > 4) {
                return 'You cannot move this token. You would land behind finish.'
            }
            if (G.players[ctx.currentPlayer].finish[moves - 1]) {
                return 'You cannot move this token. You would land on your own token in the finish.'
            }
        }
    }
    return false
}

export const move: Move<State> = (G, ctx, id: number) => {
    if (moveError(G, ctx, id)) {
        return INVALID_MOVE
    }
    const token = G.tokens[id]
    if (token.sector === FieldSector.START) {
        token.sector = FieldSector.LAP
        const s = START_SQUARES[ctx.playOrderPos]
        if (G.squares[s] !== null) {
            G.kicked = G.squares[s]
        }
        G.moves = 0
        G.squares[s] = id
        G.players[ctx.currentPlayer].start[token.color] = false
        token.fieldId = s
    } else if (token.sector === FieldSector.END) {
        G.players[ctx.currentPlayer].finish[token.fieldId] = false
        token.fieldId += G.moves
        G.players[ctx.currentPlayer].finish[token.fieldId] = true
    } else {
        const exitSquare = EXIT_SQUARES[+ctx.currentPlayer]
        G.squares[token.fieldId] = null
        let newFieldId = token.fieldId
        while (G.moves > 0) {
            G.moves--
            newFieldId = (newFieldId + 1) % G.size
            if (newFieldId === exitSquare) {
                break
            }
        }
        if (G.moves > 0) {
            token.sector = FieldSector.END
            token.fieldId = G.moves - 1
            token.playerId = ctx.currentPlayer
            G.players[ctx.currentPlayer].finish[token.fieldId] = true
            G.players[ctx.currentPlayer].end[token.color] = true
            G.players[ctx.currentPlayer].finished++
        } else {
            token.fieldId = newFieldId
            if (G.squares[newFieldId] !== null) {
                G.kicked = G.squares[newFieldId]
            }
            G.squares[newFieldId] = token.id
        }
    }
    G.moves = 0
    if (G.die !== 6) {
        ctx.events?.endTurn()
    }
}
