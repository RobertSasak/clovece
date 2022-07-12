import { Client as ClientReact } from 'boardgame.io/react'
import { Client as ClientReactNative } from 'boardgame.io/react-native'
import { Platform } from 'react-native'

export default Platform.OS === 'web' ? ClientReact : ClientReactNative
