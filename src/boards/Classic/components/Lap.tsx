import React from 'react'
import { Path } from 'react-native-svg'

import { Point } from '../../../types'
import Square from './Square'

interface Props {
    data: Point[]
}

const Lap = ({ data }: Props) => {
    return (
        <>
            <Path
                d={
                    data
                        .map(
                            ({ x, y }, i) =>
                                `${i === 0 ? 'M' : 'L'} ${x} ${y} `,
                        )
                        .join('') + 'Z'
                }
                stroke="red"
                fill="transparent"
            />
            {data.map(({ x, y }, i) => (
                <Square x={x} y={y} key={i} />
            ))}
        </>
    )
}

export default Lap
