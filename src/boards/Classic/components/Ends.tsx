import React from 'react'
import { Path } from 'react-native-svg'

import { Point } from '../../../types'
import Square from './Square'

interface Props {
    data: Point[][]
}

const Ends = ({ data }: Props) => {
    return (
        <>
            {data.map((e) => (
                <>
                    <Path
                        d={e
                            .map(
                                ({ x, y }, i) =>
                                    `${i === 0 ? 'M' : 'L'} ${x} ${y} `,
                            )
                            .join('')}
                        stroke="red"
                        fill="transparent"
                    />
                </>
            ))}
            {data.map((e) => (
                <>
                    {e.map(({ x, y }, i) => (
                        <Square key={i} x={x} y={y} />
                    ))}
                </>
            ))}
        </>
    )
}

export default Ends
