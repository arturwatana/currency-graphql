


export function formatUnixDate(unixDate: number){
            const timestampInSec = unixDate *1000
            return  new Date(timestampInSec)
}