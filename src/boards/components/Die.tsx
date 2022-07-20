import React, { useCallback, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { Rect, G, Circle } from 'react-native-svg'

interface Props {
    x: number
    y: number
    value: number
    disabled: boolean
    onPress: () => void
}

const SIZE = 100

const AnimatedG = Animated.createAnimatedComponent(G)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const inputRange = [0, 59, 60, 119, 120, 179, 180, 239, 240, 299, 300, 360]

const Die: React.FC<Props> = ({ x, y, value, disabled, onPress }) => {
    const v = useRef(new Animated.Value(value)).current
    const v60 = v.interpolate({ inputRange: [1, 6], outputRange: [0, 360] })
    const scale = useRef(new Animated.Value(1)).current

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
    }, [value])

    useEffect(() => {
        if (disabled) {
            scale.setValue(1)
        } else {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scale, {
                        toValue: 1.1,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                    Animated.timing(scale, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                ]),
            ).start()
        }
    }, [disabled, value])

    const roll = useCallback(() => {
        if (!disabled) {
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(scale, {
                        toValue: 1.2,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                    Animated.timing(scale, {
                        toValue: 1,
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
                    x={-SIZE / 2}
                    y={-SIZE / 2}
                    width={SIZE}
                    height={SIZE}
                    stroke="gray"
                    strokeWidth={disabled ? 1 : 2}
                    rx={SIZE / 10}
                    ry={SIZE / 10}
                    fill="white"
                />
                <AnimatedCircle
                    fill="black"
                    cx={-30}
                    cy={-30}
                    r={12}
                    opacity={d1}
                />
                <AnimatedCircle
                    fill="black"
                    cx={0}
                    cy={-30}
                    r={12}
                    opacity={d2}
                />
                <AnimatedCircle
                    fill="black"
                    cx={30}
                    cy={-30}
                    r={12}
                    opacity={d3}
                />
                <AnimatedCircle
                    fill="black"
                    cx={-30}
                    cy={30}
                    r={12}
                    opacity={d4}
                />
                <AnimatedCircle
                    fill="black"
                    cx={0}
                    cy={30}
                    r={12}
                    opacity={d5}
                />
                <AnimatedCircle
                    fill="black"
                    cx={30}
                    cy={30}
                    r={12}
                    opacity={d6}
                />
                <AnimatedCircle
                    fill="black"
                    cx={0}
                    cy={0}
                    r={12}
                    opacity={d7}
                />
            </AnimatedG>
        </G>
    )
}

export default Die
