import React, { useEffect, useRef } from 'react'
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
    const scale = useRef(new Animated.Value(size / 200)).current
    const rotation = useRef(new Animated.Value(0)).current
    const d1 = rotation.interpolate({
        inputRange,
        outputRange: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    })
    const d2 = rotation.interpolate({
        inputRange,
        outputRange: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    })
    const d3 = rotation.interpolate({
        inputRange,
        outputRange: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    })
    const d4 = rotation.interpolate({
        inputRange,
        outputRange: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    })
    const d5 = rotation.interpolate({
        inputRange,
        outputRange: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    })
    const d6 = rotation.interpolate({
        inputRange,
        outputRange: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    })
    const d7 = rotation.interpolate({
        inputRange,
        outputRange: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    })
    useEffect(() => {
        if (disabled) {
            scale.stopAnimation()
        } else {
            Animated.sequence([
                Animated.delay(1000),
                Animated.loop(
                    Animated.parallel([
                        Animated.sequence([
                            Animated.timing(scale, {
                                toValue: (size / SIZE) * 1.2,
                                duration: 500,
                                useNativeDriver: true,
                            }),
                            Animated.timing(scale, {
                                toValue: size / SIZE,
                                duration: 500,
                                useNativeDriver: true,
                            }),
                        ]),
                        Animated.timing(rotation, {
                            toValue: 360,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                    ]),
                ),
            ]).start()
        }

        return () => {}
    }, [disabled])

    return (
        <AnimatedG
            x={x}
            y={y}
            // rotation={rotation}
            scale={scale}
            opacity={disabled ? 0.5 : 1}
            onPress={onPress}
            onClick={onPress}>
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
                opacity={disabled ? (value >= 4 ? 1 : 0) : d1}
            />
            <AnimatedCircle
                fill="black"
                cx={0}
                cy={-60}
                r={25}
                opacity={disabled ? (value === 6 ? 1 : 0) : d2}
            />
            <AnimatedCircle
                fill="black"
                cx={60}
                cy={-60}
                r={25}
                opacity={disabled ? (value !== 1 ? 1 : 0) : d3}
            />
            <AnimatedCircle
                fill="black"
                cx={-60}
                cy={60}
                r={25}
                opacity={disabled ? (value !== 1 ? 1 : 0) : d4}
            />
            <AnimatedCircle
                fill="black"
                cx={0}
                cy={60}
                r={25}
                opacity={disabled ? (value === 6 ? 1 : 0) : d5}
            />
            <AnimatedCircle
                fill="black"
                cx={60}
                cy={60}
                r={25}
                opacity={disabled ? (value >= 4 ? 1 : 0) : d6}
            />
            <AnimatedCircle
                fill="black"
                cx={0}
                cy={0}
                r={25}
                opacity={disabled ? (value % 2 === 1 ? 1 : 0) : d7}
            />
        </AnimatedG>
    )
}

export default Die
