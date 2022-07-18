import React, { useMemo } from 'react'
import { Local } from 'boardgame.io/multiplayer'

import Game from './Game'
import Board from './Board'
import client from './helpers/client'
import SimpleBot from './bots/simple'

interface Props {
    players: number
    bot1: boolean
    bot2: boolean
    bot3: boolean
    bot4: boolean
}

const Client = ({ players, bot1, bot2, bot3, bot4 }: Props) => {
    const hasBots = bot1 || bot2 || bot3 || bot4
    const C = useMemo(() => {
        const bots = {
            ...(bot1 && { '0': SimpleBot }),
            ...(bot2 && { '1': SimpleBot }),
            ...(bot3 && { '2': SimpleBot }),
            ...(bot4 && { '3': SimpleBot }),
        }
        const multiplayer = hasBots
            ? Local({
                  bots,
              })
            : undefined
        return client({
            game: Game,
            board: Board,
            debug: {
                collapseOnLoad: true,
                hideToggleButton: true,
            },
            numPlayers: players,
            multiplayer,
        })
    }, [players, bot1, bot2, bot3, bot4])
    return <C playerID={hasBots ? '0' : undefined} />
}

export default Client
