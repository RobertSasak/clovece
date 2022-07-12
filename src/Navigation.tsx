import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Settings from './screens/Settings'
import Play from './screens/Play'
import { RootStackParamList } from './navigation/types'

const RootStack = createStackNavigator<RootStackParamList>()

const Navigation = () => (
    <NavigationContainer>
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <RootStack.Screen name="Settings" component={Settings} />
            <RootStack.Screen name="Play" component={Play} />
        </RootStack.Navigator>
    </NavigationContainer>
)

export default Navigation
