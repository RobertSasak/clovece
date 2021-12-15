import React from 'react'
import { Pressable, Text } from 'native-base'

interface Props {
    id: number
    color: string
    fieldId: number
    disabled: boolean
    onPress: () => void
}

const Token: React.FC<Props> = ({ fieldId, color, disabled, onPress }) => {
    return (
        <Pressable
            rounded="25px"
            w="25px"
            h="25px"
            bg={disabled ? color + '.200' : color + '.600'}
            onPress={onPress}
            _disabled={{ bg: 'yellow.500' }}
            alignContent="center"
            justifyContent="center">
            <Text color="white" textAlign="center">
                {fieldId}
            </Text>
        </Pressable>
    )
}

export default Token
