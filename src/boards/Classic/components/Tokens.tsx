import React from 'react'
import { Path } from 'react-native-svg'

import { Token as TokenInterface } from '../../../types'
import { Token } from './Token'

interface Props {
    data: TokenInterface[]
}

const Tokens = ({ data }: Props) => {
    return (
        <>
            {data.map(({ x, y }, i) => (
                <Token x={x} y={y} key={i} />
            ))}
        </>
    )
}

export default Tokens
