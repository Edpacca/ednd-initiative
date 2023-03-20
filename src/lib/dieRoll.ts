export function dRoll(die: number) {
    const roll = Math.ceil(Math.random() * die);
    if (roll > die) {
        throw new Error("Erkk - the gods intervened with the die roll")
    }
    return roll;
}