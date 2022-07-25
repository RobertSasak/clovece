import { BoardProps } from 'boardgame.io/dist/types/packages/react'
import {
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    IconButton,
    Text,
    ZStack,
} from 'native-base'
import React, { ReactElement, useCallback, useState } from 'react'

import { RootStackScreenProps } from '../navigation/types'
import Classic from '../boards/Classic/Classis'
import { Color, FieldSector, GenericPlayingBoardProps } from '../types'

interface Step {
    state: GenericPlayingBoardProps
    text: ReactElement
}

const steps: Step[] = [
    {
        state: {
            die: 3,
            dieError: 'This is just a tutorial',
            currentPlayer: '0',
            tokens: [],
            players: [],
        },
        text: (
            <>
                You may have play this game before under various names. This is
                a slightly improved version. Once you play it you will never
                wanted to play the original version again.
            </>
        ),
    },
    {
        state: {
            die: 3,
            dieError: 'This is just a tutorial',
            currentPlayer: '0',
            tokens: [
                {
                    id: 0,
                    color: Color.Red,
                    sector: FieldSector.START,
                    fieldId: 0,
                    playerId: '0',
                    error: false,
                },
                {
                    id: 1,
                    color: Color.Green,
                    sector: FieldSector.START,
                    fieldId: 1,
                    playerId: '0',
                    error: false,
                },
                {
                    id: 2,
                    color: Color.Blue,
                    sector: FieldSector.START,
                    fieldId: 2,
                    playerId: '0',
                    error: false,
                },
                {
                    id: 3,
                    color: Color.Yellow,
                    sector: FieldSector.START,
                    fieldId: 3,
                    playerId: '0',
                    error: false,
                },
            ],
            players: [{ id: '0', name: '', place: null, selectable: false }],
        },
        text: (
            <>
                You start with 4 tokens of a{' '}
                <Text textDecorationLine="underline">DIFFERENT</Text> color.
            </>
        ),
    },
    {
        state: {
            die: 6,
            dieError: 'This is just a tutorial',
            currentPlayer: '0',
            tokens: [
                {
                    id: 0,
                    color: Color.Red,
                    sector: FieldSector.LAP,
                    fieldId: 0,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 1,
                    color: Color.Green,
                    sector: FieldSector.START,
                    fieldId: 1,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 2,
                    color: Color.Blue,
                    sector: FieldSector.START,
                    fieldId: 2,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 3,
                    color: Color.Yellow,
                    sector: FieldSector.START,
                    fieldId: 3,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
            ],
            players: [{ id: '0', name: '', place: null, selectable: false }],
        },
        text: <>Roll 6 to get your first token on track.</>,
    },
    {
        state: {
            die: 4,
            dieError: 'This is just a tutorial',
            currentPlayer: '0',
            tokens: [
                {
                    id: 0,
                    color: Color.Red,
                    sector: FieldSector.LAP,
                    fieldId: 4,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 1,
                    color: Color.Green,
                    sector: FieldSector.START,
                    fieldId: 1,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 2,
                    color: Color.Blue,
                    sector: FieldSector.START,
                    fieldId: 2,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 3,
                    color: Color.Yellow,
                    sector: FieldSector.START,
                    fieldId: 3,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
            ],
            players: [{ id: '0', name: '', place: null, selectable: false }],
        },
        text: (
            <>
                Keeping rolling die and move your token along the track
                accordingly. So far nothing special.
            </>
        ),
    },
    {
        state: {
            die: 6,
            dieError: 'This is just a tutorial',
            currentPlayer: '1',
            tokens: [
                {
                    id: 0,
                    color: Color.Red,
                    sector: FieldSector.LAP,
                    fieldId: 4,
                    playerId: '0',
                    error: false,
                },
                {
                    id: 1,
                    color: Color.Green,
                    sector: FieldSector.START,
                    fieldId: 1,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 2,
                    color: Color.Blue,
                    sector: FieldSector.START,
                    fieldId: 2,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 3,
                    color: Color.Yellow,
                    sector: FieldSector.START,
                    fieldId: 3,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 4,
                    color: Color.Red,
                    sector: FieldSector.LAP,
                    fieldId: 20,
                    playerId: '1',
                    error: false,
                },
                {
                    id: 5,
                    color: Color.Green,
                    sector: FieldSector.START,
                    fieldId: 1,
                    playerId: '1',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 6,
                    color: Color.Blue,
                    sector: FieldSector.START,
                    fieldId: 2,
                    playerId: '1',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 7,
                    color: Color.Yellow,
                    sector: FieldSector.START,
                    fieldId: 3,
                    playerId: '1',
                    error: 'You cannot move tokens in tutorial.',
                },
            ],
            players: [
                { id: '0', name: '', place: null, selectable: false },
                { id: '1', name: '', place: null, selectable: false },
            ],
        },
        text: (
            <>
                The fun starts once your opponent also rolls 6 and brings a
                token of the same red color on track.
            </>
        ),
    },
    {
        state: {
            die: 5,
            dieError: 'This is just a tutorial',
            currentPlayer: '1',
            tokens: [
                {
                    id: 0,
                    color: Color.Red,
                    sector: FieldSector.LAP,
                    fieldId: 9,
                    playerId: '0',
                    error: false,
                },
                {
                    id: 1,
                    color: Color.Green,
                    sector: FieldSector.START,
                    fieldId: 1,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 2,
                    color: Color.Blue,
                    sector: FieldSector.START,
                    fieldId: 2,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 3,
                    color: Color.Yellow,
                    sector: FieldSector.START,
                    fieldId: 3,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 4,
                    color: Color.Red,
                    sector: FieldSector.LAP,
                    fieldId: 20,
                    playerId: '1',
                    error: false,
                },
                {
                    id: 5,
                    color: Color.Green,
                    sector: FieldSector.START,
                    fieldId: 1,
                    playerId: '1',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 6,
                    color: Color.Blue,
                    sector: FieldSector.START,
                    fieldId: 2,
                    playerId: '1',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 7,
                    color: Color.Yellow,
                    sector: FieldSector.START,
                    fieldId: 3,
                    playerId: '1',
                    error: 'You cannot move tokens in tutorial.',
                },
            ],
            players: [
                { id: '0', name: '', place: null, selectable: false },
                { id: '1', name: '', place: null, selectable: false },
            ],
        },
        text: (
            <>
                Your opponent now may choose to move any red token on track. It
                is wise to move a token that is closest to the finish.
            </>
        ),
    },
    {
        state: {
            die: 5,
            dieError: 'This is just a tutorial',
            currentPlayer: '0',
            tokens: [
                {
                    id: 0,
                    color: Color.Red,
                    sector: FieldSector.LAP,
                    fieldId: 9,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 1,
                    color: Color.Green,
                    sector: FieldSector.END,
                    fieldId: 1,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 2,
                    color: Color.Blue,
                    sector: FieldSector.END,
                    fieldId: 2,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 3,
                    color: Color.Yellow,
                    sector: FieldSector.END,
                    fieldId: 3,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 4,
                    color: Color.Red,
                    sector: FieldSector.END,
                    fieldId: 0,
                    playerId: '0',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 5,
                    color: Color.Green,
                    sector: FieldSector.START,
                    fieldId: 1,
                    playerId: '1',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 6,
                    color: Color.Blue,
                    sector: FieldSector.START,
                    fieldId: 2,
                    playerId: '1',
                    error: 'You cannot move tokens in tutorial.',
                },
                {
                    id: 7,
                    color: Color.Yellow,
                    sector: FieldSector.START,
                    fieldId: 3,
                    playerId: '1',
                    error: 'You cannot move tokens in tutorial.',
                },
            ],
            players: [
                { id: '0', name: '', place: 1, selectable: false },
                { id: '1', name: '', place: null, selectable: false },
            ],
        },
        text: (
            <>
                Wins the player who managed to bring 4 tokens of{' '}
                <Text textDecorationLine="underline">different</Text> color to
                finish.
            </>
        ),
    },
]

const Tutorial = ({ navigation, route }: RootStackScreenProps<'Tutorial'>) => {
    const [step, setStep] = useState(0)
    const onNextPressed = useCallback(() => {
        if (step < steps.length - 1) {
            setStep(step + 1)
        } else {
            navigation.navigate('Play', { ...route.params })
        }
    }, [step])
    const onPreviousPressed = useCallback(() => {
        setStep(step - 1)
    }, [step])
    return (
        <ZStack justifyContent="center" alignItems="center">
            <Classic {...steps[step].state} />
            <Box
                bg="white"
                borderRadius={5}
                shadow={5}
                w="60%"
                position="absolute"
                bottom="20px"
                left="20px">
                <HStack
                    justifyContent="space-between"
                    alignItems={'flex-start'}>
                    <Heading p="5" size="md">
                        How to play?
                    </Heading>
                    <IconButton
                        icon={<Icon name="close" />}
                        onPress={() =>
                            navigation.navigate('Play', { ...route.params })
                        }
                    />
                </HStack>
                <Text mx="5">{steps[step].text}</Text>
                <HStack
                    flexDir="row-reverse"
                    justifyContent={'space-between'}
                    m="5">
                    <Button
                        rightIcon={<Icon name="arrow-right" />}
                        onPress={onNextPressed}>
                        {step === steps.length - 1 ? "Let's play" : 'Next'}
                    </Button>
                    {step > 0 && (
                        <Button
                            variant="outline"
                            leftIcon={<Icon name="arrow-left" />}
                            onPress={onPreviousPressed}>
                            Previous
                        </Button>
                    )}
                </HStack>
            </Box>
        </ZStack>
    )
}

export default Tutorial
