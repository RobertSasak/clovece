import React from 'react'
import { GenericPlayingBoardProps } from '../types'
import { Board } from './SmallBoardForTwo'
import { BoardType } from './types'

interface PlayingBoardOwnProps {
    boardType: BoardType
}

type PlayingBoardProps = PlayingBoardOwnProps & GenericPlayingBoardProps

/**
 * Playing board unification and selection layer
 */
export const PlayingBoard: React.FC<PlayingBoardProps> = (props) => {
    const { boardType, ...boardProps } = props

    switch (boardType) {
        case BoardType.SMALL_BOARD_FOR_TWO:
            return <Board {...boardProps} />

        default:
            console.warn('No such board!')
            return null
    }
}
