import { Box, useToast, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg'

import { FieldSector, GenericPlayingBoardProps, Point } from '../../types'
import { stepper } from '../../utils'
import Die from '../components/Die'
import Square from './components/Square'
import Lap from './components/Lap'
import Ends from './components/Ends'
import { Token } from './components/Token'
import { getColor } from './colors'
import Starts from './components/Starts'

const WIDTH = 1000
const HEIGHT = 1000
const START = 350
const STEP = 90
const DIE_SIZE = 50
const TOKEN_SIZE = 30
const SQUARE_ZERO = {
    x: -40,
    y: 500 - STEP,
}

interface Squares {
    [FieldSector.START]: Point[][]
    [FieldSector.LAP]: Point[]
    [FieldSector.END]: Point[][]
}

const lap = stepper(
    SQUARE_ZERO,
    'RRRRRUUUURRDDDDRRRRDDLLLLDDDDLLUUUULLLLU',
    STEP,
)

const start = [
    stepper(
        { x: START / 2 - STEP / 2, y: START / 2 - STEP / 2 },
        'RDLU',
        STEP,
        false,
    ),
    stepper(
        { x: 1000 - START / 2 - STEP / 2, y: START / 2 - STEP / 2 },
        'RDLU',
        STEP,
        false,
    ),
    stepper(
        { x: START / 2 - STEP / 2, y: 1000 - START / 2 - STEP / 2 },
        'RDLU',
        STEP,
        false,
    ),
    stepper(
        { x: 1000 - START / 2 - STEP / 2, y: 1000 - START / 2 - STEP / 2 },
        'RDLU',
        STEP,
        false,
    ),
]

const end = [
    stepper(lap[9], 'DDDD', STEP),
    stepper(lap[19], 'LLLL', STEP),
    stepper(lap[29], 'UUUU', STEP),
    stepper(lap[39], 'RRRR', STEP),
]

const squares: Squares = {
    [FieldSector.LAP]: lap,
    [FieldSector.START]: start,
    [FieldSector.END]: end,
}

const Classic = ({
    die,
    dieDisabled,
    onDiePress,
    tokens,
    onTokenPress,
}: GenericPlayingBoardProps) => {
    const { width, height } = useWindowDimensions()
    const maxSize = Math.min(width, height)
    const toast = useToast()
    return (
        <VStack safeArea alignItems="center">
            <Box w={maxSize} h={maxSize}>
                <Svg
                    height="100%"
                    width="100%"
                    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                    fill="white"
                    preserveAspectRatio="xMinYMin slice">
                    <Rect width={START} height={START} fill="yellow" />
                    <Rect
                        width={START}
                        height={START}
                        x={WIDTH - START}
                        fill="yellow"
                    />
                    <Rect
                        width={START}
                        height={START}
                        y={HEIGHT - START}
                        fill="yellow"
                    />
                    <Rect
                        width={START}
                        height={START}
                        x={WIDTH - START}
                        y={HEIGHT - START}
                        fill="yellow"
                    />
                    <Rect
                        width={WIDTH}
                        height={HEIGHT}
                        stroke="gray"
                        fill="transparent"
                        strokeWidth={1}
                    />
                    <Starts data={squares.start} />
                    <Lap data={squares.lap} />
                    <Ends data={squares.end} />
                    <Die
                        x={WIDTH / 2 - DIE_SIZE}
                        y={HEIGHT / 2 - DIE_SIZE}
                        size={DIE_SIZE}
                        value={die}
                        disabled={dieDisabled}
                        onPress={onDiePress}
                    />
                    {tokens.map(
                        ({ id, sector, fieldId, playerId, color, error }) => {
                            const field =
                                sector === FieldSector.LAP
                                    ? squares[sector][fieldId]
                                    : squares[sector][+playerId][fieldId]
                            return (
                                <Token
                                    key={id}
                                    x={field.x}
                                    y={field.y}
                                    color={getColor(color)}
                                    size={TOKEN_SIZE}
                                    error={error}
                                    onPress={() => {
                                        if (error) {
                                            toast.show({
                                                title: error,
                                            })
                                            console.log(error)
                                        } else {
                                            onTokenPress(id)
                                        }
                                    }}
                                />
                            )
                        },
                    )}
                </Svg>
            </Box>
        </VStack>
    )
}

export default Classic
