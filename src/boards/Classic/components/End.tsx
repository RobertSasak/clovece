import React from 'react'

import { Point } from '../../../types'
import Road from './Road'
import Square from './Square'

interface Props {
    data: Point[]
}

const End = ({ data }: Props) => {
    return (
        <>
            <Road data={data} stroke="red" />
            {data.map(({ x, y }, i) => (
                <Square key={i} x={x} y={y} />
            ))}
        </>
    )
}

export default End
