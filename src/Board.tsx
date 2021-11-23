import React from 'react'
import { Text } from 'react-native'
import type { BoardProps } from 'boardgame.io/react'
import { State } from './types'

const Board: React.FC<BoardProps<State>> = ({ G, ctx, moves }) => {
    return (
        <>
            <Text>Players: {ctx.numPlayers}</Text>
        </>
    )
}

export default Board
