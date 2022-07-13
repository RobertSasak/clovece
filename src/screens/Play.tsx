import React from 'react'
import { Box, IconButton } from 'native-base'

import { RootStackScreenProps } from '../navigation/types'
import Client from '../Client'

const Play = ({ navigation, route }: RootStackScreenProps<'Play'>) => {
    const { players, bot1, bot2, bot3, bot4 } = route.params
    return (
        <Box safeArea bg="lightBlue.200" flex={1} justifyContent="center">
            <Client
                players={players}
                bot1={bot1}
                bot2={bot2}
                bot3={bot3}
                bot4={bot4}
            />
            <Box safeAreaTop safeAreaRight position="absolute" top="0">
                <IconButton
                    color="black"
                    size="lg"
                    _icon={{
                        name: 'menu',
                    }}
                    onPress={() => navigation.navigate('Settings')}
                />
            </Box>
        </Box>
    )
}

export default Play
