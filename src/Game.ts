import type { Game, Move } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import { State, Token, Color } from './types'

const SEGMENT_SIZE = 10

const tapTokenError: Move<State> = (G, ctx, id: number) => {
    if (ctx.playerID === undefined) {
        throw new Error('PlayerId is undefined')
    }
    const token = G.tokens[id]
    if (G.kicked !== null) {
        return 'Select which player gets kicked out token before continue.'
    }
    if (!token) {
        return new Error('id is undefined')
    }
    if (G.die !== 6 && token.start) {
        return 'Throw 6 on dice in order to take token from staring zone.'
    }
    if (token.start === ctx.playerID) {
        return `You can only select token from your own starting zone. Your staring zone is ${ctx.playerID}.`
    }
    if (token.start === null && G.homes[ctx.playerID][token.color]) {
        return `You need to bring ${token.color} token from staring zone to game so that you can move with any ${token.color} tokens.`
    }
    return false
}

const tapToken: Move<State> = (G, ctx, id: number) => {
    if (ctx.playerID === undefined) {
        throw new Error('PlayerId is undefined')
    }
    if (tapTokenError(G, ctx, id)) {
        return INVALID_MOVE
    }
    const token = G.tokens[id]
    // Start with new token
    if (G.die === 6 && token.start) {
        token.start = null
        const s = +ctx?.playerID * SEGMENT_SIZE
        const occupied = G.squares[s]
        G.squares[s] = id
        if (occupied !== null) {
            G.kicked = occupied
        }
    }
    // TODO: Move token to finish
    // TODO: Move token around
    G.die = null
}

const rollDieError: Move<State> = (G, ctx) => {
    if (!ctx.random) {
        throw new Error('Random is undefined')
    }
    if (G.die !== null) {
        return `Finish your move before before rolling die.`
    }
    if (G.kicked !== null) {
        return 'Select which player gets kicked out token before rolling die again.'
    }
    return true
}

const rollDie: Move<State> = (G, ctx) => {
    if (rollDieError(G, ctx)) {
        return INVALID_MOVE
    }
    if (!ctx.random) {
        throw new Error('Random is undefined')
    }
    G.die = ctx.random.D6()
}

const selectPlayerError: Move<State> = (G, ctx, playerId) => {
    if (!playerId) {
        throw new Error('PlayerId is undefined')
    }
    if (G.kicked === null) {
        return 'Nothing to select. Token need to be kicked out first.'
    }
    return true
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
        return {
            size,
            tokens,
            squares: new Array(size).fill(null),
            kicked: null,
            homes: {},
            die: null,
        }
    },
    moves: {
        rollDie,
        tapToken,
        selectPlayer,
    },
}

export default game
