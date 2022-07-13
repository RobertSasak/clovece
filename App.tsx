import React from 'react'

import Theme from './src/Theme'
import Storage from './src/Storage'
import Navigation from './src/Navigation'

const App = () => {
    return (
        <Theme>
            <Storage>
                <Navigation />
            </Storage>
        </Theme>
    )
}

export default App
