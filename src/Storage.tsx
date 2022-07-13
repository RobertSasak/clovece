import React, { useEffect, useState } from 'react'
import { syncStorage } from 'use-state-persist'

const Storage: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        syncStorage.init().then(() => {
            setLoading(false)
        })
    }, [])
    return <>{loading ? null : children}</>
}

export default Storage
