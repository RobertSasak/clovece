import React from 'react'

import { Point } from '../../../types'
import Road from './Road'
import Square from './Square'

interface Props {
    data: Point[]
}

const Start = ({ data }: Props) => {
    return (
        <>
            {/* <Road data={data} closed stroke="#333" /> */}
            {data.map(({ x, y }, i) => (
                <Square x={x} y={y} key={i} />
            ))}
        </>
    )
}

export default Start
