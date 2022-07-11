import { Point } from './types'

export const stepper = (
    start: Point,
    walk: string,
    stepSize: number,
    skipFirst = true,
) => {
    let { x, y } = start
    return walk.split('').map((d) => {
        const oldX = x
        const oldY = y
        if (d === 'U') {
            y -= stepSize
        } else if (d === 'D') {
            y += stepSize
        } else if (d === 'L') {
            x -= stepSize
        } else if (d === 'R') {
            x += stepSize
        } else if (d === '↘') {
            x += stepSize
            y += stepSize
        } else if (d === '↖') {
            x -= stepSize
            y -= stepSize
        } else if (d === '↙') {
            x -= stepSize
            y += stepSize
        } else if (d === '↗') {
            x += stepSize
            y -= stepSize
        } else {
            throw new Error(`Unknown direction "${d}"`)
        }
        if (skipFirst) {
            return { x, y }
        }
        return { x: oldX, y: oldY }
    })
}
