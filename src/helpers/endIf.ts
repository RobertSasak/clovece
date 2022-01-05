import { Ctx } from 'boardgame.io'

import { State } from '../types'

export default (G: State, ctx: Ctx) => {
    for (let i = 0; i < ctx.playOrder.length; i++) {
        if (G.players[ctx.playOrder[i]].finished === 4) {
            return { winner: ctx.playOrder[i] }
        }
    }
}
