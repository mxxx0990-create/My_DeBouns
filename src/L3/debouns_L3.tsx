import { useEffect, useState } from "react";


function useDebouns_L3<T>(value: T, time: number) {

    const [getTime, setGetTime] = useState<T>(value);

    useEffect(() => {

        const timer = setTimeout(() => {
            setGetTime(value)
        }, time)

        return() => {
            clearTimeout(timer)
        }
    }, [value, time])

    return getTime
}

export default useDebouns_L3