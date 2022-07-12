import React from 'react'

import Client from './src/Client'
import Theme from './src/Theme'
import Settings from './src/Settings'

const App = () => {
    return (
        <Theme>
            <Settings />
            {/* <Client playerID="0" /> */}
        </Theme>
    )
}

export default App
