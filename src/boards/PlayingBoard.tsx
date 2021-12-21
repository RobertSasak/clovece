import React from 'react'
import { GenericPlayingBoardProps } from '../types'
import Classic from './Classic/Classis'
import { Board as SmallBoardForTwo } from './SmallBoardForTwo'
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
            return <SmallBoardForTwo {...boardProps} />

        case BoardType.CLASSIC:
            return <Classic {...boardProps} />

        default:
            console.warn('No such board!')
            return null
    }
}
