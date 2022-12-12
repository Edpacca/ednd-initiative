export interface AnimationValue {
    xRange: number;
    xTiming: number;
    yRange: number;
    yTiming: number;
    delay: number;
    size: number;
    color: string;
}

export let DEFAULT: AnimationValue = {
    xRange: 10,
    xTiming: 0.7,
    yRange: 50,
    yTiming: 2,
    delay: 0,
    size: 20,
    color: "red",
}

export let FLOATERS: AnimationValue[] = [
    {
        xRange: 10,
        xTiming: 0.7,
        yRange: 50,
        yTiming: 2,
        delay: 0,
        size: 20,
        color: "red",
    },
    {
        xRange: 15,
        xTiming: 1,
        yRange: 70,
        yTiming: 3,
        delay: 0.2,
        size: 30,
        color: "red",
    },
    {
        xRange: 12,
        xTiming: 0.9,
        yRange: 60,
        yTiming: 2.3,
        delay: 0.25,
        size: 20,
        color: "red",
    },
    {
        xRange: 6,
        xTiming: 0.7,
        yRange: 80,
        yTiming: 2.7,
        delay: 0.6,
        size: 20,
        color: "red",
    },
    {
        xRange: 17,
        xTiming: 1.2,
        yRange: 70,
        yTiming: 2.3,
        delay: 0.8,
        size: 20,
        color: "red",
    },
    {
        xRange: 14,
        xTiming: 1,
        yRange: 40,
        yTiming: 3.1,
        delay: 0.9,
        size: 20,
        color: "red",
    },
    {
        xRange: 16,
        xTiming: 1.4,
        yRange: 55,
        yTiming: 2.5,
        delay: 1,
        size: 20,
        color: "red",
    }
]