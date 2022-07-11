import { Ctx, Move } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import { SEGMENT_SIZE } from '../constants'
import { FieldSector, State } from '../types'

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
        return `You can only select token from your own starting zone.`
    }
    if (
        token.sector === FieldSector.END &&
        token.playerId !== ctx.currentPlayer
    ) {
        return `You can only move tokens in own endzone.`
    }
    if (G.moves === 0) {
        return 'Throw the die first to determine how many steps you can move.'
    }
    if (
        token.sector !== FieldSector.START &&
        G.players[ctx.currentPlayer].start[token.color]
    ) {
        return `You need to bring ${token.color} token from staring zone to game so that you can move with any ${token.color} tokens.`
    }
    if (
        token.sector === FieldSector.LAP &&
        G.players[ctx.currentPlayer].end[token.color]
    ) {
        return `You cannot move this token. Token of this color is already in your endzone.`
    }
    if (token.sector === FieldSector.END && token.fieldId + G.moves > 3) {
        return `You cannot move this token. There is not enough squares to move.`
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
        const s = [0, 2 * SEGMENT_SIZE, 1 * SEGMENT_SIZE, 4 * SEGMENT_SIZE][
            ctx.playOrderPos
        ]
        const occupied = G.squares[s]
        G.moves = 0
        G.squares[s] = id
        G.players[ctx.currentPlayer].start[token.color] = false
        token.fieldId = s
        if (occupied !== null) {
            G.kicked = occupied
        }
    } else if (token.sector === FieldSector.END) {
        G.players[ctx.currentPlayer].finish[token.fieldId] = false
        token.fieldId = token.fieldId + G.moves
        G.players[ctx.currentPlayer].finish[token.fieldId] = true
    } else {
        const exitSquare =
            (ctx.playOrderPos * SEGMENT_SIZE - 1 + G.size) % G.size
        G.squares[token.fieldId] = null
        let newFieldId = token.fieldId
        while (G.moves > 0) {
            G.moves--
            newFieldId = (newFieldId + 1) % G.size
            if (newFieldId == exitSquare) {
                break
            }
        }
        if (newFieldId == exitSquare && G.moves > 0) {
            token.sector = FieldSector.END
            token.fieldId = G.moves - 1
            token.playerId = ctx.currentPlayer
            G.players[ctx.currentPlayer].finish[token.fieldId] = true
            G.players[ctx.currentPlayer].end[token.color] = true
            G.players[ctx.currentPlayer].finished++
        } else {
            token.fieldId = newFieldId
        }
    }
    if (G.die !== 6) {
        ctx.events?.endTurn()
    }
}
