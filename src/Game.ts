import type { Game, Move, Ctx } from 'boardgame.io'
import { GameMethod, INVALID_MOVE } from 'boardgame.io/core'

import { State, Token, Color, FieldSector, Players } from './types'

const SEGMENT_SIZE = 10

export const moveTokenError = (
    G: State,
    ctx: Ctx,
    id: number,
): false | string => {
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
    return false
}

const moveToken: Move<State> = (G, ctx, id: number) => {
    if (moveTokenError(G, ctx, id)) {
        return INVALID_MOVE
    }
    const token = G.tokens[id]
    if (token.sector === FieldSector.START) {
        token.sector = FieldSector.LAP
        const s = ctx.playOrderPos * SEGMENT_SIZE
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
            G.players[ctx.currentPlayer].finished++
        } else {
            token.fieldId = newFieldId
        }
    }
    if (G.die !== 6) {
        ctx.events?.endTurn()
    }
}

export const rollDieError = (G: State, _ctx: Ctx): false | string => {
    if (G.moves !== 0) {
        return `Finish your move before before rolling die.`
    }
    if (G.kicked !== null) {
        return 'Select which player gets kicked out token before rolling die again.'
    }
    return false
}

const rollDie: Move<State> = (G, ctx) => {
    if (rollDieError(G, ctx)) {
        return INVALID_MOVE
    }
    if (!ctx.random) {
        throw new Error('Random is undefined')
    }
    G.die = ctx.random.D6()
    G.moves = G.die
    if (enumerate(G, ctx).length == 0) {
        G.moves = 0
        ctx.events?.endTurn()
    }
}

export const selectPlayerError = (
    G: State,
    _ctx: Ctx,
    playerId: string,
): false | string => {
    if (playerId === undefined) {
        throw new Error('PlayerId is undefined')
    }
    if (G.kicked === null) {
        return 'Nothing to select. Token need to be kicked out first.'
    }
    return false
}

const enumerate = (G: State, ctx: Ctx) => {
    let moves = []
    if (!rollDieError(G, ctx)) {
        moves.push({ move: 'rollDie' })
    }
    for (let i = 0; i < G.tokens.length; i++) {
        if (!moveTokenError(G, ctx, i)) {
            moves.push({ move: 'moveToken', args: [i] })
        }
    }
    ctx.playOrder.forEach((p) => {
        if (!selectPlayerError(G, ctx, p)) {
            moves.push({ move: 'selectPlayer', args: [p] })
        }
    })
    return moves
}

const selectPlayer: Move<State> = (G, ctx, playerId) => {
    if (selectPlayerError(G, ctx, playerId)) {
        return INVALID_MOVE
    }
    if (G.kicked === null) {
        return INVALID_MOVE
    }
    G.tokens[G.kicked].sector = FieldSector.START
    G.tokens[G.kicked].playerId = playerId
    G.kicked = null
    ctx.events?.endTurn()
}

const endIf = (G: State, ctx: Ctx) => {
    for (let i = 0; i < ctx.playOrder.length; i++) {
        if (G.players[ctx.playOrder[i]].finished === 4) {
            return { winner: ctx.playOrder[i] }
        }
    }
}

const game: Game<State> = {
    name: 'Clovece',
    seed: 0,
    minPlayers: 2,
    maxPlayers: 4,
    setup: (ctx) => {
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
                        red: true,
                        green: true,
                        blue: true,
                        yellow: true,
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
    },
    moves: {
        rollDie,
        moveToken,
        selectPlayer,
    },
    turn: {
        onEnd: (G) => {
            G.moves = 0
        },
    },
    endIf,
    ai: {
        enumerate,
    },
}

export default game
