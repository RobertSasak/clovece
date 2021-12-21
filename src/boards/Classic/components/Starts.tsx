import React from 'react'
import { Path } from 'react-native-svg'

import { Point } from '../../../types'
import Square from './Square'

interface Props {
    data: Point[][]
}

const Starts = ({ data }: Props) => {
    return (
        <>
            {data.map((e, i) => (
                <>
                    <Path
                        key={i}
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
            {data.map((e, i) => (
                <React.Fragment key={i}>
                    {e.map(({ x, y }, i) => (
                        <Square x={x} y={y} key={i} />
                    ))}
                </React.Fragment>
            ))}
        </>
    )
}

export default Starts
