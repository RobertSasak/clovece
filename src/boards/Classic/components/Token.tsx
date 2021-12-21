import React from 'react'
import { Rect } from 'react-native-svg'

interface TokenProps {
    x: number
    y: number
    size: number
    color: string
    error: string | false
    onPress?: () => void
}

export const Token: React.FC<TokenProps> = ({
    x,
    y,
    size,
    color,
    error,
    onPress = () => {},
}) => {
    return (
        <Rect
            x={x - size / 2}
            y={y - size / 2}
            width={size}
            height={size}
            stroke="black"
            strokeWidth="2"
            opacity={error ? 0.5 : 1}
            fill={color}
            onClick={onPress}
            onPress={onPress}
        />
    )
}
