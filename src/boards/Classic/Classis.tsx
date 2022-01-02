import { Box, useToast, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import Svg, { Rect } from 'react-native-svg'

import { FieldSector, GenericPlayingBoardProps, Point } from '../../types'
import { stepper } from '../../utils'
import Die from '../components/Die'
import Lap from './components/Lap'
import End from './components/End'
import { Token } from './components/Token'
import { getColor } from './colors'
import Start from './components/Start'
import Road from './components/Road'

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

const playerBox = stepper({ x: 0, y: 0 }, 'RDL', WIDTH - START, false)

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
        { x: WIDTH - START / 2 - STEP / 2, y: START / 2 - STEP / 2 },
        'RDLU',
        STEP,
        false,
    ),
    stepper(
        { x: START / 2 - STEP / 2, y: HEIGHT - START / 2 - STEP / 2 },
        'RDLU',
        STEP,
        false,
    ),
    stepper(
        { x: WIDTH - START / 2 - STEP / 2, y: HEIGHT - START / 2 - STEP / 2 },
        'RDLU',
        STEP,
        false,
    ),
]

const starts = [0, 10, 20, 40]
const exits = [39, 9, 19, 29]

const end = [
    stepper(lap[39], 'RRRR', STEP),
    stepper(lap[9], 'DDDD', STEP),
    stepper(lap[19], 'LLLL', STEP),
    stepper(lap[29], 'UUUU', STEP),
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
    players,
    currentPlayer,
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
                    {players.map((p, i) => (
                        <React.Fragment key={i}>
                            <Rect
                                width={START}
                                height={START}
                                {...playerBox[i]}
                                fill={
                                    p.id === currentPlayer
                                        ? 'yellow'
                                        : 'trasparent'
                                }
                            />
                            <Road
                                data={[
                                    squares.lap[exits[i]],
                                    squares.end[i][0],
                                ]}
                            />
                            <Road
                                data={[
                                    squares.start[i][0],
                                    squares.lap[starts[i]],
                                ]}
                            />
                            <Start data={squares.start[i]} />
                            <End data={squares.end[i]} />
                        </React.Fragment>
                    ))}
                    <Lap data={squares.lap} />
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
