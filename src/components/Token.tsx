import React from 'react'
import { Pressable, Text } from 'native-base'

interface Props {
    id: number
    color: string
    square: number | null
    disabled: boolean
    onPress: () => void
}

const Token: React.FC<Props> = ({ square, color, disabled, onPress }) => {
    return (
        <Pressable
            rounded="25px"
            w="25px"
            h="25px"
            bg={disabled ? color + '.200' : color + '.600'}
            onPress={onPress}
            _disabled={{ bg: 'yellow.500' }}
            alignContent="center"
            justifyContent="center"
        >
            <Text color="white" textAlign="center">
                {square}
            </Text>
        </Pressable>
    )
}

export default Token
