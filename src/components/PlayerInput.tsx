import React from 'react'
import { PresenceTransition, HStack, Input, Checkbox } from 'native-base'

interface Props {
    visible?: boolean
    value: string
    placeholder: string
    onChange: (value: string) => void
    bot: boolean
    setBot: (value: boolean) => void
}

const PlayerInput: React.FC<Props> = ({
    visible = true,
    value,
    placeholder,
    onChange,
    bot,
    setBot,
}) => (
    <PresenceTransition
        visible={visible}
        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: 1,
            transition: {
                duration: 250,
            },
        }}>
        <HStack alignItems="center">
            <Input
                placeholder={placeholder}
                flex={1}
                value={value}
                onChangeText={onChange}
            />
            <Checkbox value="bot" isChecked={bot} onChange={setBot} m="3">
                Bot{bot}
            </Checkbox>
        </HStack>
    </PresenceTransition>
)

export default PlayerInput
