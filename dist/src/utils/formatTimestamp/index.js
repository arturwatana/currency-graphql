export function formatUnixDate(unixDate) {
    const timestampInSec = unixDate * 1000;
    return new Date(timestampInSec);
}
