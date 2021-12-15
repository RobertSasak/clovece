import React from 'react'
import Svg, { Line, Rect } from 'react-native-svg'
import { Field, definition, Token } from '.'
import { FieldSector, GenericPlayingBoardProps } from '../../types'
import { getColor } from './colors'
import { Stack } from './Stack'

const WHOLE_BOARD_WIDTH = 1000
const WHOLE_BOARD_HEIGHT = 1000
const WHOLE_BOARD_MARGIN = 20

const STACK_WIDTH = (WHOLE_BOARD_WIDTH - 2 * WHOLE_BOARD_MARGIN) / 2 - 40
const FIELD_SIZE = 80
const TOKEN_SIZE = 40

interface PositionAndColor {
    x: number
    y: number
    color: string
}

interface Fields {
    [FieldSector.START]: PositionAndColor[][]
    [FieldSector.BOARD]: PositionAndColor[]
    [FieldSector.END]: PositionAndColor[][]
}

export const Board: React.FC<GenericPlayingBoardProps> = (props) => {
    const fieldSpace = 0.5 * FIELD_SIZE
    const boardWidth = 3 * (FIELD_SIZE + fieldSpace)
    const boardHeight = boardWidth
    const boardX = WHOLE_BOARD_WIDTH / 2 - boardWidth / 2
    const boardY = 400

    // helper array with all player ids
    const FOR_ALL_PLAYERS = [...Array(definition.maxPlayers).keys()]
    const [P0, P1] = FOR_ALL_PLAYERS

    const stackData = [
        { posX: 260, color: getColor(props.players[P0].color) },
        { posX: 740, color: getColor(props.players[P1].color) },
    ]

    const fields: Fields = {
        start: [
            // player 0
            [
                { x: 40 + 1 * 55, y: 150, color: 'white' },
                { x: 40 + 3 * 55, y: 150, color: 'white' },
                { x: 40 + 5 * 55, y: 150, color: 'white' },
                { x: 40 + 7 * 55, y: 150, color: 'white' },
            ],
            // player 1
            [
                { x: 520 + 1 * 55, y: 150, color: 'white' },
                { x: 520 + 3 * 55, y: 150, color: 'white' },
                { x: 520 + 5 * 55, y: 150, color: 'white' },
                { x: 520 + 7 * 55, y: 150, color: 'white' },
            ],
        ],
        end: FOR_ALL_PLAYERS.map((playerId) => {
            return new Array(definition.tokensPerPlayer).fill(null).map(() => {
                return {
                    x: boardX,
                    y: boardY,
                    color: getColor(props.players[playerId].color),
                }
            })
        }),
        board: new Array(definition.allFields).fill(null).map(() => {
            return { x: boardX, y: boardY, color: 'white' }
        }),
    }

    // calculate home field positions
    for (let i = 0; i < definition.tokensPerPlayer; i++) {
        // player 0
        fields.end[P0][i].x -= 1 * (fieldSpace + FIELD_SIZE)
        fields.end[P0][i].y += (3 - i) * (fieldSpace + FIELD_SIZE)
        // player 1
        fields.end[P1][i].x += 4 * (fieldSpace + FIELD_SIZE)
        fields.end[P1][i].y += i * (fieldSpace + FIELD_SIZE)
    }

    // update start field colors
    FOR_ALL_PLAYERS.map((playerId) => {
        fields.board[definition.startField[playerId]].color = getColor(
            props.players[playerId].color,
            true,
        )
    })

    // calculate board field positions
    for (let i = 1; i < 4; i++) {
        // top row
        fields.board[i].x += i * (fieldSpace + FIELD_SIZE)
        // right row
        fields.board[i + 3].x += 3 * (fieldSpace + FIELD_SIZE)
        fields.board[i + 3].y += i * (fieldSpace + FIELD_SIZE)
        // bottom row
        fields.board[i + 6].x += (3 - i) * (fieldSpace + FIELD_SIZE)
        fields.board[i + 6].y += 3 * (fieldSpace + FIELD_SIZE)
        // left row
        fields.board[(i + 9) % definition.allFields].y +=
            (3 - i) * (fieldSpace + FIELD_SIZE)
    }

    const renderStacks = () => {
        return FOR_ALL_PLAYERS.map((playerId) => {
            return (
                <Stack
                    key={playerId}
                    x={stackData[playerId].posX}
                    y={50}
                    color={stackData[playerId].color}
                    width={STACK_WIDTH}
                    height={2 * FIELD_SIZE}
                    title={props.players[playerId].name}
                />
            )
        })
    }

    const renderFields = (list: PositionAndColor[], idPrefix: string) => {
        return list.map((field, idx) => {
            return (
                <Field
                    key={idx}
                    id={`${idPrefix}-${idx}`}
                    x={field.x}
                    y={field.y}
                    color={field.color}
                    size={FIELD_SIZE}
                />
            )
        })
    }

    const renderAllFields = () => {
        return [
            FOR_ALL_PLAYERS.flatMap((playerId) => {
                return [
                    renderFields(
                        fields[FieldSector.START][playerId],
                        `start-${playerId}`,
                    ),
                    renderFields(
                        fields[FieldSector.END][playerId],
                        `end-${playerId}`,
                    ),
                ]
            }),
            renderFields(fields[FieldSector.BOARD], 'fields'),
        ]
    }

    const renderTokens = () => {
        return props.tokens.map((token) => {
            const field =
                token.sector === FieldSector.BOARD
                    ? fields[token.sector][token.fieldId]
                    : fields[token.sector][+token.playerId][token.fieldId]
            return (
                <Token
                    key={token.id}
                    id={`token-${token.id}`}
                    x={field.x}
                    y={field.y}
                    color={getColor(token.color)}
                    size={TOKEN_SIZE}
                    onPress={() => props.onPress(token.id)}
                />
            )
        })
    }

    return (
        <Svg
            height="100%"
            width="100%"
            viewBox={`0 0 ${WHOLE_BOARD_WIDTH} ${WHOLE_BOARD_HEIGHT}`}>
            <Rect
                x={WHOLE_BOARD_MARGIN / 2}
                y={WHOLE_BOARD_MARGIN / 2}
                width={WHOLE_BOARD_WIDTH - WHOLE_BOARD_MARGIN}
                height={WHOLE_BOARD_HEIGHT - WHOLE_BOARD_MARGIN}
                stroke="gray"
                strokeWidth={WHOLE_BOARD_MARGIN}
                fill="white"
            />
            {renderStacks()}
            {/* lines under board fields */}
            <Rect
                x={boardX}
                y={boardY}
                width={boardWidth}
                height={boardHeight}
                stroke="black"
                strokeWidth="2"
                fill="transparent"
            />
            {FOR_ALL_PLAYERS.map((playerId) => {
                const lastField =
                    (definition.startField[playerId] +
                        definition.fieldsToHome) %
                    definition.allFields
                return (
                    <Line
                        key={playerId}
                        x1={fields.board[lastField].x}
                        y1={fields.board[lastField].y}
                        x2={fields.end[playerId][0].x}
                        y2={fields.end[playerId][0].y}
                        stroke="black"
                        strokeWidth="2"
                    />
                )
            })}
            {renderAllFields()}
            {renderTokens()}
        </Svg>
    )
}
