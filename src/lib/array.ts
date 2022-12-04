export function removeFromArray<T> (array: T[], value: T) {
     return array.filter(v => v !== value);
}