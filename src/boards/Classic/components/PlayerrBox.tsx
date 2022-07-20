import React from 'react'
import { Rect } from 'react-native-svg'

const SIZE = 350

const PlayerBox = () => (
    <Rect
        width={SIZE / 2}
        height={SIZE / 2}
        x={-SIZE / 4}
        y={-SIZE / 4}
        fill="#fff242"
        stroke="#333"
        strokeWidth="4"
        rx="30"
    />
)

export default PlayerBox
