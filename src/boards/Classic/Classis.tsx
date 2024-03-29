import React from 'react'
import { useWindowDimensions } from 'react-native'
import { Box, useToast, VStack } from 'native-base'
import Svg, { Rect, G } from 'react-native-svg'

import { FieldSector, GenericPlayingBoardProps, Point } from '../../types'
import { stepper } from '../../utils'
import Die from '../components/Die'
import Lap from './components/Lap'
import End from './components/End'
import { Token } from './components/Token'
import { getColor } from './colors'
import Start from './components/Start'
import Road from './components/Road'
import Badge from '../components/Badge'
import Select from './components/Select'
import PlayerBox from './components/PlayerrBox'

const START = 350
const WIDTH = 1000
const HEIGHT = 1000
const STEP = 90
const TOKEN_SIZE = 30
const SQUARE_ZERO = {
    x: -40,
    y: 500 - STEP,
}

const playerBox = stepper(
    { x: START / 2, y: START / 2 },
    '↘U↙D',
    WIDTH - START,
    false,
)

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
        { x: WIDTH - START / 2 - STEP / 2, y: HEIGHT - START / 2 - STEP / 2 },
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
]

const exits = [39, 19, 9, 29]

const end = [
    stepper(lap[39], 'RRRR', STEP),
    stepper(lap[19], 'LLLL', STEP),
    stepper(lap[9], 'DDDD', STEP),
    stepper(lap[29], 'UUUU', STEP),
]

const squares: Squares = {
    [FieldSector.LAP]: lap,
    [FieldSector.START]: start,
    [FieldSector.END]: end,
}

const Classic = ({
    die,
    dieError,
    players,
    currentPlayer,
    tokens,
    onDiePress = () => undefined,
    onTokenPress = () => undefined,
    onPlayerSelect = () => undefined,
}: GenericPlayingBoardProps) => {
    const { width, height } = useWindowDimensions()
    const maxSize = Math.min(width, height)
    const toast = useToast()
    return (
        <VStack alignItems="center">
            <Box w={maxSize - 10} h={maxSize - 10}>
                <Svg
                    height="100%"
                    width="100%"
                    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                    preserveAspectRatio="xMinYMin slice">
                    <Rect width="1000" height="1000" fill="#f5d9a1" />
                    <Rect
                        x="10"
                        y="10"
                        width="980"
                        height="980"
                        strokeWidth="3"
                        stroke="black"
                        fill="transparent"
                    />
                    <Rect
                        width="1000"
                        height="1000"
                        strokeWidth="10"
                        stroke="#bb3630"
                        fill="transparent"
                    />
                    {players.map(
                        (p, i) =>
                            p.id === currentPlayer && (
                                <G {...playerBox[i]} key={i}>
                                    <PlayerBox />
                                </G>
                            ),
                    )}
                    {players.map((p, i) => (
                        <G
                            {...playerBox[i]}
                            key={i}
                            onPress={() => onPlayerSelect(p.id)}
                            onClick={() => onPlayerSelect(p.id)}
                            style={{ cursor: 'pointer' }}>
                            <Select visible={p.selectable} />
                        </G>
                    ))}
                    {players.map((p, i) => (
                        <React.Fragment key={i}>
                            <Road
                                data={[
                                    squares.lap[exits[i]],
                                    squares.end[i][0],
                                ]}
                            />
                            <Start data={squares.start[i]} />
                            <End data={squares.end[i]} />
                            {p.place && (
                                <G {...playerBox[i]}>
                                    <Badge x={50} y={0} place={p.place} />
                                </G>
                            )}
                        </React.Fragment>
                    ))}
                    <Lap data={squares.lap} />
                    <Die
                        x={WIDTH / 2}
                        y={HEIGHT / 2}
                        value={die}
                        disabled={!!dieError}
                        onPress={() => {
                            if (dieError) {
                                toast.show({ title: dieError })
                            } else {
                                onDiePress()
                            }
                        }}
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
                                    disabled={!!error}
                                    onPress={() => {
                                        if (error) {
                                            toast.show({
                                                title: error,
                                            })
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
