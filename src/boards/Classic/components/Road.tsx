import React from 'react'
import { Path, PathProps } from 'react-native-svg'
import { Point } from '../../../types'

interface LineProps extends PathProps {
    data: Point[]
    closed?: boolean
}

const Road = ({ data, closed, ...rest }: LineProps) => {
    return (
        <Path
            d={
                data
                    .map(({ x, y }, i) => `${i === 0 ? 'M' : 'L'} ${x} ${y} `)
                    .join('') + (closed ? 'Z' : '')
            }
            fill="transparent"
            stroke="#333"
            strokeWidth={30}
            {...rest}
        />
    )
}

export default Road
