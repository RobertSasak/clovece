import React, { useRef, useEffect } from 'react'
import { Animated } from 'react-native'
import { Circle } from 'react-native-svg'

interface Props {
    visible: boolean
}

const ACircle = Animated.createAnimatedComponent(Circle)

const Select = ({ visible }: Props) => {
    const rx = useRef(new Animated.Value(130)).current
    useEffect(() => {
        if (visible) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(rx, {
                        toValue: 160,
                        duration: 300,
                        useNativeDriver: false,
                    }),
                    Animated.timing(rx, {
                        toValue: 130,
                        duration: 300,
                        useNativeDriver: false,
                    }),
                ]),
            ).start()
        }
    }, [visible])

    return (
        <>
            {visible && (
                <ACircle
                    fill="yellow"
                    stroke="#333"
                    strokeWidth={visible ? 4 : 0}
                    r={rx}
                />
            )}
        </>
    )
}

export default Select
