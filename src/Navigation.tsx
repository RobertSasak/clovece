import * as React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Settings from './screens/Settings'
import Tutorial from './screens/Tutorial'
import Play from './screens/Play'
import { RootStackParamList } from './navigation/types'

const RootStack = createStackNavigator<RootStackParamList>()

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#bae6fd',
    },
}

const Navigation = () => (
    <NavigationContainer theme={theme}>
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <RootStack.Screen name="Settings" component={Settings} />
            <RootStack.Screen name="Tutorial" component={Tutorial} />
            <RootStack.Screen name="Play" component={Play} />
        </RootStack.Navigator>
    </NavigationContainer>
)

export default Navigation
