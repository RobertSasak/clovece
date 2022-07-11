import React from 'react'

import { Point } from '../../../types'
import Square from './Square'

interface Props {
    data: Point[]
}

const Start = ({ data }: Props) => {
    return (
        <>
            {data.map(({ x, y }, i) => (
                <Square x={x} y={y} key={i} />
            ))}
        </>
    )
}

export default Start
