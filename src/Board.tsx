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
        name: 'Player 1',
        color: Color.Red,
    },
    {
        name: 'Player 2',
        color: Color.Green,
    },
]

const Board: React.FC<BoardProps<State>> = ({ G, ctx, moves, events }) => {
    const { moveToken, rollDie } = moves

    const selectedBoard = BoardType.SMALL_BOARD_FOR_TWO

    return (
        <>
            <VStack safeArea>
                <VStack>
                    <Text>Players: {ctx.numPlayers}</Text>
                    <Text>currentPlayer: {ctx.currentPlayer}</Text>
                    <Text>Die: {G.die ? G.die : 'null'}</Text>
                </VStack>
                <HStack>
                    {G.tokens.map(({ color, fieldId }, id) => (
                        <Token
                            id={id}
                            key={id}
                            color={color}
                            fieldId={fieldId}
                            disabled={!!moveTokenError(G, ctx, id)}
                            onPress={() => moveToken(id)}
                        />
                    ))}
                </HStack>
                <Button
                    m="2"
                    _disabled={{ bg: 'gray.600' }}
                    isDisabled={!!rollDieError(G, ctx)}
                    onPress={() => rollDie()}>
                    Roll die
                </Button>
                <View style={{ width: 800, height: 800 }}>
                    <PlayingBoard
                        boardType={selectedBoard}
                        players={players}
                        onPress={moveToken}
                        tokens={G.tokens}
                    />
                </View>
            </VStack>
        </>
    )
}

export default Board
