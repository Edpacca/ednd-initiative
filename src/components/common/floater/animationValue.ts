export interface AnimationValue {
    xRange: number;
    xTiming: number;
    yRange: number;
    yTiming: number;
    delay: number;
    size: number;
    xOffset: number;
}

export let DEFAULT: AnimationValue = {
    xRange: 10,
    xTiming: 0.7,
    yRange: 50,
    yTiming: 2,
    delay: 0,
    size: 20,
    xOffset: 0
}

export let FLOATERS: AnimationValue[] = [
    {
        xRange: 10,
        xTiming: 0.7,
        yRange: 50,
        yTiming: 2,
        delay: 0,
        size: 15,
        xOffset: -20
    },
    {
        xRange: 15,
        xTiming: 1,
        yRange: 70,
        yTiming: 3,
        delay: 0.2,
        size: 20,
        xOffset: -12
    },
    {
        xRange: 12,
        xTiming: 0.9,
        yRange: 60,
        yTiming: 2.3,
        delay: 0.25,
        size: 17,
        xOffset: -8
    },
    {
        xRange: 6,
        xTiming: 0.7,
        yRange: 80,
        yTiming: 2.7,
        delay: 0.6,
        size: 15,
        xOffset: 0
    },
    {
        xRange: 17,
        xTiming: 1.2,
        yRange: 70,
        yTiming: 2.3,
        delay: 0.8,
        size: 22,
        xOffset: 8
    },
    {
        xRange: 14,
        xTiming: 1,
        yRange: 40,
        yTiming: 3.1,
        delay: 0.9,
        size: 16,
        xOffset: 12
    },
    {
        xRange: 16,
        xTiming: 1.4,
        yRange: 55,
        yTiming: 2.5,
        delay: 1,
        size: 14,
        xOffset: 20
    }
]