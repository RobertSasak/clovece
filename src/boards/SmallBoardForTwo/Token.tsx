import React from 'react'
import { Rect } from 'react-native-svg'

interface TokenProps {
    id?: string
    x: number
    y: number
    size: number
    color: string
    disabled: boolean
    onPress?: () => void
}

export const Token: React.FC<TokenProps> = ({
    id,
    x,
    y,
    size,
    color,
    disabled,
    onPress,
}) => {
    return (
        <Rect
            id={id}
            x={x - size / 2}
            y={y - size / 2}
            width={size}
            height={size}
            stroke="black"
            strokeWidth="2"
            opacity={disabled ? 0.5 : 1}
            fill={color}
            // TODO: onPress vs onClick
            // https://github.com/react-native-svg/react-native-svg/issues/1483
            onClick={onPress}
            onPress={onPress}
        />
    )
}
