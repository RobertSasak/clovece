import type { StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
    Settings: undefined
    Tutorial: {
        players: number
        bot1: boolean
        bot2: boolean
        bot3: boolean
        bot4: boolean
    }
    Play: {
        players: number
        bot1: boolean
        bot2: boolean
        bot3: boolean
        bot4: boolean
    }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
