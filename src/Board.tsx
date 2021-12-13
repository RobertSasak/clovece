import React from 'react'
import type { BoardProps } from 'boardgame.io/react'
import { Pressable, Text, HStack, VStack, Box, Button, View } from 'native-base'

import Token from './components/Token'
import { Color, FieldSector, State } from './types'
import { moveTokenError, rollDieError } from './Game'
import { PlayingBoard } from './boards/PlayingBoard'
import { BoardType } from './boards/types'

const Board: React.FC<BoardProps<State>> = ({ G, ctx, moves, events }) => {
    const { moveToken, rollDie } = moves
    const { endTurn } = events

    const playingBoardProps = {
        players: [
            { name: 'Player 1', color: Color.Red },
            { name: 'Player 2', color: Color.Green },
        ],
        tokens: [
            {
                id: 0,
                sector: FieldSector.STACK,
                fieldId: 0,
                playerId: 0,
                color: Color.Red,
            },
            {
                id: 1,
                sector: FieldSector.STACK,
                fieldId: 1,
                playerId: 0,
                color: Color.Green,
            },
            {
                id: 2,
                sector: FieldSector.BOARD,
                fieldId: 0,
                playerId: 0,
                color: Color.Blue,
            },
            {
                id: 3,
                sector: FieldSector.BOARD,
                fieldId: 1,
                playerId: 0,
                color: Color.Yellow,
            },
            {
                id: 4,
                sector: FieldSector.STACK,
                fieldId: 0,
                playerId: 1,
                color: Color.Red,
            },
            {
                id: 5,
                sector: FieldSector.STACK,
                fieldId: 1,
                playerId: 1,
                color: Color.Green,
            },
            {
                id: 6,
                sector: FieldSector.BOARD,
                fieldId: 6,
                playerId: 1,
                color: Color.Blue,
            },
            {
                id: 7,
                sector: FieldSector.HOME,
                fieldId: 1,
                playerId: 1,
                color: Color.Yellow,
            },
        ],
        onPress: (tokenId: number) => console.log('token pressed', tokenId)
    }

    return (
        <>
            <VStack safeArea>
                <VStack>
                    <Text>Players: {ctx.numPlayers}</Text>
                    {ctx.playOrder.map((p) => (
                        <Text key={p}>{p}</Text>
                    ))}
                    <Text>currentPlayer: {ctx.currentPlayer}</Text>
                    <Text>Die: {G.die ? G.die : 'null'}</Text>
                </VStack>
                <HStack>
                    {G.tokens.map(({ color, square }, id) => (
                        <Token
                            id={id}
                            key={id}
                            color={color}
                            square={square}
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
                <Button m="2" onPress={() => endTurn()}>
                    End turn
                </Button>
                <View style={{ width: 800, height: 800 }}>
                    <PlayingBoard
                        boardType={BoardType.SMALL_BOARD_FOR_TWO}
                        {...playingBoardProps}
                    />
                </View>
            </VStack>
        </>
    )
}

export default Board
