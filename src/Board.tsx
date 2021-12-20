import React from 'react'
import type { BoardProps } from 'boardgame.io/react'
import { Text, HStack, VStack, Button, View } from 'native-base'

import Token from './components/Token'
import { Color, State } from './types'
import { moveTokenError, rollDieError } from './Game'
import { PlayingBoard } from './boards/PlayingBoard'
import { BoardType } from './boards/types'

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

const Board: React.FC<BoardProps<State>> = ({ G, ctx, moves, events }) => {
    const { moveToken, rollDie } = moves

    const selectedBoard = BoardType.SMALL_BOARD_FOR_TWO
    const tokens = G.tokens.map((t) => ({
        ...t,
        disabled: !!moveTokenError(G, ctx, t.id),
    }))

    return (
        <VStack safeArea>
            <View style={{ width: 800, height: 800 }}>
                <PlayingBoard
                    boardType={selectedBoard}
                    players={players}
                    currentPlayer={ctx.currentPlayer}
                    die={G.die ?? 6}
                    onTokenPress={moveToken}
                    onDiePress={rollDie}
                    dieDisabled={!!rollDieError(G, ctx)}
                    tokens={tokens}
                />
            </View>
        </VStack>
    )
}

export default Board
