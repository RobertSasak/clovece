import React from 'react'
import { Circle } from 'react-native-svg'

interface Props {
    x: number
    y: number
}
const Square = ({ x, y }: Props) => {
    return (
        <Circle
            cx={x}
            cy={y}
            r={30}
            fill="white"
            stroke="#333"
            strokeWidth={3}
        />
    )
}

export default Square
