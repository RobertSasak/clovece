import React, { useCallback, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { Rect, G, Circle } from 'react-native-svg'

interface Props {
    x: number
    y: number
    size: number
    value: number
    disabled: boolean
    onPress: () => void
}

const SIZE = 200

const AnimatedG = Animated.createAnimatedComponent(G)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const inputRange = [0, 59, 60, 119, 120, 179, 180, 239, 240, 299, 300, 360]

const Die: React.FC<Props> = ({ x, y, size, value, disabled, onPress }) => {
    const v = useRef(new Animated.Value(value)).current
    const v60 = v.interpolate({ inputRange: [1, 6], outputRange: [0, 360] })
    const scale = useRef(new Animated.Value(size / 200)).current

    const d1 = v60.interpolate({
        inputRange,
        outputRange: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    })
    const d2 = v60.interpolate({
        inputRange,
        outputRange: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    })
    const d3 = v60.interpolate({
        inputRange,
        outputRange: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    })
    const d4 = v60.interpolate({
        inputRange,
        outputRange: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    })
    const d5 = v60.interpolate({
        inputRange,
        outputRange: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    })
    const d6 = v60.interpolate({
        inputRange,
        outputRange: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    })
    const d7 = v60.interpolate({
        inputRange,
        outputRange: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    })
    useEffect(() => {
        v.setValue(value)
    }, [disabled, value])

    const roll = useCallback(() => {
        if (!disabled) {
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(scale, {
                        toValue: (size / SIZE) * 1.2,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                    Animated.timing(scale, {
                        toValue: size / SIZE,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                ]),
                Animated.sequence([
                    Animated.timing(v, {
                        toValue: 6,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(v, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start(() => {
                onPress()
            })
        } else {
            onPress()
        }
    }, [disabled])

    return (
        <G x={x} y={y}>
            <AnimatedG scale={scale} onPress={roll} onClick={roll}>
                <Rect
                    x={-100}
                    y={-100}
                    width={200}
                    height={200}
                    stroke="gray"
                    strokeWidth={1}
                    rx={20}
                    ry={20}
                    fill="white"
                />
                <AnimatedCircle
                    fill="black"
                    cx={-60}
                    cy={-60}
                    r={25}
                    opacity={d1}
                />
                <AnimatedCircle
                    fill="black"
                    cx={0}
                    cy={-60}
                    r={25}
                    opacity={d2}
                />
                <AnimatedCircle
                    fill="black"
                    cx={60}
                    cy={-60}
                    r={25}
                    opacity={d3}
                />
                <AnimatedCircle
                    fill="black"
                    cx={-60}
                    cy={60}
                    r={25}
                    opacity={d4}
                />
                <AnimatedCircle
                    fill="black"
                    cx={0}
                    cy={60}
                    r={25}
                    opacity={d5}
                />
                <AnimatedCircle
                    fill="black"
                    cx={60}
                    cy={60}
                    r={25}
                    opacity={d6}
                />
                <AnimatedCircle
                    fill="black"
                    cx={0}
                    cy={0}
                    r={25}
                    opacity={d7}
                />
            </AnimatedG>
        </G>
    )
}

export default Die
