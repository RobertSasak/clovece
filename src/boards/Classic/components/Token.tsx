import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { Circle, G, Path } from 'react-native-svg'

interface TokenProps {
    x: number
    y: number
    size: number
    color: string
    disabled: boolean
    onPress?: () => void
}

const AG = Animated.createAnimatedComponent(G)
const ACircle = Animated.createAnimatedComponent(Circle)

export const Token: React.FC<TokenProps> = ({
    x,
    y,
    size,
    color,
    disabled,
    onPress = () => {},
}) => {
    const xy = useRef(new Animated.ValueXY({ x, y })).current
    const animation = useRef(new Animated.Value(0)).current
    const glow = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 30],
    })
    const wiggle = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
    })
    useEffect(() => {
        Animated.timing(xy, {
            toValue: { x, y },
            duration: 400,
            useNativeDriver: true,
        }).start()
    }, [x, y])
    useEffect(() => {
        if (disabled) {
            animation.setValue(0)
            animation.stopAnimation()
        } else {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animation, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animation, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
            ).start()
        }
    }, [disabled])
    return (
        <AG x={xy.x} y={xy.y} onClick={onPress} onPress={onPress}>
            <ACircle
                r={glow}
                fill={color}
                fillOpacity={0.2}
                strokeWidth={disabled ? 2 : 4}
                opacity={disabled ? 0.7 : 1}
            />
            <AG y={wiggle}>
                <Path
                    d="M10,-20 -10,-20 -15,0 a15,15 0 0,0 30,0 Z"
                    x={-size / 2}
                    y={-size / 2}
                    stroke="black"
                    strokeWidth={disabled ? 2 : 4}
                    opacity={disabled ? 0.7 : 1}
                    fill={color}
                />
                <Circle cy={-size} r={14} fill="white" />
                <Circle
                    cy={-size}
                    r={14}
                    fill={color}
                    stroke="black"
                    strokeWidth={disabled ? 2 : 4}
                    opacity={disabled ? 0.7 : 1}
                />
            </AG>
        </AG>
    )
}
