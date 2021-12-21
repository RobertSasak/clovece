import React from 'react'
import { Rect, G, Circle } from 'react-native-svg'

interface Props {
    x: number
    y: number
    size: number
    value: number
    disabled: boolean
    onPress: () => void
}

const Die: React.FC<Props> = ({ x, y, size, value, disabled, onPress }) => {
    return (
        <G
            x={x}
            y={y}
            scale={size / 100}
            opacity={disabled ? 0.5 : 1}
            onPress={onPress}
            onClick={onPress}>
            <Rect
                width={200}
                height={200}
                stroke="gray"
                strokeWidth={1}
                rx={20}
                ry={20}
                fill="white"
            />
            {value >= 4 && <Circle fill="black" cx={40} cy={40} r={25} />}
            {value === 6 && <Circle fill="black" cx={100} cy={40} r={25} />}
            {value !== 1 && <Circle fill="black" cx={160} cy={40} r={25} />}
            {value !== 1 && <Circle fill="black" cx={40} cy={160} r={25} />}
            {value === 6 && <Circle fill="black" cx={100} cy={160} r={25} />}
            {value >= 4 && <Circle fill="black" cx={160} cy={160} r={25} />}
            {value % 2 === 1 && (
                <Circle fill="black" cx={100} cy={100} r={25} />
            )}
        </G>
    )
}

export default Die
