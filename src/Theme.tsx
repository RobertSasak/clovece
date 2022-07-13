import React from 'react'
import { extendTheme, INativebaseConfig, NativeBaseProvider } from 'native-base'
import { MaterialCommunityIcons } from '@native-base/icons'

const config: INativebaseConfig = {
    strictMode: 'warn',
}

const theme = extendTheme({
    colors: {
        primary: {
            50: '#e6f7fd',
            100: '#c5e5ec',
            200: '#a3d3dd',
            300: '#80c2d1',
            400: '#5eb1c3',
            500: '#4797aa',
            600: '#367584',
            700: '#26545f',
            800: '#13333a',
            900: '#001216',
        },
    },
    components: {
        Icon: {
            defaultProps: {
                as: MaterialCommunityIcons,
            },
        },
    },
    config: {
        useSystemColorMode: false,
    },
})

const Theme: React.FC = ({ children }) => (
    <NativeBaseProvider theme={theme} config={config}>
        {children}
    </NativeBaseProvider>
)

export default Theme
