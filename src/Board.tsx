import React from 'react'
import type { BoardProps } from 'boardgame.io/react'

import { Color, State } from './types'
import { PlayingBoard } from './boards/PlayingBoard'
import { BoardType } from './boards/types'
import { rollError } from './moves/roll'
import { moveError } from './moves/move'

const players = [
    {
        id: '0',
        name: 'Player 1',
        color: Color.Red,
    },
    {
        id: '1',
        name: 'Player 2',
        color: Color.Green,
    },
]

const Board: React.FC<BoardProps<State>> = ({ G, ctx, moves }) => {
    const { move, roll } = moves

    const selectedBoard = BoardType.CLASSIC
    const tokens = G.tokens.map((t) => ({
        ...t,
        error: moveError(G, ctx, t.id),
    }))

    return (
        <PlayingBoard
            boardType={selectedBoard}
            players={players}
            currentPlayer={ctx.currentPlayer}
            die={G.die ?? 6}
            onTokenPress={move}
            onDiePress={roll}
            dieError={rollError(G, ctx)}
            tokens={tokens}
        />
    )
}

export default Board
