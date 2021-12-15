import React, { useState } from 'react'
import type { BoardProps } from 'boardgame.io/react'
import { Pressable, Text, HStack, VStack, Box, Button, View } from 'native-base'

import Token from './components/Token'
import { Color, FieldSector, State } from './types'
import { moveTokenError, rollDieError } from './Game'
import { PlayingBoard } from './boards/PlayingBoard'
import { BoardType } from './boards/types'
import { getBoardDefinition } from './boards/getBoardDefinition'

const Board: React.FC<BoardProps<State>> = ({ G, ctx, moves, events }) => {
    const { moveToken, rollDie } = moves
    const { endTurn } = events

    const selectedBoard = BoardType.SMALL_BOARD_FOR_TWO
    const def = getBoardDefinition(selectedBoard)

    // TMP: this will be in G
    const [tokens, setTokens] = useState(
        // generate based on `def`
        [0, 1].flatMap((playerId) => {
            return [...Array(def.tokensPerPlayer).keys()].map((tokenId) => {
                return {
                    id: playerId * def.tokensPerPlayer + tokenId,
                    sector: FieldSector.STACK,
                    fieldId: tokenId,
                    playerId: playerId,
                    // NOTE: color could be a numeric enum
                    color: Object.values(Color)[tokenId],
                }
            })
        }),
    )

    // TMP: for demonstration purposes only
    const moveByOne = (tokenId: number) => {
        const token = { ...tokens[tokenId] } // copy token

        switch (token.sector) {
            case FieldSector.STACK:
                token.sector = FieldSector.BOARD
                token.fieldId = def.startField[token.playerId]
                break

            case FieldSector.BOARD: {
                // TODO: you can select the current player or the token's owner
                const lastFieldBeforeHome =
                    (def.startField[token.playerId] + def.fieldsToHome) %
                    def.allFields

                // TODO: this works only because we jump by 1
                if (token.fieldId === lastFieldBeforeHome) {
                    token.sector = FieldSector.HOME
                    token.fieldId = 0
                } else {
                    token.fieldId = (token.fieldId + 1) % def.allFields
                }
                break
            }

            case FieldSector.HOME:
                token.fieldId = Math.min(
                    token.fieldId + 1,
                    def.tokensPerPlayer - 1,
                )
                break
        }

        setTokens(
            tokens.map((oldToken, idx) => (idx === tokenId ? token : oldToken)),
        )
    }

    const playingBoardProps = {
        players: [
            { name: 'Player 1', color: Color.Red },
            { name: 'Player 2', color: Color.Green },
        ],
        tokens,
        onPress: moveByOne,
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
                    onPress={() => rollDie()}
                >
                    Roll die
                </Button>
                <Button m="2" onPress={() => endTurn()}>
                    End turn
                </Button>
                <View style={{ width: 800, height: 800 }}>
                    <PlayingBoard
                        boardType={selectedBoard}
                        {...playingBoardProps}
                    />
                </View>
            </VStack>
        </>
    )
}

export default Board
