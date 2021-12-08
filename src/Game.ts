import type { Game, Move, Ctx } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import { State, Token, Color, Homes } from './types'

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
    if (G.moves !== 6 && token.start) {
        return 'Throw 6 on dice in order to take token from staring zone.'
    }
    if (token.start === ctx.currentPlayer) {
        return `You can only select token from your own starting zone. Your staring zone is ${ctx.playerID}.`
    }
    if (token.start === null && G.homes[ctx.currentPlayer][token.color]) {
        return `You need to bring ${token.color} token from staring zone to game so that you can move with any ${token.color} tokens.`
    }
    return false
}

const moveToken: Move<State> = (G, ctx, id: number) => {
    if (moveTokenError(G, ctx, id)) {
        return INVALID_MOVE
    }
    const token = G.tokens[id]
    // Start with new token
    if (G.moves === 6 && token.start) {
        token.start = null
        const s = +ctx.currentPlayer * SEGMENT_SIZE
        const occupied = G.squares[s]
        G.squares[s] = id
        G.homes[ctx.currentPlayer][token.color] = false
        token.square = s
        if (occupied !== null) {
            G.kicked = occupied
        }
        // } else if () { // TODO: Move token to finish
    } else {
        // Move token around the board
        if (token.square === null) {
            return new Error('This token should be on board')
        }
        token.square = (token.square + G.moves) % G.size
        ctx.events?.endTurn()
    }
    G.moves = 0
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
        ctx.events?.endTurn()
    }
}

export const selectPlayerError = (
    G: State,
    _ctx: Ctx,
    playerId: string,
): false | string => {
    if (!playerId) {
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
    G.tokens[G.kicked].start = playerId
    G.kicked = null
    ctx.events?.endTurn()
}

const game: Game<State> = {
    name: 'Clovece',
    seed: 0,
    minPlayers: 2,
    maxPlayers: 4,
    setup: (ctx) => {
        const tokens: Token[] = ctx.playOrder.reduce<Token[]>(
            (prev, p) => [
                ...prev,
                {
                    color: Color.Red,
                    square: null,
                    start: p,
                    end: null,
                    endSquare: null,
                },
                {
                    color: Color.Green,
                    square: null,
                    start: p,
                    end: null,
                    endSquare: null,
                },
                {
                    color: Color.Blue,
                    square: null,
                    start: p,
                    end: null,
                    endSquare: null,
                },
                {
                    color: Color.Yellow,
                    square: null,
                    start: p,
                    end: null,
                    endSquare: null,
                },
            ],
            [],
        )
        const size = ctx.numPlayers * SEGMENT_SIZE
        let homes: Homes = {}
        ctx.playOrder.map((p) => {
            homes[p] = {
                red: true,
                green: true,
                blue: true,
                yellow: true,
            }
        })
        return {
            size,
            tokens,
            squares: new Array(size).fill(null),
            kicked: null,
            homes,
            die: null,
            moves: 0,
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
    ai: {
        enumerate,
    },
}

export default game
